export const formatDate = (date?: string) => {
  if (!date) return "Ingrese una fecha";
  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
};

export const formatCurrency = (amount?: number | string) => {
  if (amount === undefined) return "$0,00";
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return "$0,00";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(numAmount);
};

export const formatNumber = (number?: number) => {
  if (number === undefined) return "0";
  return new Intl.NumberFormat("es-AR").format(number);
};
