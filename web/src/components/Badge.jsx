export function MiniBadge({ pais }) {
  const cls = pais === "br" ? "br" : "us";
  const txt = pais === "br" ? "BR" : "US";
  return <span className={`mini-badge ${cls}`}>{txt}</span>;
}

export function Hero({ paisA = "Brasil", paisB = "Estados Unidos", vs = "↔", title, lede, toc }) {
  return (
    <header className="hero">
      <div className="hero-logo-wrapper">
        <div className="hero-logo-badge">
          <img src="/logo.png" alt="Brasil ↔ EUA Logo" className="hero-logo-img" />
        </div>
      </div>
      <div className="flags">
        <div className="flag-block br">
          <span className="flag-badge br">BR</span>
          <span className="flag-nome">{paisA}</span>
        </div>
        <div className="vs">{vs}</div>
        <div className="flag-block us">
          <span className="flag-badge us">US</span>
          <span className="flag-nome">{paisB}</span>
        </div>
      </div>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      {toc && <nav className="toc">{toc}</nav>}
    </header>
  );
}
