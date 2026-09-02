"""Coleta dados socioeconômicos por estado dos EUA.

Duas fontes bem diferentes da API do IBGE, de propósito -- é justamente esse
choque de formatos que o projeto pede pra resolver:

  - US Census Bureau API (ACS 5-Year Estimates, 2022): população, renda
    mediana domiciliar e escolaridade superior, por estado. Exige chave
    gratuita (CENSUS_API_KEY no .env) -- ver README para o passo a passo.
    JSON: lista de listas, primeira linha é o cabeçalho.

  - Census Gazetteer Files (counties, 2021): não tem uma tabela pronta em
    nível de estado, então a área é obtida somando a área de todos os
    condados de cada estado. Vem num .zip com um .txt separado por TAB.
    Não exige chave.
"""
from __future__ import annotations

import io
import os
import zipfile

import pandas as pd
import requests
from dotenv import load_dotenv

load_dotenv()

ACS_URL = "https://api.census.gov/data/2022/acs/acs5"
GAZETTEER_URL = (
    "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/"
    "2021_Gazetteer/2021_Gaz_counties_national.zip"
)
SQMI_TO_KM2 = 2.58999

# Território dos EUA: 50 estados + Distrito de Columbia (exclui Porto Rico
# e outras dependências, que também aparecem em "state:*" da API do Census).
FIPS_50_STATES_DC = {
    "01", "02", "04", "05", "06", "08", "09", "10", "11", "12", "13", "15",
    "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
    "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
    "40", "41", "42", "44", "45", "46", "47", "48", "49", "50", "51", "53",
    "54", "55", "56",
}


def get_state_area() -> pd.DataFrame:
    """Área territorial por estado (km²), somando condados do Gazetteer."""
    resp = requests.get(GAZETTEER_URL, timeout=60)
    resp.raise_for_status()
    with zipfile.ZipFile(io.BytesIO(resp.content)) as zf:
        name = next(n for n in zf.namelist() if n.endswith(".txt"))
        with zf.open(name) as f:
            df = pd.read_csv(f, sep="\t", encoding="latin-1")
    df.columns = [c.strip() for c in df.columns]
    df["state_fips"] = df["GEOID"].astype(str).str.zfill(5).str[:2]

    agg = df.groupby(["state_fips", "USPS"], as_index=False).agg(
        area_land_km2=("ALAND_SQMI", lambda s: s.sum() * SQMI_TO_KM2),
        area_water_km2=("AWATER_SQMI", lambda s: s.sum() * SQMI_TO_KM2),
    )
    agg["area_km2"] = agg["area_land_km2"] + agg["area_water_km2"]
    return agg.rename(columns={"USPS": "estado_sigla"})[
        ["state_fips", "estado_sigla", "area_km2"]
    ]


def get_acs_indicadores(api_key: str | None = None) -> pd.DataFrame:
    """População, renda mediana e % com bacharelado+ por estado (ACS 5-Year 2022)."""
    api_key = api_key or os.getenv("CENSUS_API_KEY")
    if not api_key:
        raise RuntimeError(
            "CENSUS_API_KEY não encontrada. Crie um .env a partir do "
            ".env.example com a chave obtida em "
            "https://api.census.gov/data/key_signup.html"
        )

    variaveis = [
        "NAME",
        "B01003_001E",  # população total
        "B19013_001E",  # renda mediana domiciliar (USD)
        "B15003_001E",  # população 25+ (base p/ escolaridade)
        "B15003_022E",  # bacharelado
        "B15003_023E",  # mestrado
        "B15003_024E",  # profissional
        "B15003_025E",  # doutorado
    ]
    params = {"get": ",".join(variaveis), "for": "state:*", "key": api_key}
    resp = requests.get(ACS_URL, params=params, timeout=30)
    resp.raise_for_status()
    dados = resp.json()
    df = pd.DataFrame(dados[1:], columns=dados[0])

    df = df[df["state"].isin(FIPS_50_STATES_DC)].copy()

    numeric_cols = [
        "B01003_001E", "B19013_001E", "B15003_001E",
        "B15003_022E", "B15003_023E", "B15003_024E", "B15003_025E",
    ]
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df["pct_bacharelado_ou_mais"] = (
        (df["B15003_022E"] + df["B15003_023E"] + df["B15003_024E"] + df["B15003_025E"])
        / df["B15003_001E"] * 100
    )

    return df.rename(
        columns={
            "NAME": "estado_nome",
            "state": "state_fips",
            "B01003_001E": "populacao",
            "B19013_001E": "renda_mediana_domiciliar_usd",
        }
    )[["state_fips", "estado_nome", "populacao", "renda_mediana_domiciliar_usd", "pct_bacharelado_ou_mais"]]


def build_dataset(api_key: str | None = None) -> pd.DataFrame:
    acs = get_acs_indicadores(api_key)
    area = get_state_area()

    df = acs.merge(area, on="state_fips", how="left")
    df["densidade_hab_km2"] = df["populacao"] / df["area_km2"]
    df["pais"] = "Estados Unidos"

    return df.sort_values("estado_nome").reset_index(drop=True)


if __name__ == "__main__":
    dataset = build_dataset()
    out_path = "data/raw/census_estados.csv"
    dataset.to_csv(out_path, index=False, encoding="utf-8-sig")
    print(f"Salvo {len(dataset)} estados em {out_path}")
    print(dataset.head())
