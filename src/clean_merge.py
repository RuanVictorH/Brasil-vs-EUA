"""Une os datasets do IBGE (BR) e do Census (EUA) num único DataFrame comparável.

Os dois lados têm formatos, moedas e metodologias diferentes -- por isso a
renda não é comparada em valor bruto (BRL individual/mês vs USD domicílio/ano
não são a mesma coisa), e sim em índice relativo à média do próprio país.
Isso é documentado explicitamente aqui e retomado no notebook.
"""
from __future__ import annotations

import pandas as pd


def _padronizar_brasil(df_ibge: pd.DataFrame) -> pd.DataFrame:
    df = df_ibge.rename(
        columns={
            "uf_sigla": "unidade_sigla",
            "uf_nome": "unidade_nome",
            "pct_superior_completo": "pct_educacao_superior",
        }
    ).copy()
    df["pais"] = "Brasil"
    df["renda_valor"] = df["renda_media_mensal_reais"]
    df["renda_moeda"] = "BRL"
    df["renda_unidade"] = "individual, mensal"
    df["renda_indice_relativo"] = df["renda_valor"] / df["renda_valor"].mean() * 100
    return df[
        [
            "pais", "unidade_sigla", "unidade_nome", "regiao",
            "populacao", "area_km2", "densidade_hab_km2",
            "renda_valor", "renda_moeda", "renda_unidade", "renda_indice_relativo",
            "pct_educacao_superior",
        ]
    ]


def _padronizar_eua(df_census: pd.DataFrame) -> pd.DataFrame:
    df = df_census.rename(
        columns={
            "estado_sigla": "unidade_sigla",
            "estado_nome": "unidade_nome",
            "pct_bacharelado_ou_mais": "pct_educacao_superior",
        }
    ).copy()
    df["pais"] = "Estados Unidos"
    df["regiao"] = None  # US Census não devolve região nesta chamada
    df["renda_valor"] = df["renda_mediana_domiciliar_usd"]
    df["renda_moeda"] = "USD"
    df["renda_unidade"] = "domicílio, anual (mediana)"
    df["renda_indice_relativo"] = df["renda_valor"] / df["renda_valor"].mean() * 100
    return df[
        [
            "pais", "unidade_sigla", "unidade_nome", "regiao",
            "populacao", "area_km2", "densidade_hab_km2",
            "renda_valor", "renda_moeda", "renda_unidade", "renda_indice_relativo",
            "pct_educacao_superior",
        ]
    ]


def build_dataset_comparativo(
    df_ibge: pd.DataFrame, df_census: pd.DataFrame
) -> pd.DataFrame:
    br = _padronizar_brasil(df_ibge)
    us = _padronizar_eua(df_census)
    return pd.concat([br, us], ignore_index=True)


if __name__ == "__main__":
    ibge = pd.read_csv("data/raw/ibge_estados.csv")
    census = pd.read_csv("data/raw/census_estados.csv")
    comparativo = build_dataset_comparativo(ibge, census)
    out_path = "data/processed/brasil_eua_estados.csv"
    comparativo.to_csv(out_path, index=False, encoding="utf-8-sig")
    print(f"Salvo {len(comparativo)} linhas em {out_path}")
    print(comparativo.groupby("pais")[["populacao", "densidade_hab_km2", "pct_educacao_superior"]].mean())
