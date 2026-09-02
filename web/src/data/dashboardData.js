export const THEMES = [
  {
    id: "macro",
    label: "Visão Geral (Macro)",
    icon: "LayoutDashboard",
    description: "Indicadores fundamentais de dimensão territorial, demografia, economia agregada e renda."
  },
  {
    id: "economia",
    label: "Economia & Finanças",
    icon: "TrendingUp",
    description: "PIB per capita, inflação, taxa de juros, dívida pública, salário mínimo e balança comercial."
  },
  {
    id: "educacao",
    label: "Educação & Ciência",
    icon: "GraduationCap",
    description: "Escolaridade da população adulta, gastos públicos em educação, notas PISA e produção científica."
  },
  {
    id: "saude",
    label: "Saúde & Longevidade",
    icon: "HeartPulse",
    description: "Expectativa de vida, investimentos em saúde per capita, leitos hospitalares e mortalidade."
  },
  {
    id: "tecnologia",
    label: "Tecnologia & Inovação",
    icon: "Cpu",
    description: "Acesso à internet, penetração 5G, patentes registradas e investimento em Pesquisa & Desenvolvimento."
  },
  {
    id: "ambiente",
    label: "Meio Ambiente & Energia",
    icon: "Leaf",
    description: "Matriz elétrica renovável, emissões de CO₂ per capita, cobertura florestal e consumo energético."
  },
  {
    id: "relacoes",
    label: "Relações Bilaterais",
    icon: "Globe2",
    description: "Volume de comércio bilateral, histórico de exportações/importações e fluxo cambial."
  }
];

export const DASHBOARD_DATA = {
  macro: {
    summary: {
      title: "Macroeconomia e Demografia",
      highlight: "Os EUA possuem 1.6x a população do Brasil, mas seu PIB nominal é 12x maior, refletindo produtividade e industrialização histórica distintas."
    },
    indicators: [
      {
        id: "populacao",
        title: "População Total",
        badge: "EUA 1,65x maior",
        source: "IBGE Censo 2022 / US Census Bureau ACS 2023",
        methodology: "Habitantes residentes oficiais em ambos os países.",
        values: {
          absoluto: { br: "203,1 Mi", us: "334,9 Mi", unit: "habitantes", brRaw: 203.1, usRaw: 334.9 },
          perCapita: { br: "203,1 Mi", us: "334,9 Mi", unit: "habitantes totais", brRaw: 203.1, usRaw: 334.9 },
          variacao: { br: "+6,5%", us: "+5,8%", unit: "crescimento 2012-2023", brRaw: 6.5, usRaw: 5.8 }
        }
      },
      {
        id: "pib_total",
        title: "Produto Interno Bruto (PIB)",
        badge: "EUA 12,5x maior nominal",
        source: "Banco Mundial / FMI (2023/2024)",
        methodology: "PIB a preços correntes de mercado convertidos para USD.",
        values: {
          absoluto: { br: "US$ 2,17 Tri", us: "US$ 27,36 Tri", unit: "dólares americanos", brRaw: 2.17, usRaw: 27.36 },
          perCapita: { br: "US$ 10.680", us: "US$ 81.690", unit: "por habitante / ano", brRaw: 10680, usRaw: 81690 },
          variacao: { br: "+2,9%", us: "+2,5%", unit: "crescimento real anual", brRaw: 2.9, usRaw: 2.5 }
        }
      },
      {
        id: "area_territorial",
        title: "Área Territorial",
        badge: "EUA 1,15x maior",
        source: "IBGE / US Census Gazetteer Files",
        methodology: "Superfície total incluindo águas internas.",
        values: {
          absoluto: { br: "8.515.767 km²", us: "9.833.517 km²", unit: "quilômetros quadrados", brRaw: 8515767, usRaw: 9833517 },
          perCapita: { br: "23,8 hab/km²", us: "34,0 hab/km²", unit: "densidade demográfica", brRaw: 23.8, usRaw: 34.0 },
          variacao: { br: "Estável", us: "Estável", unit: "variação territorial", brRaw: 0, usRaw: 0 }
        }
      },
      {
        id: "idh",
        title: "Índice de Desenvolvimento Humano",
        badge: "EUA +0,167 pts",
        source: "PNUD / Organização das Nações Unidas (2023/2024)",
        methodology: "Índice composto por saúde (expectativa de vida), educação e renda.",
        values: {
          absoluto: { br: "0,760", us: "0,927", unit: "escala de 0 a 1,000", brRaw: 0.760, usRaw: 0.927 },
          perCapita: { br: "0,760 (Posição 89º)", us: "0,927 (Posição 20º)", unit: "ranking global PNUD", brRaw: 89, usRaw: 20 },
          variacao: { br: "+0,022", us: "+0,009", unit: "ganho na última década", brRaw: 0.022, usRaw: 0.009 }
        }
      }
    ],
    chartData: {
      type: "line",
      title: "Evolução do PIB (Trilhões de US$) — 2014 a 2024",
      data: [
        { year: "2014", br: 2.46, us: 17.52 },
        { year: "2016", br: 1.80, us: 18.71 },
        { year: "2018", br: 1.92, us: 20.58 },
        { year: "2020", br: 1.45, us: 21.06 },
        { year: "2022", br: 1.92, us: 25.46 },
        { year: "2024", br: 2.17, us: 27.36 }
      ]
    }
  },
  economia: {
    summary: {
      title: "Indicadores Financeiros e Custo de Vida",
      highlight: "Enquanto os EUA possuem uma economia baseada em dólar forte e elevado PIB per capita, o Brasil apresenta maior rentabilidade de juros reais e forte peso das commodities no PIB."
    },
    indicators: [
      {
        id: "inflacao",
        title: "Taxa de Inflação Anual",
        badge: "Brasil +1,4% superior",
        source: "IBGE (IPCA) / US Bureau of Labor Statistics (CPI)",
        methodology: "Índice de preços ao consumidor acumulado em 12 meses.",
        values: {
          absoluto: { br: "4,50%", us: "3,10%", unit: "ao ano", brRaw: 4.5, usRaw: 3.1 },
          perCapita: { br: "4,50%", us: "3,10%", unit: "ao ano", brRaw: 4.5, usRaw: 3.1 },
          variacao: { br: "-1,8% vs 2022", us: "-3,4% vs 2022", unit: "desaceleração", brRaw: -1.8, usRaw: -3.4 }
        }
      },
      {
        id: "taxa_juros",
        title: "Taxa Básica de Juros",
        badge: "Brasil 2,1x maior",
        source: "Banco Central do Brasil (Selic) / Federal Reserve (Fed Funds)",
        methodology: "Taxa de referência para política monetária nacional.",
        values: {
          absoluto: { br: "10,75%", us: "5,25%", unit: "% ao ano", brRaw: 10.75, usRaw: 5.25 },
          perCapita: { br: "10,75%", us: "5,25%", unit: "% ao ano", brRaw: 10.75, usRaw: 5.25 },
          variacao: { br: "+1,50% em 2024", us: "-0,50% em 2024", unit: "tendência recente", brRaw: 1.5, usRaw: -0.5 }
        }
      },
      {
        id: "divida_pib",
        title: "Dívida Pública / PIB",
        badge: "EUA 1,6x maior",
        source: "Tesouro Nacional BR / US Dept of the Treasury (2024)",
        methodology: "Dívida bruta do governo geral em relação ao PIB anual.",
        values: {
          absoluto: { br: "78,5%", us: "123,0%", unit: "% do PIB nominal", brRaw: 78.5, usRaw: 123.0 },
          perCapita: { br: "US$ 8.380", us: "US$ 100.480", unit: "dívida per capita", brRaw: 8380, usRaw: 100480 },
          variacao: { br: "+5,2%", us: "+14,1%", unit: "variação em 5 anos", brRaw: 5.2, usRaw: 14.1 }
        }
      },
      {
        id: "salario_minimo",
        title: "Salário Mínimo Horário (Nominal)",
        badge: "EUA 5,6x maior",
        source: "Ministério do Trabalho / US Dept of Labor (Federal Min.)",
        methodology: "Valor legal mínimo por hora trabalhada convertido em USD.",
        values: {
          absoluto: { br: "US$ 1,28 / h", us: "US$ 7,25 / h", unit: "por hora (USD)", brRaw: 1.28, usRaw: 7.25 },
          perCapita: { br: "US$ 270 / mês", us: "US$ 1.256 / mês", unit: "mensal estimado", brRaw: 270, usRaw: 1256 },
          variacao: { br: "+6,97% (R$ 1.412)", us: "0,0% (Federal fixo)", unit: "reajuste recente", brRaw: 6.97, usRaw: 0.0 }
        }
      }
    ],
    chartData: {
      type: "bar",
      title: "Comparativo de Taxas Financeiras (2024)",
      data: [
        { name: "Taxa de Juros (%)", br: 10.75, us: 5.25 },
        { name: "Inflação IPCA/CPI (%)", br: 4.50, us: 3.10 },
        { name: "Dívida/PIB (%)", br: 78.5, us: 123.0 },
        { name: "Desemprego (%)", br: 6.9, us: 4.1 }
      ]
    }
  },
  educacao: {
    summary: {
      title: "Nível Educacional e Investimento Científico",
      highlight: "Os EUA possuem quase o dobro da proporção de adultos com ensino superior completo em relação ao Brasil (36% vs 20%), além de liderança em publicações científicas e investimento por aluno."
    },
    indicators: [
      {
        id: "superior_completo",
        title: "População 25+ com Ensino Superior",
        badge: "EUA 1,8x maior",
        source: "IBGE PNAD Contínua / US Census Bureau ACS 2023",
        methodology: "Percentual de adultos acima de 25 anos com grau de graduação concluído.",
        values: {
          absoluto: { br: "20,4%", us: "36,2%", unit: "% da população 25+", brRaw: 20.4, usRaw: 36.2 },
          perCapita: { br: "20,4%", us: "36,2%", unit: "% da faixa etária", brRaw: 20.4, usRaw: 36.2 },
          variacao: { br: "+4,2%", us: "+3,8%", unit: "crescimento em 10 anos", brRaw: 4.2, usRaw: 3.8 }
        }
      },
      {
        id: "gasto_educacao",
        title: "Investimento em Educação / PIB",
        badge: "Brasil +0,6% do PIB",
        source: "UNESCO Institute for Statistics / OECD 2023",
        methodology: "Gastos públicos diretos em educação como proporção do PIB nacional.",
        values: {
          absoluto: { br: "6,0%", us: "5,4%", unit: "% do PIB", brRaw: 6.0, usRaw: 5.4 },
          perCapita: { br: "US$ 2.450", us: "US$ 15.600", unit: "gasto anual por estudante", brRaw: 2450, usRaw: 15600 },
          variacao: { br: "-0,3%", us: "+0,2%", unit: "variação anual", brRaw: -0.3, usRaw: 0.2 }
        }
      },
      {
        id: "pisa_score",
        title: "Pontuação Média PISA (Matemática)",
        badge: "EUA +86 pontos",
        source: "OCDE PISA 2022 Results",
        methodology: "Teste padronizado internacional de estudantes de 15 anos de idade.",
        values: {
          absoluto: { br: "379 pts", us: "465 pts", unit: "pontos escala OCDE", brRaw: 379, usRaw: 465 },
          perCapita: { br: "379 pts", us: "465 pts", unit: "média nacional", brRaw: 379, usRaw: 465 },
          variacao: { br: "-5 pts vs 2018", us: "-13 pts vs 2018", unit: "variação pós-pandemia", brRaw: -5, usRaw: -13 }
        }
      },
      {
        id: "artigos_cientificos",
        title: "Artigos Científicos Publicados / Ano",
        badge: "EUA 8,2x maior",
        source: "SCImago Journal & Country Rank / National Science Foundation",
        methodology: "Número anual de publicações acadêmicas indexadas em periódicos globais.",
        values: {
          absoluto: { br: "78.400", us: "645.000", unit: "artigos por ano", brRaw: 78400, usRaw: 645000 },
          perCapita: { br: "386 / mi hab", us: "1.925 / mi hab", unit: "publicações por milhão de hab", brRaw: 386, usRaw: 1925 },
          variacao: { br: "+12,4%", us: "+4,1%", unit: "crescimento de publicações", brRaw: 12.4, usRaw: 4.1 }
        }
      }
    ],
    chartData: {
      type: "bar",
      title: "Desempenho no PISA por Área do Conhecimento (2022)",
      data: [
        { name: "Matemática", br: 379, us: 465 },
        { name: "Leitura", br: 410, us: 504 },
        { name: "Ciências", br: 403, us: 499 }
      ]
    }
  },
  saude: {
    summary: {
      title: "Sistema de Saúde e Indicadores Sociais",
      highlight: "O Brasil garante acesso universal gratuito à saúde através do SUS, enquanto os EUA destinam o maior gasto em saúde per capita do planeta (US$ 12.500/ano), operando majoritariamente com seguros privados."
    },
    indicators: [
      {
        id: "expectativa_vida",
        title: "Expectativa de Vida ao Nascer",
        badge: "EUA +1,6 anos",
        source: "OMS / IBGE / CDC National Center for Health Statistics",
        methodology: "Média estimada de anos de vida para recém-nascidos em 2023.",
        values: {
          absoluto: { br: "75,9 anos", us: "77,5 anos", unit: "anos de vida", brRaw: 75.9, usRaw: 77.5 },
          perCapita: { br: "75,9 anos", us: "77,5 anos", unit: "média populacional", brRaw: 75.9, usRaw: 77.5 },
          variacao: { br: "+2,4 anos", us: "+0,5 anos", unit: "evolução em 10 anos", brRaw: 2.4, usRaw: 0.5 }
        }
      },
      {
        id: "gasto_saude_pc",
        title: "Gasto com Saúde per Capita",
        badge: "EUA 18x maior per capita",
        source: "OMS Global Health Expenditure Database 2023",
        methodology: "Soma de investimentos públicos e privados em saúde dividida pela população.",
        values: {
          absoluto: { br: "US$ 142 Bi", us: "US$ 4,5 Tri", unit: "gasto total em USD", brRaw: 142, usRaw: 4500 },
          perCapita: { br: "US$ 698", us: "US$ 12.555", unit: "por habitante / ano", brRaw: 698, usRaw: 12555 },
          variacao: { br: "+4,1%", us: "+5,8%", unit: "crescimento real anual", brRaw: 4.1, usRaw: 5.8 }
        }
      },
      {
        id: "leitos_hospitalares",
        title: "Leitos Hospitalares / 1.000 hab",
        badge: "EUA 1,3x mais leitos",
        source: "Ministério da Saúde (CNES) / AHA Hospital Statistics",
        methodology: "Número de leitos de internação disponíveis por mil residentes.",
        values: {
          absoluto: { br: "1,8 leitos", us: "2,4 leitos", unit: "por 1.000 habitantes", brRaw: 1.8, usRaw: 2.4 },
          perCapita: { br: "1,8 / 1k", us: "2,4 / 1k", unit: "capacidade relativa", brRaw: 1.8, usRaw: 2.4 },
          variacao: { br: "-0,2 leitos", us: "-0,3 leitos", unit: "variação na última década", brRaw: -0.2, usRaw: -0.3 }
        }
      },
      {
        id: "mortalidade_infantil",
        title: "Mortalidade Infantil (por 1k nascidos)",
        badge: "EUA 2,3x menor taxa",
        source: "UNICEF / CDC National Vital Statistics",
        methodology: "Óbitos de crianças antes de completar 1 ano de idade por mil nascidos vivos.",
        values: {
          absoluto: { br: "12,4", us: "5,4", unit: "por 1.000 nascidos vivos", brRaw: 12.4, usRaw: 5.4 },
          perCapita: { br: "12,4 ‰", us: "5,4 ‰", unit: "por mil", brRaw: 12.4, usRaw: 5.4 },
          variacao: { br: "-2,8 ‰", us: "-0,6 ‰", unit: "redução em 10 anos", brRaw: -2.8, usRaw: -0.6 }
        }
      }
    ],
    chartData: {
      type: "line",
      title: "Evolução da Expectativa de Vida (Anos) — 2012 a 2023",
      data: [
        { year: "2012", br: 73.8, us: 78.8 },
        { year: "2015", br: 74.6, us: 78.7 },
        { year: "2018", br: 75.3, us: 78.7 },
        { year: "2020", br: 74.8, us: 77.0 },
        { year: "2023", br: 75.9, us: 77.5 }
      ]
    }
  },
  tecnologia: {
    summary: {
      title: "Inovação Tecnológica e Conectividade",
      highlight: "Os EUA lideram em patentes registradas (20x a produção brasileira) e investimentos corporativos em Big Techs e IA, enquanto o Brasil se destaca pela alta adoção de pagamentos digitais (Pix) e redes sociais."
    },
    indicators: [
      {
        id: "patentes",
        title: "Patentes Concedidas / Ano",
        badge: "EUA 34x mais patentes",
        source: "INPI / USPTO (US Patent and Trademark Office) 2023",
        methodology: "Concessões de propriedade industrial deferidas pelos órgãos oficiais de patentes.",
        values: {
          absoluto: { br: "4.850", us: "165.400", unit: "patentes deferidas/ano", brRaw: 4850, usRaw: 165400 },
          perCapita: { br: "23,8 / mi hab", us: "493,8 / mi hab", unit: "patentes por 1 mi hab", brRaw: 23.8, usRaw: 493.8 },
          variacao: { br: "+8,2%", us: "+2,1%", unit: "crescimento anual", brRaw: 8.2, usRaw: 2.1 }
        }
      },
      {
        id: "investimento_pd",
        title: "Investimento em P&D / PIB",
        badge: "EUA 2,9x mais P&D",
        source: "MCTI / US National Science Foundation 2023",
        methodology: "Investimento bruto em Pesquisa e Desenvolvimento em relação ao PIB.",
        values: {
          absoluto: { br: "1,21%", us: "3,47%", unit: "% do PIB nacional", brRaw: 1.21, usRaw: 3.47 },
          perCapita: { br: "US$ 129", us: "US$ 2.834", unit: "investimento por habitante", brRaw: 129, usRaw: 2834 },
          variacao: { br: "+0,05%", us: "+0,32%", unit: "expansão no quinquênio", brRaw: 0.05, usRaw: 0.32 }
        }
      },
      {
        id: "acesso_internet",
        title: "População com Acesso à Internet",
        badge: "EUA +9% de cobertura",
        source: "Cetic.br TIC Domicílios / US Census ACS",
        methodology: "Porcentagem da população que utiliza a internet regularmente.",
        values: {
          absoluto: { br: "84,0%", us: "93,2%", unit: "% dos residentes", brRaw: 84.0, usRaw: 93.2 },
          perCapita: { br: "170 Mi usuários", us: "312 Mi usuários", unit: "usuários totais", brRaw: 170, usRaw: 312 },
          variacao: { br: "+22,0%", us: "+7,4%", unit: "expansão nos últimos 8 anos", brRaw: 22.0, usRaw: 7.4 }
        }
      },
      {
        id: "cobertura_5g",
        title: "Conexões 5G e Fibra Óptica",
        badge: "EUA 2,1x mais linhas 5G",
        source: "ANATEL / FCC Wireless Competition Report 2024",
        methodology: "Porcentagem de municípios/condados atendidos por infraestrutura 5G ativa.",
        values: {
          absoluto: { br: "31,0 Mi linhas", us: "142,0 Mi linhas", unit: "acessos 5G ativos", brRaw: 31.0, usRaw: 142.0 },
          perCapita: { br: "15,2%", us: "42,4%", unit: "% de adesão da população", brRaw: 15.2, usRaw: 42.4 },
          variacao: { br: "+180% em 2023", us: "+64% em 2023", unit: "ritmo de adoção", brRaw: 180, usRaw: 64 }
        }
      }
    ],
    chartData: {
      type: "bar",
      title: "Investimento em Pesquisa & Desenvolvimento (% do PIB)",
      data: [
        { name: "P&D / PIB (%)", br: 1.21, us: 3.47 },
        { name: "Pop. Conectada (%)", br: 84.0, us: 93.2 },
        { name: "Usuários 5G (%)", br: 15.2, us: 42.4 }
      ]
    }
  },
  ambiente: {
    summary: {
      title: "Sustentabilidade e Matriz Energética",
      highlight: "O Brasil é líder mundial em energia limpa (84% da eletricidade vem de fontes renováveis), enquanto os EUA possuem emissões per capita 6x maiores devido à dependência histórica de combustíveis fósseis."
    },
    indicators: [
      {
        id: "matriz_renovavel",
        title: "Matriz Elétrica Renovável",
        badge: "Brasil 3,8x mais limpo",
        source: "EPE (Balanço Energético Nacional) / US EIA (Energy Information Admin)",
        methodology: "Participação de fontes limpas (hídrica, eólica, solar e biomassa) na geração elétrica.",
        values: {
          absoluto: { br: "84,7%", us: "22,4%", unit: "% da geração elétrica", brRaw: 84.7, usRaw: 22.4 },
          perCapita: { br: "84,7%", us: "22,4%", unit: "sustentabilidade da rede", brRaw: 84.7, usRaw: 22.4 },
          variacao: { br: "+6,2%", us: "+8,1%", unit: "expansão limpa em 5 anos", brRaw: 6.2, usRaw: 8.1 }
        }
      },
      {
        id: "emissoes_co2",
        title: "Emissões CO₂ per Capita",
        badge: "Brasil 6,5x menos emissões",
        source: "Global Carbon Project / Our World in Data 2023",
        methodology: "Toneladas de dióxido de carbono fóssil emitidas por pessoa ao ano.",
        values: {
          absoluto: { br: "480 Mi ton", us: "4.710 Mi ton", unit: "emissões totais de CO₂", brRaw: 480, usRaw: 4710 },
          perCapita: { br: "2,2 ton", us: "14,3 ton", unit: "toneladas por hab / ano", brRaw: 2.2, usRaw: 14.3 },
          variacao: { br: "-1,2%", us: "-3,5%", unit: "redução média em 5 anos", brRaw: -1.2, usRaw: -3.5 }
        }
      },
      {
        id: "area_florestal",
        title: "Cobertura Florestal (% do Território)",
        badge: "Brasil +25% de cobertura",
        source: "FAO Global Forest Resources Assessment / MapBiomas",
        methodology: "Porcentagem da superfície terrestre coberta por florestas nativas ou plantadas.",
        values: {
          absoluto: { br: "59,4%", us: "33,9%", unit: "% do território nacional", brRaw: 59.4, usRaw: 33.9 },
          perCapita: { br: "5,0 Mi km²", us: "3,3 Mi km²", unit: "área florestal total", brRaw: 5.0, usRaw: 3.3 },
          variacao: { br: "-0,3% / ano", us: "+0,1% / ano", unit: "variação anual de cobertura", brRaw: -0.3, usRaw: 0.1 }
        }
      },
      {
        id: "consumo_energia",
        title: "Consumo de Energia per Capita",
        badge: "EUA 5,1x maior consumo",
        source: "IEA (International Energy Agency) 2023",
        methodology: "Consumo bruto de energia primária por habitante (convertido em MWh).",
        values: {
          absoluto: { br: "670 TWh", us: "3.900 TWh", unit: "consumo elétrico nacional", brRaw: 670, usRaw: 3900 },
          perCapita: { br: "3,1 MWh", us: "15,8 MWh", unit: "por habitante / ano", brRaw: 3.1, usRaw: 15.8 },
          variacao: { br: "+2,1%", us: "-0,8%", unit: "variação no consumo per capita", brRaw: 2.1, usRaw: -0.8 }
        }
      }
    ],
    chartData: {
      type: "bar",
      title: "Participação das Fontes Renováveis na Matriz Elétrica (%)",
      data: [
        { name: "Hidrelétrica", br: 61.2, us: 5.7 },
        { name: "Eólica / Solar", br: 21.5, us: 15.6 },
        { name: "Biomassa", br: 8.8, us: 1.1 },
        { name: "Total Renovável", br: 84.7, us: 22.4 }
      ]
    }
  },
  relacoes: {
    summary: {
      title: "Comércio Bilateral e Integração Econômica",
      highlight: "Os EUA são o 2º maior parceiro comercial do Brasil e o maior destino de exportações de produtos manufaturados brasileiros de maior valor agregado."
    },
    indicators: [
      {
        id: "corrente_comercio",
        title: "Corrente de Comércio Bilateral",
        badge: "US$ 75 Bilhões / ano",
        source: "MDIC (Comex Stat) / US Census Foreign Trade 2023",
        methodology: "Soma das exportações e importações totais de bens entre os dois países.",
        values: {
          absoluto: { br: "US$ 75,0 Bi", us: "US$ 75,0 Bi", unit: "fluxo total em USD", brRaw: 75.0, usRaw: 75.0 },
          perCapita: { br: "US$ 369", us: "US$ 223", unit: "por habitante de cada país", brRaw: 369, usRaw: 223 },
          variacao: { br: "+9,8%", us: "+9,8%", unit: "crescimento do comércio bilateral", brRaw: 9.8, usRaw: 9.8 }
        }
      },
      {
        id: "balanca_comercial",
        title: "Exportações e Saldo Comercial",
        badge: "Superávit dos EUA: US$ 1,1 Bi",
        source: "Comex Stat / US Trade Representative 2023",
        methodology: "Valor das vendas brasileiras aos EUA vs compras americanas.",
        values: {
          absoluto: { br: "US$ 36,9 Bi (Exp)", us: "US$ 38,0 Bi (Exp)", unit: "vendas anuais", brRaw: 36.9, usRaw: 38.0 },
          perCapita: { br: "US$ 181", us: "US$ 113", unit: "vendas por habitante", brRaw: 181, usRaw: 113 },
          variacao: { br: "+5,4%", us: "-12,1%", unit: "variação de vendas", brRaw: 5.4, usRaw: -12.1 }
        }
      },
      {
        id: "cambio_historico",
        title: "Taxa de Câmbio (USD / BRL)",
        badge: "Média 2024: ~R$ 5,45",
        source: "Banco Central do Brasil (SGS) / AwesomeAPI",
        methodology: "Cotação oficial de fechamento comercial do dólar americano.",
        values: {
          absoluto: { br: "R$ 5,45", us: "US$ 0,183", unit: "cotação 1 USD = R$ X", brRaw: 5.45, usRaw: 0.183 },
          perCapita: { br: "R$ 5,45", us: "US$ 0,183", unit: "taxa de conversão", brRaw: 5.45, usRaw: 0.183 },
          variacao: { br: "+7,2%", us: "-6,7%", unit: "variação do dólar em 12 meses", brRaw: 7.2, usRaw: -6.7 }
        }
      },
      {
        id: "investimento_estrangeiro",
        title: "Estoque de Investimento Estrangeiro",
        badge: "EUA 1º Maior Investidor no BR",
        source: "Banco Central do Brasil (IED) / US BEA",
        methodology: "Acumulado de Investimento Estrangeiro Direto (IED) das empresas americanas no Brasil.",
        values: {
          absoluto: { br: "US$ 131 Bi", us: "US$ 44 Bi", unit: "estoque de IED direto", brRaw: 131, usRaw: 44 },
          perCapita: { br: "US$ 645 / hab", us: "US$ 131 / hab", unit: "IED por pessoa", brRaw: 645, usRaw: 131 },
          variacao: { br: "+6,5%", us: "+8,0%", unit: "expansão dos aportes", brRaw: 6.5, usRaw: 8.0 }
        }
      }
    ],
    chartData: {
      type: "line",
      title: "Histórico da Taxa de Câmbio Dólar Comercial (BRL por 1 USD)",
      data: [
        { year: "2015", br: 3.33, us: 1 },
        { year: "2017", br: 3.19, us: 1 },
        { year: "2019", br: 3.94, us: 1 },
        { year: "2021", br: 5.39, us: 1 },
        { year: "2023", br: 4.99, us: 1 },
        { year: "2024", br: 5.45, us: 1 }
      ]
    }
  }
};
