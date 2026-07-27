# Global Weather Dashboard (Frontend)

Interface web responsiva e atmosférica desenvolvida em Next.js 16, React 19 e Tailwind CSS v4.

---

## Recursos e Funcionalidades

- **Fundo Atmosférico Dinâmico (AtmosphericBackground)**: Fundo visual renderizado via CSS/Canvas que reage ao clima atual da localização selecionada (sol, nuvens, chuva, neve, tempestades).
- **Painel de Controle (DashboardHeader)**: Busca instantânea com filtro em tempo real, alternador de unidade de temperatura (°C / °F), botão de atualização rápida e métricas.
- **Grid de Cards de Clima (WeatherCardGrid & WeatherCard)**: Exibição visual com estilo Glassmorphism, animações e indicadores climáticos.
- **Modal de Detalhes Completo (WeatherDetailModal)**:
  - Previsão detalhada por horas e para os próximos 7 dias.
  - Medidores visuais de Índice UV e Qualidade do Ar.
  - Mostrador de direção e velocidade do vento.
  - Pressão atmosférica, umidade e visibilidade.
  - Horários astronômicos de nascer e pôr do sol e da lua.

---

## Tecnologias Utilizadas

- **Framework**: Next.js 16 (React 19 - App Router)
- **Estilização**: Tailwind CSS v4 (@tailwindcss/postcss) com variáveis CSS e Glassmorphism
- **Ícones**: Lucide React (lucide-react)
- **Qualidade de Código**: Biome (Linting e Formatação), Vitest (Testes unitários)

---

## Como Executar Localmente

### 1. Pré-requisitos
- Node.js (versão 20+)
- Gerenciador de pacotes NPM

### 2. Instalação
Navegue até a pasta `frontend` e instale as dependências:
```bash
cd frontend
npm install
```

### 3. Execução em Desenvolvimento
Inicie o servidor de desenvolvimento Next.js:
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

---

## Estrutura de Componentes e Arquivos

```text
src/
├── app/
│   ├── globals.css                   # Estilos globais e diretivas do Tailwind v4
│   ├── layout.tsx                    # Layout raiz da aplicação
│   └── page.tsx                      # Página principal do dashboard
├── components/
│   ├── AtmosphericBackground/        # Fundo dinâmico com efeitos de clima
│   ├── DashboardHeader/              # Cabeçalho com busca, filtros e ações
│   ├── LoadingSpinner/               # Indicador de carregamento customizado
│   ├── SearchBar/                    # Componente de pesquisa com sugestões
│   ├── WeatherCard/                  # Card individual de exibição de clima
│   ├── WeatherCardGrid/              # Container em grid responsivo para os cards
│   └── WeatherDetailModal/           # Modal expansivo com métricas estendidas
├── hooks/
│   ├── useCountries.ts               # Hook para busca de países via Backend API
│   ├── useDashboard.ts               # Hook principal de estado da UI (filtros, busca, unidades)
│   └── useWeather.ts                 # Hook para consumo dos dados do backend de clima
├── services/
│   ├── countryService.ts             # Serviço de busca de dados de países
│   └── weatherApi.ts                 # Cliente HTTP para consumo da Backend Weather API
├── types/
│   ├── ui.ts                         # Tipos de estado da interface e preferências do usuário
│   └── weather.ts                    # Interfaces de dados meteorológicos
└── utils/
    ├── api.ts                        # Utilitários de requisições HTTP
    ├── flags.ts                      # Conversor de códigos de países para bandeiras
    └── weather.ts                    # Utilitários para formatação de temperaturas e ícones
```

---

## Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia a aplicação Next.js em modo de desenvolvimento local |
| `npm run build` | Compila a aplicação para produção |
| `npm start` | Inicia a versão de produção compilada |
| `npm run test` | Executa a suíte de testes Vitest em modo interativo |
| `npm run test:run` | Executa os testes Vitest uma única vez |
| `npm run lint` | Executa a análise estática de código com o Biome |
| `npm run format` | Aplica correções automáticas de estilo de código via Biome |
| `npm run check` | Valida formatação e linting simultaneamente |
