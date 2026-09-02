export function fmtInt(n) {
  return Math.round(n).toLocaleString("pt-BR");
}

export function fmt1(n) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function fmtPct(n, casas = 1) {
  return (
    n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas }) + "%"
  );
}

export function fmtMilhoes(n) {
  return fmt1(n / 1_000_000) + " mi";
}

export function fmtMoeda(valor, moeda) {
  const prefixo = moeda === "BRL" ? "R$ " : "US$ ";
  return prefixo + fmtInt(valor);
}
