import React from "react";
import { Info } from "lucide-react";

export default function IndicatorCard({ indicator, viewMode = "absoluto", spotlight = "both" }) {
  const currentVal = indicator.values[viewMode] || indicator.values.absoluto;
  
  // Determine spotlight dimming classes
  const brDim = spotlight === "us" ? "spotlight-dim-br" : "";
  const usDim = spotlight === "br" ? "spotlight-dim-us" : "";

  return (
    <div className="split-indicator-card">
      <div className="indicator-title-row">
        <div className="indicator-title">
          <span>{indicator.title}</span>
          
          <div className="source-tooltip-trigger" tabIndex={0} aria-label={`Fonte: ${indicator.source}`}>
            <Info size={14} />
            <div className="source-tooltip-content">
              <strong>Fonte oficial:</strong> {indicator.source}
              <div style={{ marginTop: "6px", fontSize: "11px", opacity: 0.9 }}>
                {indicator.methodology}
              </div>
            </div>
          </div>
        </div>

        {indicator.badge && (
          <span className="comparison-badge">{indicator.badge}</span>
        )}
      </div>

      <div className="indicator-dual-grid">
        {/* BRASIL SIDE */}
        <div className={`country-metric-box br ${brDim}`}>
          <div className="metric-country-name">
            <span>🇧🇷 BRASIL</span>
          </div>
          <div className="metric-big-value br tabular-nums">
            {currentVal.br}
          </div>
          <div className="metric-subtext">
            {currentVal.unit}
          </div>
        </div>

        {/* EUA SIDE */}
        <div className={`country-metric-box us ${usDim}`}>
          <div className="metric-country-name">
            <span>🇺🇸 ESTADOS UNIDOS</span>
          </div>
          <div className="metric-big-value us tabular-nums">
            {currentVal.us}
          </div>
          <div className="metric-subtext">
            {currentVal.unit}
          </div>
        </div>
      </div>
    </div>
  );
}
