import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RotatingEarth from "./components/ui/wireframe-dotted-globe";
import Home from "./pages/Home";
import Estados from "./pages/Estados";
import CambioBolsas from "./pages/CambioBolsas";
import Educacao from "./pages/Educacao";
import Relacoes from "./pages/Relacoes";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/estados" element={<Estados />} />
        <Route path="/cambio-bolsas" element={<CambioBolsas />} />
        <Route path="/educacao" element={<Educacao />} />
        <Route path="/relacoes" element={<Relacoes />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-globe-bg" aria-hidden="true">
        <RotatingEarth className="pointer-events-auto" />
      </div>
      <NavBar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}
