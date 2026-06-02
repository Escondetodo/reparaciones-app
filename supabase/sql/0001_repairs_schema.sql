create table public.repairs (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    ticket_code text unique not null,
    nombreCliente text not null,
    apellidoCliente text not null,
    telefonoCliente text not null,
    emailCliente text not null,
    nombreProducto text not null,
    marcaModelo text not null,
    estado text not null check (estado in ('analisis','proceso','finalizado')),
    problemaReportado text not null,
    precioPresupuestado numeric(12,2) not null,
    observacionesTecnicas text not null,
    fechaIngreso timestamptz not null default now()
);

alter table public.repairs enable row level security;

-- RLS: cada usuario autenticado ve solo sus reparaciones

create policy "repairs_select_own" on public.repairs
  for select to authenticated using (auth.uid() = owner_id);

create policy "repairs_insert_own" on public.repairs
  for insert to authenticated with check (auth.uid() = owner_id);

create policy "repairs_update_own" on public.repairs
  for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "repairs_delete_own" on public.repairs
  for delete to authenticated using (auth.uid() = owner_id);

create or replace function public.get_repair_by_ticket(t text)
returns public.repairs
language sql
security definer
set search_path = public
stable
as $$
  select * from public.repairs where ticket_code = upper(t) limit 1;
$$;

-- Trigger que genera ticket_code automáticamente

create or replace function public.assign_ticket_code()
returns trigger language plpgsql as $$
declare
  attempt int := 0;
begin
  while attempt < 5 loop
    begin
      new.ticket_code := 'ORD-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 8));
      return new;
    exception when unique_violation then
      attempt := attempt + 1;
    end;
  end loop;
  raise exception 'No se pudo generar ticket_code único';
end $$;

create trigger repairs_ticket_code_bi
  before insert on public.repairs
  for each row execute function public.assign_ticket_code();