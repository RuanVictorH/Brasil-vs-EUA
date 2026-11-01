"""Exporta data/processed/brasil_eua_estados.csv para web/src/data/estados.json.

O app React consome só esse JSON — não faz parsing de CSV no navegador.
Mantém uma única fonte de verdade (o CSV gerado por clean_merge.py) e um
formato de dados igual ao que os builders Python antigos usavam.

Rodar: python -m src.export_json
"""
from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "data" / "processed" / "brasil_eua_estados.csv"
OUT_PATH = ROOT / "web" / "src" / "data" / "estados.json"

REGIAO_CENSO_EUA = {
    "CT": "Nordeste (EUA)", "ME": "Nordeste (EUA)", "MA": "Nordeste (EUA)",
    "NH": "Nordeste (EUA)", "RI": "Nordeste (EUA)", "VT": "Nordeste (EUA)",
    "NJ": "Nordeste (EUA)", "NY": "Nordeste (EUA)", "PA": "Nordeste (EUA)",
    "IL": "Meio-Oeste (EUA)", "IN": "Meio-Oeste (EUA)", "MI": "Meio-Oeste (EUA)",
    "OH": "Meio-Oeste (EUA)", "WI": "Meio-Oeste (EUA)", "IA": "Meio-Oeste (EUA)",
    "KS": "Meio-Oeste (EUA)", "MN": "Meio-Oeste (EUA)", "MO": "Meio-Oeste (EUA)",
    "NE": "Meio-Oeste (EUA)", "ND": "Meio-Oeste (EUA)", "SD": "Meio-Oeste (EUA)",
    "DE": "Sul (EUA)", "FL": "Sul (EUA)", "GA": "Sul (EUA)", "MD": "Sul (EUA)",
    "NC": "Sul (EUA)", "SC": "Sul (EUA)", "VA": "Sul (EUA)", "DC": "Sul (EUA)",
    "WV": "Sul (EUA)", "AL": "Sul (EUA)", "KY": "Sul (EUA)", "MS": "Sul (EUA)",
    "TN": "Sul (EUA)", "AR": "Sul (EUA)", "LA": "Sul (EUA)", "OK": "Sul (EUA)", "TX": "Sul (EUA)",
    "AZ": "Oeste (EUA)", "CO": "Oeste (EUA)", "ID": "Oeste (EUA)", "MT": "Oeste (EUA)",
    "NV": "Oeste (EUA)", "NM": "Oeste (EUA)", "UT": "Oeste (EUA)", "WY": "Oeste (EUA)",
    "AK": "Oeste (EUA)", "CA": "Oeste (EUA)", "HI": "Oeste (EUA)", "OR": "Oeste (EUA)", "WA": "Oeste (EUA)",
}


def build() -> dict:
    df = pd.read_csv(DATA_PATH)

    def linha(row: pd.Series) -> dict:
        regiao = row["regiao"] if row["pais"] == "Brasil" else REGIAO_CENSO_EUA.get(row["unidade_sigla"], "—")
        return {
            "pais": row["pais"],
            "sigla": row["unidade_sigla"],
            "nome": row["unidade_nome"],
            "regiao": regiao,
            "populacao": row["populacao"],
            "areaKm2": row["area_km2"],
            "densidadeHabKm2": row["densidade_hab_km2"],
            "rendaValor": row["renda_valor"],
            "rendaAnualValor": row["renda_anual_valor"],
            "rendaMoeda": row["renda_moeda"],
            "rendaUnidade": row["renda_unidade"],
            "rendaUsdMes": row["renda_usd_mes"],
            "rendaPppMes": row["renda_ppp_mes"],
            "rendaIndiceRelativo": row["renda_indice_relativo"],
            "pctEducacaoSuperior": row["pct_educacao_superior"],
        }

    br = [linha(r) for _, r in df[df.pais == "Brasil"].sort_values("unidade_nome").iterrows()]
    us = [linha(r) for _, r in df[df.pais == "Estados Unidos"].sort_values("unidade_nome").iterrows()]
    return {"br": br, "us": us}


if __name__ == "__main__":
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(build(), f, ensure_ascii=False, indent=2)
    print(f"Salvo em {OUT_PATH}")
