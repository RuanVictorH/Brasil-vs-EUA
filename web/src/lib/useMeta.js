import { useEffect } from "react";

const SITE_NAME = "Brasil x EUA em Números";

function setMetaTag(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Define <title> e <meta name="description"> (+ Open Graph/Twitter
 * equivalentes) pra cada página — sem lib extra (react-helmet etc.),
 * já que é só um efeito simples e o app tem poucas rotas.
 */
export function useMeta(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("name", "twitter:title", fullTitle);
  }, [title, description]);
}
