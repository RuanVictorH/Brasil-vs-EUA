import { useEffect, useState } from "react";
import { Hero } from "../components/Badge";
import { useMeta } from "../lib/useMeta";
import TradingViewWidget from "../components/TradingViewWidget";

const AWESOME_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL";

const TICKER_TAPE_CONFIG = {
  symbols: [
    { proName: "BMFBOVESPA:IBOV", title: "Ibovespa" },
    { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
    { proName: "FOREXCOM:DJI", title: "Dow Jones" },
    { proName: "FOREXCOM:NSXUSD", title: "Nasdaq" },
    { proName: "FX_IDC:USDBRL", title: "USD/BRL" },
  ],
  colorTheme: "dark",
  isTransparent: true,
  displayMode: "adaptive",
  locale: "br",
};

const MINI_CHARTS = [
  { symbol: "BMFBOVESPA:IBOV", label: "Ibovespa" },
  { symbol: "FOREXCOM:SPXUSD", label: "S&P 500" },
  { symbol: "FOREXCOM:DJI", label: "Dow Jones" },
  { symbol: "FOREXCOM:NSXUSD", label: "Nasdaq" },
];

function miniConfig(symbol) {
  return {
    symbol,
    width: "100%",
    height: "100%",
    locale: "br",
    dateRange: "12M",
    colorTheme: "dark",
    isTransparent: true,
    autosize: true,
  };
}

function fmtBRL(n) {
  return "R$ " + Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtNum(n, casas = 2) {
  return Number(n).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}
function corVariacao(pct) {
  return pct >= 0 ? "#4ade80" : "#f87171";
}

function useCambio() {
  const [dados, setDados] = useState(null);
  const [status, setStatus] = useState({ ok: null, texto: "carregando…" });

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const resp = await fetch(AWESOME_URL);
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        const data = await resp.json();
        if (!ativo) return;
        setDados(data);
        setStatus({ ok: true, texto: "atualizado " + new Date().toLocaleTimeString("pt-BR") });
      } catch (e) {
        if (!ativo) return;
        setStatus({ ok: false, texto: "erro ao carregar (" + e.message + ")" });
      }
    }
    carregar();
    const id = setInterval(carregar, 60000);
    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, []);

  return { dados, status };
}

export default function CambioBolsas() {
  useMeta(
    "Câmbio & Bolsas",
    "Dólar e euro em tempo real, mais Ibovespa, S&P 500, Dow Jones e Nasdaq ao vivo — sem necessidade de cadastro ou chave de API."
  );
  const { dados, status } = useCambio();

  const items = [
    { chave: "USDBRL", label: "USD → BRL" },
    { chave: "EURBRL", label: "EUR → BRL" },
  ];

  return (
    <>
      <Hero
        paisA="Real"
        paisB="Dólar"
        title="Câmbio & Bolsas"
        lede="Cotação do dólar em tempo real e as principais bolsas dos dois países — buscado ao vivo quando você abre esta página, sem servidor e sem chave de API. Funciona pra qualquer pessoa que abrir o site."
        toc={<><a href="#cambio">Câmbio</a> · <a href="#bolsas">Bolsas</a></>}
      />
      <main>
        <section id="cambio">
          <h2><span className="icone">💵</span> Câmbio</h2>
          <p className="legenda">
            Fonte: <a href="https://docs.awesomeapi.com.br/" target="_blank" rel="noopener noreferrer">AwesomeAPI</a> — pública, sem chave.{" "}
            <span className="live-pill">
              <span className={"live-dot" + (status.ok === false ? " off" : "")} />
              <span>{status.texto}</span>
            </span>
          </p>
          <div className="stat-grid">
            {dados
              ? items.map((it) => {
                  const d = dados[it.chave];
                  if (!d) return null;
                  const pct = parseFloat(d.pctChange);
                  const cor = corVariacao(pct);
                  return (
                    <div className="stat-box" key={it.chave}>
                      <div className="stat-label">{it.label}</div>
                      <div className="stat-value">{fmtBRL(d.bid)}</div>
                      <div className="stat-sub" style={{ color: cor }}>
                        {pct >= 0 ? "▲" : "▼"} {fmtNum(Math.abs(pct))}% no dia · mín {fmtNum(d.low)} · máx {fmtNum(d.high)}
                      </div>
                    </div>
                  );
                })
              : items.map((it) => (
                  <div className="stat-box" key={it.chave}>
                    <div className="stat-label">{it.label}</div>
                    <div className="stat-value">—</div>
                  </div>
                ))}
          </div>
        </section>

        <section id="bolsas">
          <h2><span className="icone">📈</span> Bolsas</h2>
          <p className="legenda">
            Ibovespa, S&amp;P 500, Dow Jones e Nasdaq via widgets oficiais do{" "}
            <a href="https://www.tradingview.com/widget/" target="_blank" rel="noopener noreferrer">TradingView</a> —
            sem chave, sem cadastro, mesmos dados pra qualquer visitante.
          </p>

          <div className="tv-widget-wrap">
            <TradingViewWidget
              scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
              config={TICKER_TAPE_CONFIG}
              height={46}
            />
          </div>

          <div className="tv-grid" style={{ marginTop: 18 }}>
            {MINI_CHARTS.map((c) => (
              <TradingViewWidget key={c.symbol} scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" config={miniConfig(c.symbol)} height={220} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
