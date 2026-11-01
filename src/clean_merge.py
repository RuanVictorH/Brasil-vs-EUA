"""Une os datasets do IBGE (BR) e do Census (EUA) num único DataFrame comparável.

Ambos os países são harmonizados na mesma base:
  - Periodicidade: MENSAL (com valor anual equivalente preservado)
  - Escopo: INDIVIDUAL (trabalhador/indivíduo com rendimento)
  - Comparabilidade direta:
      * Dólar Nominal (USD/mês) convertido pelo câmbio de mercado
      * Poder de Compra Real (USD PPP/mês) ajustado pelo custo de vida (Banco Mundial)
  - Índice Relativo: normalizado em 100 pela média nacional de cada federação
"""
from __future__ import annotations

import pandas as pd

# Parâmetros macroeconômicos de conversão
# Câmbio comercial de referência (média recente ~5,45)
# Paridade de Poder de Compra (PPP) do Banco Mundial (~2,85 R$/USD)
CAMBIO_USD_BRL = 5.45
FATOR_PPP_BRL = 2.85


def _padronizar_brasil(df_ibge: pd.DataFrame) -> pd.DataFrame:
    df = df_ibge.rename(
        columns={
            "uf_sigla": "unidade_sigla",
            "uf_nome": "unidade_nome",
            "pct_superior_completo": "pct_educacao_superior",
        }
    ).copy()
    df["pais"] = "Brasil"
    # Renda mensal na moeda local (BRL)
    df["renda_valor"] = df["renda_media_mensal_reais"]
    df["renda_moeda"] = "BRL"
    df["renda_unidade"] = "individual, mensal"
    # Anualizada (12 meses)
    df["renda_anual_valor"] = (df["renda_valor"] * 12).round(0)
    # Convertida para Dólar Nominal (USD / mês)
    df["renda_usd_mes"] = (df["renda_valor"] / CAMBIO_USD_BRL).round(0)
    # Convertida para Poder de Compra (USD PPP / mês)
    df["renda_ppp_mes"] = (df["renda_valor"] / FATOR_PPP_BRL).round(0)
    # Índice relativo à média do país (100 = média)
    df["renda_indice_relativo"] = df["renda_valor"] / df["renda_valor"].mean() * 100

    return df[
        [
            "pais", "unidade_sigla", "unidade_nome", "regiao",
            "populacao", "area_km2", "densidade_hab_km2",
            "renda_valor", "renda_anual_valor", "renda_moeda", "renda_unidade",
            "renda_usd_mes", "renda_ppp_mes", "renda_indice_relativo",
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

    # Renda individual anual do trabalhador 16+ com rendimento (Census ACS B20002)
    # Se faltar por contingência, faz fallback para per capita ou domiciliar / 2.2
    if "renda_individual_trabalhador_usd" in df.columns:
        renda_anual = df["renda_individual_trabalhador_usd"]
    else:
        renda_anual = df["renda_mediana_domiciliar_usd"] / 2.2

    df["renda_anual_valor"] = renda_anual.round(0)
    # Mensalizada (/ 12)
    df["renda_valor"] = (renda_anual / 12).round(0)
    df["renda_moeda"] = "USD"
    df["renda_unidade"] = "individual, mensal (anual / 12)"
    # Em USD mensal (já em USD)
    df["renda_usd_mes"] = df["renda_valor"]
    # Em USD PPP mensal (EUA é a moeda padrão de PPP, 1 USD = 1 USD PPP)
    df["renda_ppp_mes"] = df["renda_valor"]
    # Índice relativo à média do país (100 = média)
    df["renda_indice_relativo"] = df["renda_valor"] / df["renda_valor"].mean() * 100

    return df[
        [
            "pais", "unidade_sigla", "unidade_nome", "regiao",
            "populacao", "area_km2", "densidade_hab_km2",
            "renda_valor", "renda_anual_valor", "renda_moeda", "renda_unidade",
            "renda_usd_mes", "renda_ppp_mes", "renda_indice_relativo",
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
    print(comparativo.groupby("pais")[["renda_valor", "renda_usd_mes", "renda_ppp_mes", "renda_indice_relativo"]].mean())
