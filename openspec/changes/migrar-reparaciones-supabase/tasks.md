# Tasks: Migrar Reparaciones a Supabase DB

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350-500 (PR A: ~100-150 SQL, PR B: ~250-350 TS/TSX) |
| 400-line budget risk | Low (per-PR within budget) |
| Chained PRs recommended | Yes |
| Suggested split | PR A (SQL only) → PR B (frontend) — stacked-to-main |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | SQL schema + RLS + trigger + function + seed | PR A | Stacked to main. Blocking for PR B. ~100-150 lines. |
| 2 | Frontend: API rewrite, store, lookup, errors | PR B | Depends on PR A being applied. ~250-350 lines. |

> **Decision needed**: Both PRs are within 400-line budget individually. The proposal suggests stacked-to-main. **Chain strategy is `pending`** — needs user confirmation before apply.

## Phase 1: SQL Schema + Seed (PR A)

- [ ] 1.1 Create `supabase/sql/0001_repairs_schema.sql` — table `public.repairs` with uuid PK, `owner_id` FK to `auth.users`, `ticket_code` unique, 10 business fields, indexes, RLS policies (select/insert/update/delete for authenticated only), `get_repair_by_ticket(text)` function with SECURITY DEFINER, `assign_ticket_code()` trigger with retry loop
- [ ] 1.2 Create `supabase/sql/0002_repairs_seed.sql` — idempotent `INSERT ... ON CONFLICT DO NOTHING` with ~30 deduplicated records from `server/db.json`, using admin UUID placeholder for `owner_id`
- [ ] 1.3 Verify via Supabase Dashboard: `SELECT` as anon returns 0 rows (RLS blocks), `SELECT` as authenticated filters by `auth.uid()`, `get_repair_by_ticket('ORD-...')` works case-insensitive for anon

## Phase 2: API Rewrite (PR B)

- [ ] 2.1 Rewrite `src/services/repairsApi.ts` — replace all `fetch` calls with `supabase.from('repairs').select/insert/update/delete`; add `created_at` ↔ `fechaIngreso` mapping and `number` ↔ `string` cast for `precioPresupuestado`; remove `getRepairsByStatus`; keep `deleteRepair` implemented

## Phase 3: Store Wiring (PR B)

- [ ] 3.1 Modify `src/store/repairs.ts` — `addRepair` injects `owner_id` via `useAuthStore.getState().user.id`, throws with `traducirError` if no session; remove dead keys `clients` and `products` from initial state

## Phase 4: Public Lookup (PR B)

- [ ] 4.1 Update `src/hooks/useRepairSearch.ts` — route `loadRepairById(ticketCode)` to `supabase.rpc('get_repair_by_ticket', { t: ticketCode })`
- [ ] 4.2 Update `src/components/client/RepairStatus.tsx` — display `repair.ticket_code` instead of `repair.id`
- [ ] 4.3 Update `src/components/repairs/productIntaketNew.tsx` — remove `fechaIngreso: new Date().toISOString()` from submission payload (DB handles via `created_at` default)
- [ ] 4.4 Update `src/components/repairs/detailRepair.tsx` and `editRepairProduct.tsx` — show `ticket_code` in UI while keeping uuid as route param

## Phase 5: Error Handling (PR B)

- [ ] 5.1 Extend `src/utils/helpers.ts` `traducirError` — add PG code map for `42501` (RLS), `23505` (unique), `PGRST116` (no rows), `23503` (FK); use generic fallback for unmapped codes

## Phase 6: Verification (PR B)

- [ ] 6.1 Run `npx tsc -b` — fix all type errors
- [ ] 6.2 Run `npm run lint` — fix lint issues
- [ ] 6.3 Update `README.md` — note json-server is deprecated, data now lives in Supabase
- [ ] 6.4 Execute smoke test per PR description — login, create repair, verify ticket_code in response, logout, consult with ticket
