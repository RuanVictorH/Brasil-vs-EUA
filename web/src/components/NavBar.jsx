import { NavLink } from "react-router-dom";

const PAGES = [
  { to: "/", label: "Início" },
  { to: "/estados", label: "Comparar Estados" },
  { to: "/cambio-bolsas", label: "Câmbio & Bolsas" },
  { to: "/educacao", label: "Educação" },
  { to: "/relacoes", label: "Relações Bilaterais" },
];

export default function NavBar() {
  return (
    <header className="floating-nav-wrapper">
      <nav className="floating-nav">
        {/* Logo Circle Badge */}
        <NavLink to="/" className="nav-logo-circle" title="Brasil ↔ EUA Dados">
          <img src="/logo.png" alt="Brasil ↔ EUA Logo" className="nav-logo-img" />
        </NavLink>

        {/* Center Navigation Links */}
        <div className="floating-nav-links">
          {PAGES.map((p) => (
            <NavLink
              key={p.to}
              to={p.to}
              end={p.to === "/"}
              className={({ isActive }) =>
                "floating-nav-link" + (isActive ? " active" : "")
              }
            >
              {p.label}
            </NavLink>
          ))}
        </div>

        {/* Right Action Pill */}
        <div className="nav-action-pill">
          <span className="live-status-dot" />
          <span className="nav-action-text">Brasil ↔ EUA</span>
        </div>
      </nav>
    </header>
  );
}
