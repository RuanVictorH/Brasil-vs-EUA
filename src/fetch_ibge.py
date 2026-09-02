"""Coleta dados socioeconômicos por Unidade da Federação via API SIDRA/IBGE.

Indicadores coletados (nível estadual, N3):
  - População residente estimada          (tabela 6579, variável 9324)
  - Área territorial e densidade demográfica (tabela 1301, variáveis 615/616)
  - Rendimento médio mensal real           (tabela 7437, variável 10750)
  - % de pessoas 25+ com superior completo (tabela 7189, variável 10270)

Nenhuma dessas rotas exige chave de API.
"""
from __future__ import annotations

import pandas as pd
import requests

SIDRA_BASE = "https://apisidra.ibge.gov.br/values"
LOCALIDADES_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"


def _sidra_get(path: str) -> pd.DataFrame:
    url = f"{SIDRA_BASE}/{path}"
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    rows = resp.json()[1:]  # primeira linha é o dicionário de cabeçalhos
    return pd.DataFrame(rows)


def get_estados() -> pd.DataFrame:
    """Metadados das 27 UFs: código, sigla, nome, região."""
    resp = requests.get(LOCALIDADES_URL, params={"orderBy": "nome"}, timeout=30)
    resp.raise_for_status()
    dados = resp.json()
    return pd.DataFrame(
        [
            {
                "uf_codigo": str(d["id"]),
                "uf_sigla": d["sigla"],
                "uf_nome": d["nome"],
                "regiao": d["regiao"]["nome"],
            }
            for d in dados
        ]
    )


def get_populacao() -> pd.DataFrame:
    df = _sidra_get("t/6579/n3/all/v/9324/p/last")
    return df[["D1C", "D3N", "V"]].rename(
        columns={"D1C": "uf_codigo", "D3N": "ano_populacao", "V": "populacao"}
    )


def get_area_densidade() -> pd.DataFrame:
    df = _sidra_get("t/1301/n3/all/v/615,616/p/last")
    pivot = df.pivot_table(
        index="D1C", columns="D2N", values="V", aggfunc="first"
    ).reset_index()
    pivot = pivot.rename(
        columns={
            "D1C": "uf_codigo",
            "Área total das unidades territoriais": "area_km2",
            "Densidade demográfica da unidade territorial": "densidade_ibge_2010",
        }
    )
    return pivot[["uf_codigo", "area_km2", "densidade_ibge_2010"]]


def get_renda() -> pd.DataFrame:
    df = _sidra_get("t/7437/n3/all/v/10750/p/last/c11308/49204")
    return df[["D1C", "D3N", "V"]].rename(
        columns={"D1C": "uf_codigo", "D3N": "ano_renda", "V": "renda_media_mensal_reais"}
    )


def get_educacao_superior() -> pd.DataFrame:
    df = _sidra_get("t/7189/n3/all/v/10270/p/last/c2/6794/c1568/99713")
    return df[["D1C", "D3N", "V"]].rename(
        columns={
            "D1C": "uf_codigo",
            "D3N": "ano_educacao",
            "V": "pct_superior_completo",
        }
    )


def build_dataset() -> pd.DataFrame:
    estados = get_estados()
    populacao = get_populacao()
    area = get_area_densidade()
    renda = get_renda()
    educacao = get_educacao_superior()

    df = estados.merge(populacao, on="uf_codigo", how="left")
    df = df.merge(area, on="uf_codigo", how="left")
    df = df.merge(renda, on="uf_codigo", how="left")
    df = df.merge(educacao, on="uf_codigo", how="left")

    numeric_cols = [
        "populacao",
        "area_km2",
        "densidade_ibge_2010",
        "renda_media_mensal_reais",
        "pct_superior_completo",
    ]
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df["densidade_hab_km2"] = df["populacao"] / df["area_km2"]
    df["pais"] = "Brasil"

    return df.sort_values("uf_nome").reset_index(drop=True)


if __name__ == "__main__":
    dataset = build_dataset()
    out_path = "data/raw/ibge_estados.csv"
    dataset.to_csv(out_path, index=False, encoding="utf-8-sig")
    print(f"Salvo {len(dataset)} UFs em {out_path}")
    print(dataset.head())
