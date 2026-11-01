Todos nós crescemos sob a influência dos EUA. A comparação com o Brasil aparece o tempo todo nas redes sociais, em conversas e notícias. E se existisse uma ferramenta que pudesse nos ajudar a comparar dados de diversos tipos entre os países de maneira prática e rápida?

Foi pensando nisso que criei o Brasil ↔ EUA — Inteligência de Dados Comparativos: uma plataforma web que cruza dados públicos oficiais dos dois países em tempo real — população, renda, escolaridade, densidade demográfica, câmbio, bolsas de valores e 200 anos de história diplomática.

Utilizei o seguinte para criar o projeto:

Front-end: React 19 + Vite, com um globo terrestre 3D interativo desenhado em D3.js (renderizado em Canvas, com rotação, arrasto e zoom) como fundo dinâmico do dashboard. Interface em glassmorphism, com modo claro/escuro e gráficos comparativos via Recharts.

Módulos especializados: comparação direta entre qualquer UF brasileira e qualquer estado americano, cotações de câmbio e bolsas em tempo real (Ibovespa, S&P 500, Dow Jones, Nasdaq), rankings de educação e uma linha do tempo das relações bilaterais.

Pipeline de dados em Python: coleta via API SIDRA/IBGE e US Census Bureau (ACS 5-Year + Gazetteer), tratamento e normalização com Pandas, e exportação para JSON consumido pelo front-end. Toda a análise exploratória foi validada em Jupyter Notebook antes de virar produto.

🔗 Projeto: https://brasil-vs-eua-dados.netlify.app/
💻 Código-fonte: https://github.com/RuanVictorH/Brasil-vs-EUA
