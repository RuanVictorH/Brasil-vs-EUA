import { useMemo, useState } from "react";
import { Hero } from "../components/Badge";
import { MiniBadge } from "../components/Badge";
import { fmt1, fmtInt, fmtMilhoes, fmtPct } from "../lib/format";
import { useMeta } from "../lib/useMeta";
import dados from "../data/estados.json";

const DEFAULT_BR = "SP";
const DEFAULT_US = "CA";

function achar(lista, sigla) {
  return lista.find((e) => e.sigla === sigla);
}

function useStatsPais(lista) {
  return useMemo(() => {
    const popTotal = lista.reduce((s, e) => s + e.populacao, 0);
    const areaTotal = lista.reduce((s, e) => s + e.areaKm2, 0);
    const max = (campo) => lista.reduce((a, b) => (b[campo] > a[campo] ? b : a));
    const min = (campo) => lista.reduce((a, b) => (b[campo] < a[campo] ? b : a));
    const media = (campo) => lista.reduce((s, e) => s + e[campo], 0) / lista.length;
    const desvio = (campo) => {
      const m = media(campo);
      const variancia = lista.reduce((s, e) => s + (e[campo] - m) ** 2, 0) / (lista.length - 1);
      return Math.sqrt(variancia);
    };
    return {
      nUnidades: lista.length,
      popTotal,
      areaTotal,
      densidadeMedia: popTotal / areaTotal,
      rendaMedia: media("rendaValor"),
      rendaAnualMedia: media("rendaAnualValor"),
      rendaUsdMesMedia: media("rendaUsdMes"),
      rendaPppMesMedia: media("rendaPppMes"),
      rendaMoeda: lista[0].rendaMoeda,
      rendaUnidade: lista[0].rendaUnidade,
      rendaStdIndice: desvio("rendaIndiceRelativo"),
      educMedia: media("pctEducacaoSuperior"),
      topPop: max("populacao"),
      topDens: max("densidadeHabKm2"),
      topEduc: max("pctEducacaoSuperior"),
      lowEduc: min("pctEducacaoSuperior"),
      topRenda: max("rendaIndiceRelativo"),
      lowRenda: min("rendaIndiceRelativo"),
    };
  }, [lista]);
}

function Barra({ valorA, valorB, cor }) {
  const maior = Math.max(valorA, valorB, 0.0001);
  const largura = Math.max((valorA / maior) * 100, 3);
  return (
    <div className="bar-track">
      <div className="bar-fill" style={{ width: `${largura}%`, background: cor }} />
    </div>
  );
}

function LinhaComp({ label, aTxt, bTxt, aRaw, bRaw, comBarra, nota }) {
  return (
    <tr>
      <td className="label">
        {label}
        {nota && <div className="nota">{nota}</div>}
      </td>
      <td className="val">
        {aTxt}
        {comBarra && <Barra valorA={aRaw} valorB={bRaw} cor="var(--br)" />}
      </td>
      <td className="val">
        {bTxt}
        {comBarra && <Barra valorA={bRaw} valorB={aRaw} cor="var(--us)" />}
      </td>
    </tr>
  );
}

function LinhaGeral({ label, valBr, valUs, nota }) {
  return (
    <tr>
      <td className="label">
        {label}
        {nota && <div className="nota">{nota}</div>}
      </td>
      <td className="val">{valBr}</td>
      <td className="val">{valUs}</td>
    </tr>
  );
}

export default function Estados() {
  useMeta(
    "Comparar Estados",
    "Compare qualquer estado brasileiro com qualquer estado americano: população, área, densidade, renda e escolaridade lado a lado, com dados do IBGE e US Census Bureau."
  );
  const [siglaBR, setSiglaBR] = useState(DEFAULT_BR);
  const [siglaUS, setSiglaUS] = useState(DEFAULT_US);

  const br = useStatsPais(dados.br);
  const us = useStatsPais(dados.us);

  const a = achar(dados.br, siglaBR);
  const b = achar(dados.us, siglaUS);

  const regioesBr = useMemo(() => {
    const grupos = {};
    for (const e of dados.br) {
      if (!grupos[e.regiao]) grupos[e.regiao] = [];
      grupos[e.regiao].push(e);
    }
    return Object.entries(grupos)
      .map(([regiao, lista]) => ({
        regiao,
        rendaValor: lista.reduce((s, e) => s + e.rendaValor, 0) / lista.length,
        pctEducacaoSuperior: lista.reduce((s, e) => s + e.pctEducacaoSuperior, 0) / lista.length,
        populacao: lista.reduce((s, e) => s + e.populacao, 0) / lista.length,
      }))
      .sort((x, y) => y.rendaValor - x.rendaValor);
  }, []);

  const atalhos = [
    { label: "👥 Mais populosos", br: br.topPop.sigla, us: us.topPop.sigla },
    { label: "🏙️ Mais densos", br: br.topDens.sigla, us: us.topDens.sigla },
    { label: "💰 Maior renda relativa", br: br.topRenda.sigla, us: us.topRenda.sigla },
    { label: "📉 Menor renda relativa", br: br.lowRenda.sigla, us: us.lowRenda.sigla },
    { label: "🎓 Maior escolaridade", br: br.topEduc.sigla, us: us.topEduc.sigla },
    { label: "✏️ Menor escolaridade", br: br.lowEduc.sigla, us: us.lowEduc.sigla },
  ];

  return (
    <>
      <Hero
        title="Comparar Estados"
        lede={`${br.nUnidades} UFs brasileiras x ${us.nUnidades} estados americanos + DC — qualquer combinação, dados oficiais do IBGE e US Census Bureau.`}
        toc={
          <>
            <a href="#comparador">Comparar estados</a> · <a href="#geral">Resumo geral</a> ·{" "}
            <a href="#regioes">Regiões do Brasil</a>
          </>
        }
      />
      <main>
        <section id="comparador">
          <h2><span className="icone">⚖️</span> Comparar dois estados</h2>
          <p className="legenda">Escolha qualquer UF brasileira e qualquer estado americano — a tabela abaixo atualiza na hora.</p>

          <div className="seletor">
            <div className="seletor-col">
              <label htmlFor="sel-br"><MiniBadge pais="br" /> Estado brasileiro</label>
              <select id="sel-br" value={siglaBR} onChange={(e) => setSiglaBR(e.target.value)}>
                {dados.br.map((e) => (
                  <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                ))}
              </select>
            </div>
            <div className="seletor-vs">×</div>
            <div className="seletor-col">
              <label htmlFor="sel-us"><MiniBadge pais="us" /> Estado americano</label>
              <select id="sel-us" value={siglaUS} onChange={(e) => setSiglaUS(e.target.value)}>
                {dados.us.map((e) => (
                  <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="atalhos">
            {atalhos.map((at) => (
              <button
                key={at.label}
                className={"atalho" + (siglaBR === at.br && siglaUS === at.us ? " ativo" : "")}
                onClick={() => {
                  setSiglaBR(at.br);
                  setSiglaUS(at.us);
                  document.getElementById("comparador")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {at.label}
              </button>
            ))}
          </div>

          <div className="tabela-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th className="th-br"><MiniBadge pais="br" /> {a.nome}</th>
                  <th className="th-us"><MiniBadge pais="us" /> {b.nome}</th>
                </tr>
              </thead>
              <tbody>
                <LinhaComp label="Região" aTxt={a.regiao} bTxt={b.regiao} comBarra={false} />
                <LinhaComp label="População" aTxt={fmtMilhoes(a.populacao)} bTxt={fmtMilhoes(b.populacao)} aRaw={a.populacao} bRaw={b.populacao} comBarra />
                <LinhaComp label="Área" aTxt={`${fmtInt(a.areaKm2)} km²`} bTxt={`${fmtInt(b.areaKm2)} km²`} aRaw={a.areaKm2} bRaw={b.areaKm2} comBarra />
                <LinhaComp label="Densidade demográfica" aTxt={`${fmt1(a.densidadeHabKm2)} hab/km²`} bTxt={`${fmt1(b.densidadeHabKm2)} hab/km²`} aRaw={a.densidadeHabKm2} bRaw={b.densidadeHabKm2} comBarra />
                <LinhaComp
                  label="Renda média mensal (moeda local)"
                  aTxt={(a.rendaMoeda === "BRL" ? "R$ " : "US$ ") + fmtInt(a.rendaValor) + " / mês"}
                  bTxt={(b.rendaMoeda === "BRL" ? "R$ " : "US$ ") + fmtInt(b.rendaValor) + " / mês"}
                  comBarra={false}
                  nota="Valores mensais nominais na moeda de cada país (ambos no mesmo molde mensal)"
                />
                <LinhaComp
                  label="Renda anual equivalente (moeda local)"
                  aTxt={(a.rendaMoeda === "BRL" ? "R$ " : "US$ ") + fmtInt(a.rendaAnualValor) + " / ano"}
                  bTxt={(b.rendaMoeda === "BRL" ? "R$ " : "US$ ") + fmtInt(b.rendaAnualValor) + " / ano"}
                  comBarra={false}
                  nota="Base anualizada padronizada (12 meses)"
                />
                <LinhaComp
                  label="Renda mensal em Dólar Comercial (USD)"
                  aTxt={"US$ " + fmtInt(a.rendaUsdMes) + " / mês"}
                  bTxt={"US$ " + fmtInt(b.rendaUsdMes) + " / mês"}
                  aRaw={a.rendaUsdMes}
                  bRaw={b.rendaUsdMes}
                  comBarra={true}
                  nota="Convertido pela taxa cambial nominal de mercado (1 USD = R$ 5,45)"
                />
                <LinhaComp
                  label="Poder de Compra Real (USD PPP / mês)"
                  aTxt={"US$ " + fmtInt(a.rendaPppMes) + " PPP / mês"}
                  bTxt={"US$ " + fmtInt(b.rendaPppMes) + " PPP / mês"}
                  aRaw={a.rendaPppMes}
                  bRaw={b.rendaPppMes}
                  comBarra={true}
                  nota="Ajustado pelo custo de vida via Paridade de Poder de Compra (Banco Mundial - PPP: R$ 2,85 / USD)"
                />
                <LinhaComp
                  label="Renda relativa (100 = média do país)"
                  aTxt={fmt1(a.rendaIndiceRelativo)}
                  bTxt={fmt1(b.rendaIndiceRelativo)}
                  aRaw={a.rendaIndiceRelativo}
                  bRaw={b.rendaIndiceRelativo}
                  comBarra={true}
                  nota="Posição relativa do estado frente à média da sua própria federação"
                />
                <LinhaComp label="Com superior completo (25+ anos)" aTxt={fmtPct(a.pctEducacaoSuperior)} bTxt={fmtPct(b.pctEducacaoSuperior)} aRaw={a.pctEducacaoSuperior} bRaw={b.pctEducacaoSuperior} comBarra />
              </tbody>
            </table>
          </div>
        </section>

        <section id="geral">
          <h2><span className="icone">🌎</span> Resumo geral (país a país)</h2>
          <div className="tabela-wrap">
            <table>
              <thead>
                <tr><th></th><th className="th-br"><MiniBadge pais="br" /> Brasil</th><th className="th-us"><MiniBadge pais="us" /> EUA</th></tr>
              </thead>
              <tbody>
                <LinhaGeral label="Região" valBr="América do Sul" valUs="América do Norte" />
                <LinhaGeral label="Capital" valBr="Brasília" valUs="Washington, D.C." />
                <LinhaGeral label="Língua oficial" valBr="Português" valUs="Inglês" />
                <LinhaGeral label="Moeda" valBr="Real (R$)" valUs="Dólar (US$)" />
                <LinhaGeral label="Unidades na base" valBr={`${br.nUnidades} UFs`} valUs={`${us.nUnidades} estados + DC`} />
                <LinhaGeral label="Área total" valBr={`${fmtInt(br.areaTotal)} km²`} valUs={`${fmtInt(us.areaTotal)} km²`} />
                <LinhaGeral label="População total" valBr={fmtMilhoes(br.popTotal)} valUs={fmtMilhoes(us.popTotal)} />
                <LinhaGeral label="Densidade média" valBr={`${fmt1(br.densidadeMedia)} hab/km²`} valUs={`${fmt1(us.densidadeMedia)} hab/km²`} />
                <LinhaGeral
                  label="Renda média mensal (moeda local)"
                  valBr={`R$ ${fmtInt(br.rendaMedia)} / mês`}
                  valUs={`US$ ${fmtInt(us.rendaMedia)} / mês`}
                  nota="Ambos harmonizados na periodicidade mensal e escopo individual"
                />
                <LinhaGeral
                  label="Renda média anual equivalente"
                  valBr={`R$ ${fmtInt(br.rendaAnualMedia)} / ano`}
                  valUs={`US$ ${fmtInt(us.rendaAnualMedia)} / ano`}
                  nota="Base anualizada padronizada (12 meses)"
                />
                <LinhaGeral
                  label="Renda média mensal em Dólar Comercial"
                  valBr={`US$ ${fmtInt(br.rendaUsdMesMedia)} / mês`}
                  valUs={`US$ ${fmtInt(us.rendaMedia)} / mês`}
                  nota="Convertido pelo câmbio de mercado (1 USD = R$ 5,45)"
                />
                <LinhaGeral
                  label="Renda média em Poder de Compra (PPP)"
                  valBr={`US$ ${fmtInt(br.rendaPppMesMedia)} PPP / mês`}
                  valUs={`US$ ${fmtInt(us.rendaMedia)} PPP / mês`}
                  nota="Ajustado pelo custo de vida (Banco Mundial)"
                />
                <LinhaGeral label="Desigualdade de renda entre estados" valBr={`${fmt1(br.rendaStdIndice)} pontos`} valUs={`${fmt1(us.rendaStdIndice)} pontos`} nota="Desvio-padrão do índice de renda relativa" />
                <LinhaGeral label="Com superior completo (25+ anos)" valBr={fmtPct(br.educMedia)} valUs={fmtPct(us.educMedia)} />
              </tbody>
            </table>
          </div>
        </section>

        <section id="regioes">
          <h2><span className="icone">🗺️</span> Desigualdade dentro do Brasil, por região</h2>
          <p className="legenda">O Census não devolve essa granularidade na mesma chamada, então esta seção é só do Brasil.</p>
          <div className="tabela-wrap">
            <table>
              <thead>
                <tr><th>Região</th><th>Renda média mensal</th><th>% superior completo</th><th>População média/UF</th></tr>
              </thead>
              <tbody>
                {regioesBr.map((r) => (
                  <tr key={r.regiao}>
                    <td className="label">{r.regiao}</td>
                    <td className="val">R$ {fmtInt(r.rendaValor)} / mês</td>
                    <td className="val">{fmtPct(r.pctEducacaoSuperior)}</td>
                    <td className="val">{fmtMilhoes(r.populacao)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
