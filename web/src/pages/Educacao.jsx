import { useMemo } from "react";
import { Hero } from "../components/Badge";
import { MiniBadge } from "../components/Badge";
import { fmt1, fmtPct } from "../lib/format";
import { useMeta } from "../lib/useMeta";
import dados from "../data/estados.json";

function correlacao(lista, campoX, campoY) {
  const n = lista.length;
  const mediaX = lista.reduce((s, e) => s + e[campoX], 0) / n;
  const mediaY = lista.reduce((s, e) => s + e[campoY], 0) / n;
  let cov = 0, varX = 0, varY = 0;
  for (const e of lista) {
    const dx = e[campoX] - mediaX;
    const dy = e[campoY] - mediaY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  return cov / Math.sqrt(varX * varY);
}

function RankRow({ nome, valor, maximo, cor }) {
  const largura = Math.max((valor / maximo) * 100, 2);
  return (
    <div className="rank-row">
      <div className="rank-nome">{nome}</div>
      <div className="rank-bar-track"><div className="rank-bar-fill" style={{ width: `${largura}%`, background: cor }} /></div>
      <div className="rank-valor">{fmtPct(valor)}</div>
    </div>
  );
}

function ScatterSVG({ todos }) {
  const w = 640, h = 420, pad = 44;
  const xMin = 0, xMax = 70;
  const yValores = todos.map((e) => e.rendaIndiceRelativo);
  const yMin = Math.min(...yValores) - 10;
  const yMax = Math.max(...yValores) + 10;
  const sx = (v) => pad + ((v - xMin) / (xMax - xMin)) * (w - 2 * pad);
  const sy = (v) => h - pad - ((v - yMin) / (yMax - yMin)) * (h - 2 * pad);
  const linha100 = sy(100);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Escolaridade x renda relativa, por estado" style={{ width: "100%", height: "auto", maxWidth: 640 }}>
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--line)" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="var(--line)" strokeWidth="1" />
      <line x1={pad} y1={linha100} x2={w - pad} y2={linha100} stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      <text x={pad} y={h - pad + 22} fill="var(--muted)" fontSize="11">0%</text>
      <text x={w - pad - 24} y={h - pad + 22} fill="var(--muted)" fontSize="11">70%</text>
      <text x={pad - 36} y={h - pad + 4} fill="var(--muted)" fontSize="11">{yMin.toFixed(0)}</text>
      <text x={pad - 30} y={pad + 4} fill="var(--muted)" fontSize="11">{yMax.toFixed(0)}</text>
      <text x={w / 2 - 70} y={h - 8} fill="var(--muted)" fontSize="12">% da população 25+ com superior →</text>
      <text x="14" y={h / 2} fill="var(--muted)" fontSize="12" transform={`rotate(-90 14 ${h / 2})`}>↑ renda relativa (100=média do país)</text>
      {todos.map((e) => (
        <circle key={`${e.pais}-${e.sigla}`} cx={sx(e.pctEducacaoSuperior)} cy={sy(e.rendaIndiceRelativo)} r="5"
          fill={e.pais === "Brasil" ? "var(--br)" : "var(--us)"} fillOpacity="0.8" stroke="var(--bg)" strokeWidth="1">
          <title>{e.nome}: {fmtPct(e.pctEducacaoSuperior)} · índice {fmt1(e.rendaIndiceRelativo)}</title>
        </circle>
      ))}
    </svg>
  );
}

export default function Educacao() {
  useMeta(
    "Educação",
    "Rankings de escolaridade superior por estado no Brasil e nos EUA, a relação entre educação e renda, e a diferença entre regiões dos dois países."
  );
  const { br, us, todos, mediaBr, mediaUs, corrBr, corrUs, top10Br, top10Us, bottom10Br, bottom10Us, maximo, regioesBr, regioesUs } = useMemo(() => {
    const br = dados.br, us = dados.us;
    const todos = [...br, ...us];
    const media = (l) => l.reduce((s, e) => s + e.pctEducacaoSuperior, 0) / l.length;
    const ordenaDesc = (l) => [...l].sort((a, b) => b.pctEducacaoSuperior - a.pctEducacaoSuperior);
    const ordenaAsc = (l) => [...l].sort((a, b) => a.pctEducacaoSuperior - b.pctEducacaoSuperior);

    const REGIAO_CENSO_EUA_LISTA = [...new Set(us.map((e) => e.regiao))];
    const mediaPorRegiao = (lista, regioes) =>
      regioes
        .map((r) => {
          const sub = lista.filter((e) => e.regiao === r);
          return { regiao: r, valor: sub.reduce((s, e) => s + e.pctEducacaoSuperior, 0) / sub.length };
        })
        .sort((a, b) => b.valor - a.valor);

    return {
      br, us, todos,
      mediaBr: media(br),
      mediaUs: media(us),
      corrBr: correlacao(br, "pctEducacaoSuperior", "rendaIndiceRelativo"),
      corrUs: correlacao(us, "pctEducacaoSuperior", "rendaIndiceRelativo"),
      top10Br: ordenaDesc(br).slice(0, 10),
      top10Us: ordenaDesc(us).slice(0, 10),
      bottom10Br: ordenaAsc(br).slice(0, 10),
      bottom10Us: ordenaAsc(us).slice(0, 10),
      maximo: Math.max(...todos.map((e) => e.pctEducacaoSuperior)),
      regioesBr: mediaPorRegiao(br, [...new Set(br.map((e) => e.regiao))]),
      regioesUs: mediaPorRegiao(us, REGIAO_CENSO_EUA_LISTA),
    };
  }, []);

  const maxRegiao = Math.max(...regioesBr.map((r) => r.valor), ...regioesUs.map((r) => r.valor));

  return (
    <>
      <Hero
        title="Educação"
        lede="Escolaridade superior por estado — quem lidera, quem fica pra trás, e como isso se relaciona com a renda dentro de cada país."
        toc={<><a href="#panorama">Panorama</a> · <a href="#ranking">Rankings</a> · <a href="#scatter">Renda x educação</a> · <a href="#regioes">Regiões</a></>}
      />
      <main className="wide">
        <section id="panorama">
          <h2><span className="icone">🎓</span> Panorama</h2>
          <div className="stat-grid">
            <div className="stat-box br"><div className="stat-label">Média Brasil</div><div className="stat-value">{fmtPct(mediaBr)}</div><div className="stat-sub">27 UFs, superior completo</div></div>
            <div className="stat-box us"><div className="stat-label">Média EUA</div><div className="stat-value">{fmtPct(mediaUs)}</div><div className="stat-sub">51 estados+DC, bacharelado+</div></div>
            <div className="stat-box"><div className="stat-label">Diferença</div><div className="stat-value">{fmt1(mediaUs - mediaBr)} p.p.</div><div className="stat-sub">EUA acima do Brasil, na média</div></div>
            <div className="stat-box"><div className="stat-label">Correlação c/ renda</div><div className="stat-value">{fmt1(corrBr)} · {fmt1(corrUs)}</div><div className="stat-sub">BR · EUA (índice de renda relativa)</div></div>
          </div>
        </section>

        <section id="ranking">
          <h2><span className="icone">🏆</span> Top 10 em cada país</h2>
          <p className="legenda">Ordenado por % da população 25+ com superior completo (BR) / bacharelado ou mais (EUA). Barras na mesma escala nos dois lados.</p>
          <div className="card-grid duas-colunas" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <h3 style={{ color: "var(--br)", fontSize: 14, marginBottom: 10 }}><MiniBadge pais="br" /> Brasil</h3>
              <div className="rank-list">{top10Br.map((e) => <RankRow key={e.sigla} nome={e.nome} valor={e.pctEducacaoSuperior} maximo={maximo} cor="var(--br)" />)}</div>
            </div>
            <div>
              <h3 style={{ color: "var(--us)", fontSize: 14, marginBottom: 10 }}><MiniBadge pais="us" /> Estados Unidos</h3>
              <div className="rank-list">{top10Us.map((e) => <RankRow key={e.sigla} nome={e.nome} valor={e.pctEducacaoSuperior} maximo={maximo} cor="var(--us)" />)}</div>
            </div>
          </div>
        </section>

        <section id="ranking-baixo">
          <h2><span className="icone">📉</span> As 10 menores taxas em cada país</h2>
          <div className="card-grid duas-colunas" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <h3 style={{ color: "var(--br)", fontSize: 14, marginBottom: 10 }}><MiniBadge pais="br" /> Brasil</h3>
              <div className="rank-list">{bottom10Br.map((e) => <RankRow key={e.sigla} nome={e.nome} valor={e.pctEducacaoSuperior} maximo={maximo} cor="var(--br)" />)}</div>
            </div>
            <div>
              <h3 style={{ color: "var(--us)", fontSize: 14, marginBottom: 10 }}><MiniBadge pais="us" /> Estados Unidos</h3>
              <div className="rank-list">{bottom10Us.map((e) => <RankRow key={e.sigla} nome={e.nome} valor={e.pctEducacaoSuperior} maximo={maximo} cor="var(--us)" />)}</div>
            </div>
          </div>
        </section>

        <section id="scatter">
          <h2><span className="icone">📊</span> Escolaridade x renda relativa</h2>
          <p className="legenda">Cada ponto é um estado/UF. A correlação positiva aparece nos dois países — mais escolaridade acompanha renda relativa mais alta dentro do próprio país (não implica causalidade).</p>
          <div style={{ display: "flex", justifyContent: "center", background: "var(--card)", borderRadius: 12, padding: 20 }}>
            <ScatterSVG todos={todos} />
          </div>
        </section>

        <section id="regioes">
          <h2><span className="icone">🗺️</span> Por região</h2>
          <p className="legenda">5 grandes regiões do IBGE (Brasil) e 4 regiões censitárias do US Census Bureau (EUA), lado a lado na mesma escala.</p>
          <div className="rank-list">
            {regioesBr.map((r) => <RankRow key={"br-" + r.regiao} nome={<><MiniBadge pais="br" /> {r.regiao}</>} valor={r.valor} maximo={maxRegiao} cor="var(--br)" />)}
            {regioesUs.map((r) => <RankRow key={"us-" + r.regiao} nome={<><MiniBadge pais="us" /> {r.regiao}</>} valor={r.valor} maximo={maxRegiao} cor="var(--us)" />)}
          </div>
        </section>
      </main>
    </>
  );
}
