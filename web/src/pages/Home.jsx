import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  GraduationCap,
  HeartPulse,
  Cpu,
  Leaf,
  Globe2,
  Moon,
  Sun,
  Eye
} from "lucide-react";
import { Hero } from "../components/Badge";
import { useMeta } from "../lib/useMeta";
import { THEMES, DASHBOARD_DATA } from "../data/dashboardData";
import IndicatorCard from "../components/IndicatorCard";
import ComparativeChart from "../components/ComparativeChart";

const ICON_MAP = {
  LayoutDashboard,
  TrendingUp,
  GraduationCap,
  HeartPulse,
  Cpu,
  Leaf,
  Globe2
};

const QUICK_CARDS = [
  {
    to: "/estados",
    icone: "⚖️",
    titulo: "Comparar Estados",
    desc: "Escolha qualquer UF brasileira e qualquer estado americano — população, renda, densidade e escolaridade lado a lado."
  },
  {
    to: "/cambio-bolsas",
    icone: "💹",
    titulo: "Câmbio & Bolsas",
    desc: "Dólar e euro em tempo real, mais um retrato ao vivo das bolsas dos dois países."
  },
  {
    to: "/educacao",
    icone: "🎓",
    titulo: "Educação",
    desc: "Rankings de escolaridade superior por estado, a relação com renda, e a diferença entre regiões dos dois países."
  },
  {
    to: "/relacoes",
    icone: "🤝",
    titulo: "Relações Brasil-EUA",
    desc: "Histórico diplomático completo, notícias ao vivo e análises comparativas das relações bilaterais."
  }
];

export default function Home() {
  useMeta(
    null,
    "Comparação completa entre Brasil e Estados Unidos: macroeconomia, educação, saúde, tecnologia, meio ambiente e relações bilaterais, lado a lado, com dados públicos oficiais."
  );
  const [activeThemeId, setActiveThemeId] = useState("macro");
  const [viewMode, setViewMode] = useState("absoluto");
  const [spotlight, setSpotlight] = useState("both");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeSwitch = (themeId) => {
    if (themeId === activeThemeId) return;
    setLoading(true);
    setActiveThemeId(themeId);
    setTimeout(() => {
      setLoading(false);
    }, 280);
  };

  const activeThemeObj = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];
  const themeData = DASHBOARD_DATA[activeThemeId];

  return (
    <div className="home-unified-page">
      <Hero
        title="Brasil ↔ EUA em Números"
        lede="Plataforma de inteligência de dados comparando o Brasil e os Estados Unidos em tempo real e em nível estadual através de dados públicos oficiais."
      />

      {/* DASHBOARD INTEGRADO */}
      <section className="dashboard-section">
        <div className="split-view-container">
          <aside className="split-sidebar" aria-label="Navegação Temática">
            <div className="sidebar-title">Temas de Comparação</div>
            {THEMES.map((item) => {
              const IconComp = ICON_MAP[item.icon] || LayoutDashboard;
              const isActive = item.id === activeThemeId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleThemeSwitch(item.id)}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <IconComp size={18} className="sidebar-icon" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </aside>

          <main className="split-main-content">
            <div className="top-control-bar">
              <div className="control-group">
                <span className="control-label">Visualização:</span>
                <div className="mode-pill-container">
                  <button
                    className={`mode-pill-btn ${viewMode === "absoluto" ? "active" : ""}`}
                    onClick={() => setViewMode("absoluto")}
                  >
                    Números Absolutos
                  </button>
                  <button
                    className={`mode-pill-btn ${viewMode === "perCapita" ? "active" : ""}`}
                    onClick={() => setViewMode("perCapita")}
                  >
                    Per Capita / Média
                  </button>
                  <button
                    className={`mode-pill-btn ${viewMode === "variacao" ? "active" : ""}`}
                    onClick={() => setViewMode("variacao")}
                  >
                    Variação / Histórico
                  </button>
                </div>
              </div>

              <div className="control-group">
                <span className="control-label">Foco Spotlight:</span>
                <button
                  className={`spotlight-btn ${spotlight === "both" ? "active-both" : ""}`}
                  onClick={() => setSpotlight("both")}
                >
                  <Eye size={14} />
                  Ambos
                </button>
                <button
                  className={`spotlight-btn ${spotlight === "br" ? "active-br" : ""}`}
                  onClick={() => setSpotlight("br")}
                >
                  🇧🇷 Foco Brasil
                </button>
                <button
                  className={`spotlight-btn ${spotlight === "us" ? "active-us" : ""}`}
                  onClick={() => setSpotlight("us")}
                >
                  🇺🇸 Foco EUA
                </button>
              </div>

              <div className="control-group">
                <button
                  className="theme-toggle-btn"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  title={`Alternar para modo ${theme === "dark" ? "Claro" : "Escuro"}`}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }} className="fade-slide-enter">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, border: "none" }}>
                  {activeThemeObj.label}
                </h2>
                <span className="comparison-badge">
                  Split View Lado a Lado
                </span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "6px" }}>
                {activeThemeObj.description}
              </p>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="skeleton-box" style={{ height: "140px", width: "100%" }} />
                <div className="skeleton-box" style={{ height: "140px", width: "100%" }} />
                <div className="skeleton-box" style={{ height: "300px", width: "100%" }} />
              </div>
            ) : (
              <div className="fade-slide-enter">
                {themeData.summary && (
                  <div
                    style={{
                      background: "var(--card-alt)",
                      border: "1px solid var(--line)",
                      borderLeft: "4px solid var(--accent)",
                      borderRadius: "10px",
                      padding: "16px 20px",
                      marginBottom: "24px",
                      fontSize: "13.5px",
                      lineHeight: "1.6"
                    }}
                  >
                    <strong style={{ color: "var(--text)" }}>Destaque Estrutural: </strong>
                    <span style={{ color: "var(--muted)" }}>{themeData.summary.highlight}</span>
                  </div>
                )}

                <div className="indicator-cards-list">
                  {themeData.indicators.map((indicator) => (
                    <IndicatorCard
                      key={indicator.id}
                      indicator={indicator}
                      viewMode={viewMode}
                      spotlight={spotlight}
                    />
                  ))}
                </div>

                {themeData.chartData && (
                  <ComparativeChart chartData={themeData.chartData} spotlight={spotlight} />
                )}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* ANÁLISES & MODULOS ESPECIALIZADOS */}
      <main className="main-content-area">
        <section id="modulos">
          <h2><span className="icone">🧭</span> Módulos Especializados</h2>
          <p className="legenda">Explore dados detalhados em nível estadual, cotações financeiras e contexto histórico.</p>
          <div className="card-grid">
            {QUICK_CARDS.map((c) => (
              <Link key={c.to} className="card" to={c.to}>
                <span className="card-icon">{c.icone}</span>
                <h3>{c.titulo}</h3>
                <p>{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
