# Brasil ↔ EUA | Inteligência de Dados Comparativos

Uma plataforma web interativa de inteligência de dados comparando o **Brasil** e os **Estados Unidos** em tempo real e em nível estadual através de dados públicos oficiais: **população, densidade demográfica, renda, escolaridade, indicadores econômicos, bolsas de valores e história diplomática**.

---

## 🌟 Destaques e Funcionalidades do Sistema

- **Globo Terrestre 3D Interativo (Wireframe Dotted Globe)**:
  - Fundo dinâmico contínuo em 3D desenvolvido com **D3.js** (`d3.geoOrthographic`).
  - Renderização de continentes em pontos halftone (*halftone dots*), linhas de gratícula e contornos vetoriais com controle de rotação automática, arrasto manual do mouse e zoom via scroll do mouse.
  - Otimização com eliminação de faces traseiras (*backface culling*) por distância angular D3 para máxima performance.

- **Página Inicial e Dashboard Unificados (`/`)**:
  - **Split Dashboard por Temas**: Comparativo lado a lado por áreas: *Macroeconomia, Economia, Educação, Saúde, Tecnologia, Meio Ambiente e Relações Bilaterais*.
  - **Filtros e Controles em Tempo Real**:
    - *Modos de Visualização*: Números Absolutos, Per Capita / Média, Variação / Histórico.
    - *Foco Spotlight*: Destacar Brasil (🇧🇷), Destacar EUA (🇺🇸) ou Exibir Ambos.
    - *Alternância de Tema*: Suporte completo a Modo Escuro (Dark) e Modo Claro (Light).
    - *Gráficos Comparativos*: Visualizações interativas via Recharts.

- **Navbar Flutuante ("Floating Pill")**:
  - Barra de navegação flutuante e moderna em estilo pílula com a **logo oficial do sistema**, links diretos e indicador de status ao vivo (*Live Status*).

- **Design com Alto Contraste (Glassmorphism)**:
  - Interface desenvolvida com efeito de vidro fosco (`backdrop-filter: blur(14px)`), cartões semi-opacos e tipografia de alta legibilidade que garante contraste sobre o globo 3D.

- **Módulos Especializados**:
  - **Comparar Estados (`/estados`)**: Comparativo direto de qualquer UF brasileira contra qualquer estado americano (dados de 27 UFs + 50 estados americanos + DC).
  - **Câmbio & Bolsas (`/cambio-bolsas`)**: Cotações do Dólar (USD/BRL) e Euro (EUR/BRL) em tempo real via AwesomeAPI e gráficos das bolsas de valores (Ibovespa, S&P 500, Dow Jones, Nasdaq) via TradingView.
  - **Educação (`/educacao`)**: Rankings de escolaridade superior, dispersão entre renda e educação, e comparações regionais.
  - **Relações Bilaterais (`/relacoes`)**: Linha do tempo de 200 anos de história diplomática e feed de notícias ao vivo sobre Brasil-EUA.

---

## 🛠️ Tecnologias Utilizadas

### Front-end (Web App)
- **React 19** + **Vite 8**: Build rápido e navegação sem reload via **React Router DOM 7**.
- **D3.js (`d3-geo`, `d3-timer`)**: Renderização matemática do globo terrestre 3D no Canvas HTML5.
- **Tailwind CSS v4** + **CSS Variables Customizadas**: Estilização responsiva e tema escuro/claro.
- **Recharts**: Gráficos comparativos de barras e linhas.
- **Lucide React**: Ícones vetoriais modernos.

### Pipeline de Dados (Python)
- **Python 3.10+** + **Pandas**: Coleta, tratamento, normalização e exportação dos datasets estaduais.
- **API SIDRA / IBGE**: Dados oficiais de população, área e renda das UFs brasileiras.
- **US Census Bureau (ACS 5-Year + Gazetteer)**: Dados populacionais, socioeconômicos e territoriais dos estados americanos.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **Python** (versão 3.10 ou superior) - *necessário apenas se for reexecutar a coleta de dados*

---

### 1. Rodar o Front-end Web (Modo Rápido)

Para rodar a aplicação web localmente em segundos:

```bash
# 1. Navegue até a pasta do front-end
cd web

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **`http://localhost:5173`** no seu navegador.

---

### 2. Build de Produção do Front-end

Para gerar os arquivos estáticos de produção:

```bash
cd web

# Gerar build minificado na pasta web/dist/
npm run build

# Testar o build localmente
npm run preview
```

Os arquivos gerados na pasta `web/dist/` estão prontos para implantação em serviços como **Vercel**, **Netlify**, **Cloudflare Pages** ou **GitHub Pages**.

---

### 3. Rodar o Pipeline de Dados em Python (Opcional)

Caso queira atualizar os dados brutos ou reexecutar a extração dos dados estaduais do IBGE e do US Census Bureau:

```bash
# 1. Crie e ative o ambiente virtual na raiz do projeto
python -m venv .venv

# No Windows (PowerShell):
.venv\Scripts\activate

# No Linux / macOS:
source .venv/bin/activate

# 2. Instale as dependências Python
pip install -r requirements.txt

# 3. Configure a chave da API do US Census
# Crie um arquivo .env na raiz copiando o modelo:
cp .env.example .env
# Adicione sua chave (gratuita em https://api.census.gov/data/key_signup.html):
# CENSUS_API_KEY=sua_chave_aqui

# 4. Execute a coleta e o processamento de dados
python -m src.fetch_ibge      # Coleta dados do IBGE (SIDRA) -> data/raw/ibge_estados.csv
python -m src.fetch_census    # Coleta dados do US Census -> data/raw/census_estados.csv
python -m src.clean_merge     # Limpa e une os dados -> data/processed/brasil_eua_estados.csv
python -m src.export_json     # Exporta o JSON final para web/src/data/estados.json
```

---

### 4. Análise Exploratória no Jupyter Notebook

Para visualizar os gráficos e a análise estatística completa dos dados:

```bash
jupyter notebook notebooks/analise.ipynb
```

---

## 📁 Estrutura do Repositório

```
Brasil x EUA/
├── web/                       # Front-end React + Vite
│   ├── public/                # Favicon, logo.png, GeoJSON do globo (ne_110m_land.json)
│   ├── src/
│   │   ├── components/        # NavBar, Footer, Badge, IndicatorCard, ComparativeChart
│   │   ├── components/ui/     # wireframe-dotted-globe.jsx (globo terrestre 3D D3)
│   │   ├── data/              # dashboardData.js, estados.json
│   │   ├── lib/               # format.js, utils.js
│   │   ├── pages/             # Home.jsx (Dashboard Unificado), Estados.jsx, CambioBolsas.jsx, Educacao.jsx, Relacoes.jsx
│   │   ├── styles.css         # Estilos globais e tema glassmorphic
│   │   ├── App.jsx            # Rotas React Router
│   │   └── main.jsx           # Ponto de entrada do React
│   ├── package.json
│   └── vite.config.js
├── src/                       # Pipeline de dados em Python
│   ├── fetch_ibge.py          # Coleta API SIDRA / IBGE
│   ├── fetch_census.py        # Coleta API US Census
│   ├── clean_merge.py         # Tratamento e cruzamento de dados
│   └── export_json.py         # Exportação JSON para o front-end
├── data/
│   ├── raw/                   # CSVs brutos coletados das APIs
│   └── processed/             # Dataset final brasil_eua_estados.csv
├── notebooks/
│   └── analise.ipynb          # Jupyter Notebook com EDA e conclusões
├── .env.example               # Modelo de variáveis de ambiente
├── requirements.txt           # Pacotes Python (pandas, requests, jupyter)
└── README.md                  # Documentação oficial do projeto
```

---

## 📊 Principais Descobertas e Resultados

1. **Maior Disparidade Regional no Brasil**: O desvio-padrão do índice de renda relativa entre as UFs brasileiras é de **~30 pontos**, enquanto nos estados americanos é de **~17 pontos**, revelando maior desigualdade regional de renda no Brasil.
2. **Escolaridade Superior**: A média populacional (25+ anos) com ensino superior completo é de **~34% nos EUA** contra **~20% no Brasil**.
3. **Efeito Capital**: O *District of Columbia (DC)* possui uma densidade demográfica 9,3x superior ao 2º estado mais denso dos EUA, enquanto o *Distrito Federal (DF)* no Brasil possui 1,3x a densidade do Rio de Janeiro.

---

## 📄 Licença e Créditos

Este projeto foi desenvolvido para fins educacionais e de portfólio, utilizando exclusivamente dados públicos e APIs abertas.