"""Painel interativo — Brasil x EUA em Números.

Roda com: streamlit run app/streamlit_app.py
Depende de data/processed/brasil_eua_estados.csv já existir
(gerado por src/fetch_ibge.py + src/fetch_census.py + src/clean_merge.py).
"""
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import streamlit as st

CORES = {"Brasil": "#2f6f5e", "Estados Unidos": "#3b6ea5"}
DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "processed" / "brasil_eua_estados.csv"

st.set_page_config(page_title="Brasil x EUA em Números", layout="wide")
sns.set_theme(style="whitegrid", palette="deep")


@st.cache_data
def carregar_dados() -> pd.DataFrame:
    return pd.read_csv(DATA_PATH)


if not DATA_PATH.exists():
    st.error(
        "Dataset não encontrado. Rode antes:\n\n"
        "```\npython -m src.fetch_ibge\npython -m src.fetch_census\npython -m src.clean_merge\n```"
    )
    st.stop()

df = carregar_dados()

st.title("Brasil x EUA em Números")
st.markdown(
    "Comparação entre Brasil e Estados Unidos a partir de dados públicos "
    "oficiais, em nível estadual: **população, densidade demográfica, "
    "renda e escolaridade superior**."
)

with st.expander("Fontes e ressalvas metodológicas"):
    st.markdown(
        "- **Brasil**: API SIDRA/IBGE — 27 UFs\n"
        "- **EUA**: US Census Bureau (ACS 5-Year 2022 + Gazetteer Files) — 50 estados + DC\n\n"
        "Renda usa metodologias diferentes entre os países (individual/mensal "
        "em `R$` no Brasil vs. domiciliar/anual mediana em `US$` nos EUA), por "
        "isso é comparada como **índice relativo à média do próprio país** "
        "(`renda_indice_relativo`), não em valor bruto. Detalhes completos em "
        "`notebooks/analise.ipynb`."
    )

col1, col2, col3, col4 = st.columns(4)
for col, pais in zip((col1, col2), ("Brasil", "Estados Unidos")):
    sub = df[df.pais == pais]
    col.metric(f"Unidades — {pais}", len(sub))
for col, pais in zip((col3, col4), ("Brasil", "Estados Unidos")):
    sub = df[df.pais == pais]
    col.metric(f"População total — {pais}", f"{sub['populacao'].sum() / 1e6:,.0f} mi")

st.divider()

# --------------------------------------------------------------- pop ---
st.subheader("População: os 15 estados/UFs mais populosos")
top15 = df.nlargest(15, "populacao").sort_values("populacao")
fig, ax = plt.subplots(figsize=(8, 6))
ax.barh(top15["unidade_nome"], top15["populacao"] / 1e6, color=top15["pais"].map(CORES))
ax.set_xlabel("População (milhões)")
handles = [plt.Rectangle((0, 0), 1, 1, color=c) for c in CORES.values()]
ax.legend(handles, CORES.keys(), loc="lower right")
st.pyplot(fig)

# ----------------------------------------------------------- densid ---
st.subheader("Densidade demográfica: os distritos federais são outliers")
top10 = df.nlargest(10, "densidade_hab_km2").sort_values("densidade_hab_km2")
fig, ax = plt.subplots(figsize=(8, 5))
ax.barh(top10["unidade_nome"], top10["densidade_hab_km2"], color=top10["pais"].map(CORES))
ax.set_xscale("log")
ax.set_xlabel("Habitantes / km² (escala log)")
st.pyplot(fig)
st.caption(
    "O Distrito Federal (Brasil) e o District of Columbia (EUA) são, "
    "disparado, as unidades mais densas dos seus respectivos países."
)

# --------------------------------------------------------- educação ---
col_a, col_b = st.columns(2)
with col_a:
    st.subheader("Escolaridade superior por país")
    fig, ax = plt.subplots(figsize=(6, 5))
    sns.boxplot(data=df, x="pais", y="pct_educacao_superior", hue="pais",
                palette=CORES, legend=False, ax=ax)
    sns.stripplot(data=df, x="pais", y="pct_educacao_superior", color="black", alpha=0.4, size=4, ax=ax)
    ax.set_ylabel("% da população 25+ com superior")
    ax.set_xlabel("")
    st.pyplot(fig)

with col_b:
    st.subheader("Renda relativa x escolaridade")
    fig, ax = plt.subplots(figsize=(6, 5))
    for pais, marcador in [("Brasil", "o"), ("Estados Unidos", "^")]:
        sub = df[df.pais == pais]
        ax.scatter(sub["pct_educacao_superior"], sub["renda_indice_relativo"],
                   label=pais, color=CORES[pais], marker=marcador, s=50, alpha=0.8, edgecolor="white")
    ax.axhline(100, color="grey", linestyle="--", linewidth=0.8)
    ax.set_xlabel("% com superior")
    ax.set_ylabel("Renda (índice relativo, 100 = média do país)")
    ax.legend()
    st.pyplot(fig)

st.divider()

# ------------------------------------------------------------ achados --
st.subheader("Três achados principais")
st.markdown(
    """
1. **A renda entre estados varia bem mais no Brasil do que nos EUA.**
   Desvio-padrão do índice de renda relativa: ~30 pontos no Brasil contra
   ~17 nos EUA.
2. **A escolaridade superior é consistentemente mais alta nos EUA.**
   Média de ~34% nos EUA contra ~20% no Brasil — mesmo a melhor UF
   brasileira fica abaixo da média americana.
3. **As duas capitais federais são as unidades mais densas dos seus
   países, em escalas bem diferentes.** DF tem 1,3x a densidade do Rio
   de Janeiro; DC tem 9,3x a densidade de New Jersey.
"""
)

with st.expander("Ver dados completos"):
    st.dataframe(df, use_container_width=True)
