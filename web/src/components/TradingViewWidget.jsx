import { useEffect, useRef } from "react";

/**
 * Widget oficial embedável do TradingView (formato clássico: container div
 * + <script> com config JSON como texto). Preferido sobre os novos Web
 * Components (tv-mini-chart etc.) porque estes não inicializam de forma
 * confiável quando várias instâncias são montadas ao mesmo tempo por React
 * (testado: só a primeira de várias tv-mini-chart ganhava iframe).
 */
export default function TradingViewWidget({ scriptSrc, config, height = 220 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptSrc;
    script.async = true;
    script.textContent = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptSrc, JSON.stringify(config)]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height }} />
  );
}
