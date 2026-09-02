import React, { useState, useEffect } from "react";
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
import { THEMES, DASHBOARD_DATA } from "../data/dashboardData";
import IndicatorCard from "../components/IndicatorCard";
import ComparativeChart from "../components/ComparativeChart";
import { useMeta } from "../lib/useMeta";

const ICON_MAP = {
  LayoutDashboard,
  TrendingUp,
  GraduationCap,
  HeartPulse,
  Cpu,
  Leaf,
  Globe2
};

export default function SplitDashboard() {
  useMeta(
    "Dashboard Split View",
    "Painel comparativo Brasil x EUA por tema — macroeconomia, educação, saúde, tecnologia, meio ambiente e relações bilaterais — com visão absoluta, per capita e variação histórica."
  );
  const [activeThemeId, setActiveThemeId] = useState("macro");
  const [viewMode, setViewMode] = useState("absoluto"); // absoluto | perCapita | variacao
  const [spotlight, setSpotlight] = useState("both"); // both | br | us
  const [theme, setTheme] = useState("dark"); // dark | light
  const [loading, setLoading] = useState(false);

  // Apply dark/light theme attribute to root HTML element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Simulate smooth skeleton loader transition on theme change
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
    <div className="split-view-container">
      {/* SIDEBAR NAVIGATION */}
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

      {/* MAIN DASHBOARD CONTENT */}
      <main className="split-main-content">
        {/* TOP CONTROL BAR */}
        <div className="top-control-bar">
          {/* VIEW MODE SELECTOR */}
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

          {/* SPOTLIGHT TOGGLE */}
          <div className="control-group">
            <span className="control-label">Foco Spotlight:</span>
            <button
              className={`spotlight-btn ${spotlight === "both" ? "active-both" : ""}`}
              onClick={() => setSpotlight("both")}
              title="Exibe ambos os países com destaque normal"
            >
              <Eye size={14} />
              Ambos
            </button>
            <button
              className={`spotlight-btn ${spotlight === "br" ? "active-br" : ""}`}
              onClick={() => setSpotlight("br")}
              title="Destaca o Brasil e reduz a opacidade dos EUA"
            >
              🇧🇷 Foco Brasil
            </button>
            <button
              className={`spotlight-btn ${spotlight === "us" ? "active-us" : ""}`}
              onClick={() => setSpotlight("us")}
              title="Destaca os EUA e reduz a opacidade do Brasil"
            >
              🇺🇸 Foco EUA
            </button>
          </div>

          {/* DARK/LIGHT THEME TOGGLE */}
          <div className="control-group">
            <button
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Alternar Tema Claro/Escuro"
              title={`Alternar para modo ${theme === "dark" ? "Claro" : "Escuro"}`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* SECTION HEADER */}
        <div style={{ marginBottom: "24px" }} className="fade-slide-enter">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>
              {activeThemeObj.label}
            </h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "100px",
                background: "var(--card-alt)",
                border: "1px solid var(--line)",
                color: "var(--accent)"
              }}
            >
              Split View Lado a Lado
            </span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "6px" }}>
            {activeThemeObj.description}
          </p>
        </div>

        {/* SKELETON LOADER ANIMATION */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="skeleton-box" style={{ height: "140px", width: "100%" }} />
            <div className="skeleton-box" style={{ height: "140px", width: "100%" }} />
            <div className="skeleton-box" style={{ height: "300px", width: "100%" }} />
          </div>
        ) : (
          <div className="fade-slide-enter">
            {/* STRUCTURAL HIGHLIGHT BOX */}
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

            {/* SIDE-BY-SIDE INDICATOR CARDS */}
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

            {/* COMPARATIVE INTERACTIVE CHART */}
            {themeData.chartData && (
              <ComparativeChart chartData={themeData.chartData} spotlight={spotlight} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
