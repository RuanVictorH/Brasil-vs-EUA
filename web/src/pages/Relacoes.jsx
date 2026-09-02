import { useEffect, useState } from "react";
import { Hero } from "../components/Badge";
import { useMeta } from "../lib/useMeta";

const TIMELINE = [
  ["1824", "Reconhecimento da independência",
    "Os EUA são um dos primeiros países a reconhecer a independência do Brasil (1822), abrindo relações diplomáticas formais."],
  ["1889–1912", "\"Aliança não escrita\"",
    "Com a Proclamação da República, o Barão do Rio Branco aproxima o Brasil dos EUA como contrapeso à influência europeia — a chamada aliança não escrita, base da diplomacia brasileira por décadas."],
  ["1930–1945", "Boa Vizinhança e 2ª Guerra",
    "Sob Roosevelt e Getúlio Vargas, os EUA financiam a Companhia Siderúrgica Nacional (Volta Redonda) em troca de bases no Nordeste; o Brasil envia a Força Expedicionária Brasileira (FEB) para lutar na Itália — único país sul-americano a mandar tropas ao front europeu."],
  ["1964", "Golpe militar e apoio dos EUA",
    "Os EUA reconhecem rapidamente o governo militar que depõe João Goulart; documentos desclassificados décadas depois revelam apoio logístico americano (Operação Brother Sam) preparado para o caso de resistência armada."],
  ["1964–1985", "Ditadura: alinhamento com atritos",
    "Relação geralmente alinhada no anticomunismo da Guerra Fria, mas com tensões pontuais — o acordo nuclear Brasil-Alemanha (1975) e críticas a direitos humanos no governo Carter (1977) esfriam o relacionamento em alguns momentos."],
  ["1985–1990", "Redemocratização",
    "Fim do regime militar; o Brasil recompõe a política externa em meio à crise da dívida externa latino-americana, com os EUA como credor e interlocutor central."],
  ["1991–2005", "Mercosul x ALCA",
    "O Brasil funda o Mercosul (1991) como projeto de integração regional próprio e resiste à Área de Livre Comércio das Américas (ALCA) proposta pelos EUA, que colapsa na Cúpula de Mar del Plata em 2005."],
  ["2003–2010", "Era Lula: pragmatismo",
    "Relação pragmática com Bush e depois mais próxima com Obama (diálogo estratégico de energia), mas com atritos pontuais — como a tentativa conjunta com a Turquia de mediar o programa nuclear iraniano (2010), mal recebida em Washington."],
  ["2013", "Espionagem da NSA",
    "Documentos vazados por Edward Snowden revelam que a NSA espionou comunicações da presidente Dilma Rousseff e da Petrobras — Dilma cancela visita de Estado a Washington em protesto."],
  ["2019–2022", "Era Bolsonaro-Trump",
    "Alinhamento ideológico próximo entre os governos; pressão internacional sobre o Brasil por queimadas na Amazônia (2019) tensiona a imagem externa do país."],
  ["2023–2024", "Volta de Lula, era Biden",
    "Relação institucional mais cordial, com divergências pontuais sobre a guerra na Ucrânia e a Venezuela, mas sem crises abertas."],
  ["jul–dez 2025", "Tarifaço",
    "Trump anuncia tarifa de 50% sobre produtos brasileiros (9/jul), ligando a medida ao julgamento de Bolsonaro no STF; revogação de vistos de ministros do STF e aplicação da Lei Magnitsky contra o ministro Alexandre de Moraes. Brasil leva o caso à OMC. Após telefonema Trump-Lula (6/out) e reunião na Cúpula da ASEAN (26/out), tarifas sobre produtos agrícolas caem (20/nov) e sanções contra Moraes são revogadas (12/dez)."],
  ["mai–jul 2026", "Nova escalada",
    "USTR conclui nova investigação e confirma tarifas de 25% sobre parte dos produtos brasileiros (15/jul), com isenções para carne e café; Lula e Trump orientam ministros a negociar uma solução em 30 dias."],
];

const RSS_URL = "https://news.google.com/rss/search?q=Brasil%20Estados%20Unidos%20when:5d&hl=pt-BR&gl=BR&ceid=BR:pt-419";
const API_URL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL);

function tempoRelativo(dataStr) {
  const diffMs = Date.now() - new Date(dataStr.replace(" ", "T") + "Z").getTime();
  const horas = Math.floor(diffMs / 3600000);
  if (horas < 1) return "agora há pouco";
  if (horas < 24) return `há ${horas}h`;
  return `há ${Math.floor(horas / 24)}d`;
}

function useNoticias() {
  const [itens, setItens] = useState(null);
  const [status, setStatus] = useState({ ok: null, texto: "carregando…" });

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const resp = await fetch(API_URL);
        const data = await resp.json();
        if (data.status !== "ok") throw new Error(data.message || "resposta inválida");
        if (!ativo) return;
        setItens(data.items.slice(0, 10));
        setStatus({ ok: true, texto: "atualizado " + new Date().toLocaleTimeString("pt-BR") });
      } catch (e) {
        if (!ativo) return;
        setStatus({ ok: false, texto: "erro" });
        setItens([]);
        setStatus((s) => ({ ...s, erro: e.message }));
      }
    }
    carregar();
    return () => { ativo = false; };
  }, []);

  return { itens, status };
}

export default function Relacoes() {
  useMeta(
    "Relações Brasil-EUA",
    "Linha do tempo de 200 anos das relações Brasil-Estados Unidos, do reconhecimento da independência ao tarifaço de 2025-2026, mais notícias recentes ao vivo."
  );
  const { itens, status } = useNoticias();

  return (
    <>
      <Hero
        vs="🤝"
        title="Relações Brasil-EUA"
        lede="Duzentos anos de relação bilateral — de &quot;aliança não escrita&quot; a tarifaço — e as notícias mais recentes envolvendo os dois países."
        toc={<><a href="#linha-do-tempo">Linha do tempo</a> · <a href="#hoje">Hoje</a> · <a href="#noticias">Notícias</a></>}
      />
      <main>
        <section id="linha-do-tempo">
          <h2><span className="icone">🕰️</span> Linha do tempo</h2>
          <p className="legenda">Marcos da relação bilateral, do reconhecimento da independência à crise diplomática mais recente.</p>
          <div className="timeline">
            {TIMELINE.map(([ano, titulo, texto]) => (
              <div className="tl-item" key={ano + titulo}>
                <div className="tl-year">{ano}</div>
                <div className="tl-title">{titulo}</div>
                <div className="tl-text">{texto}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="hoje">
          <h2><span className="icone">📌</span> Onde a relação está hoje</h2>
          <div className="metodologia-box">
            <p>
              Depois de duas rodadas de tarifaço (2025 e 2026), a relação bilateral segue mais
              tensa do que em qualquer momento desde a redemocratização — mas também mostra um
              padrão que se repete: cada escalada é seguida de negociação direta entre os dois
              presidentes e recuo parcial das tarifas mais pesadas, sem ruptura total do
              comércio bilateral. Os EUA seguem entre os maiores parceiros comerciais do
              Brasil, ao lado da China, e a integração econômica (cadeias de suprimento,
              investimento direto, mercado financeiro) segue profunda o suficiente pra tornar
              um rompimento completo pouco provável no curto prazo — o conflito atual é
              predominantemente tarifário e político (ligado ao julgamento de Bolsonaro), não
              uma ruptura estrutural da relação.
            </p>
            <p>
              Vale registrar: esta seção resume um processo em andamento em 2026 — a situação
              pode mudar rápido. O card de notícias abaixo busca as manchetes mais recentes
              toda vez que a página é aberta.
            </p>
          </div>
        </section>

        <section id="noticias">
          <h2><span className="icone">📰</span> Notícias Brasil-EUA</h2>
          <p className="legenda">
            Ao vivo, via Google Notícias — busca "Brasil Estados Unidos" nos últimos dias.{" "}
            <span className="live-pill">
              <span className={"live-dot" + (status.ok === false ? " off" : "")} />
              <span>{status.texto}</span>
            </span>
          </p>
          <div className="news-list">
            {itens === null && <div className="news-loading">Buscando notícias…</div>}
            {itens !== null && itens.length === 0 && (
              <div className="news-error">Não deu pra carregar as notícias agora{status.erro ? ` (${status.erro})` : ""}. Tente recarregar a página.</div>
            )}
            {itens?.map((it) => {
              const fonte = (it.title.split(" - ").pop() || "").trim();
              return (
                <a className="news-item" href={it.link} target="_blank" rel="noopener noreferrer" key={it.link}>
                  <div className="news-title">{it.title}</div>
                  <div className="news-meta">{fonte} · {tempoRelativo(it.pubDate)}</div>
                </a>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
