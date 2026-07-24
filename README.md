# Global Weather Dashboard

Ecossistema de visualização meteorológica em tempo real, projetado para operar como Widget de Quadro (Board View) do monday.com e como Dashboard Web Standalone.

---

## Visão Geral

O Global Weather Dashboard permite aos usuários monitorar dados climáticos detalhados, previsões diárias e horárias, índice UV, qualidade do ar, umidade e condições de vento para locais e países.

O sistema é organizado em uma estrutura monorepo desacoplada:

- **Frontend**: Aplicação web desenvolvida em Next.js 16 (React 19) e Tailwind CSS v4. Possui sistema de fundo dinâmico atmosférico, modais detalhados e alternância entre o modo Widget monday.com e o modo Standalone.
- **Backend**: API RESTful desenvolvida em Node.js com Express v5 e TypeScript. Atua como proxy inteligente consumindo provedores de dados meteorológicos, aplicando políticas de suporte a CORS, tratamento centralizado de erros e cache in-memory.

---

## Tecnologias e Arquitetura

### Frontend
- **Framework**: Next.js 16 (React 19 - App Router)
- **Estilização**: Tailwind CSS v4 com utilitários customizados e Glassmorphism
- **Ícones**: Lucide React
- **Integração monday.com**: monday-sdk-js com fallback automático para modo Standalone
- **Qualidade de Código**: Biome (Linting e Formatação), Vitest (Testes unitários)

### Backend
- **Runtime e Servidor**: Node.js com Express.js v5
- **Linguagem**: TypeScript
- **Segurança e CORS**: Middleware cors nativo com origens configuráveis por ambiente
- **Cache**: Sistema de cache em memória para otimização de latência e prevenção contra rate limiting
- **Testes**: Vitest + Supertest para testes de integração e unitários
- **Qualidade de Código**: Biome (Linting e Formatação)

### Orquestração e Deploy
- **Monorepo Dev**: concurrently para execução simultânea de frontend e backend em ambiente local.
- **Hospedagem Multi-serviço**: Suporte a deploy unificado no Vercel através do vercel.json com roteamento para serviços independentes.

---

## Estrutura do Projeto

```text
GlobalWeatherDashboard/
├── backend/
│   ├── src/
│   │   ├── config/       # Variáveis de ambiente e setup inicial (env.ts, cache.ts)
│   │   ├── controllers/  # Controladores de rota (weatherController.ts)
│   │   ├── middlewares/  # Tratamento global de erros (errorHandler.ts)
│   │   ├── routes/       # Mapeamento de endpoints REST (weatherRoutes.ts)
│   │   ├── services/     # Lógica de negócio, fetch externo e cache (weatherService.ts, countryService.ts)
│   │   ├── tests/        # Bateria de testes unitários e de integração
│   │   ├── types/        # Interfaces e definições TypeScript de clima
│   │   ├── app.ts        # Configuração do aplicativo Express e rotas
│   │   └── server.ts     # Ponto de entrada do servidor HTTP
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── app/          # Páginas e layout Next.js (layout.tsx, page.tsx, globals.css)
│   │   ├── components/   # Componentes visuais (AtmosphericBackground, DashboardHeader, WeatherCard, WeatherCardGrid, WeatherDetailModal)
│   │   ├── hooks/        # Hooks de estado e dados (useDashboard, useWeather, useCountries)
│   │   ├── services/     # Serviços de integração (weatherApi.ts, countryService.ts)
│   │   ├── types/        # Definições de tipos da UI e do clima
│   │   └── utils/        # Utilitários de ícones, formatação de clima e bandeiras
│   ├── package.json
│   └── README.md
├── package.json          # Script orquestrador monorepo
├── vercel.json           # Configuração de roteamento e serviços Vercel
└── README.md
```

---

## Pré-requisitos

- **Node.js**: Versão 20.x ou superior.
- **NPM**: Versão 10.x ou superior.

---

## Instruções de Execução Local

### 1. Clonar o Repositório e Instalar Dependências

Instalar dependências na raiz:
```bash
npm install
```

Instalar dependências do backend e do frontend:
```bash
cd backend && npm install && cd ../frontend && npm install && cd ..
```

### 2. Configurar Variáveis de Ambiente no Backend

Criar arquivo `.env` na pasta `backend/`:
```env
PORT=3001
WEATHER_API_KEY=sua_chave_aqui
WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
CACHE_TTL_SECONDS=600
ALLOWED_ORIGINS=*
```

### 3. Iniciar o Monorepo

Executar o comando a partir do diretório raiz:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

---

## Scripts do Monorepo

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Executa o backend (`port 3001`) e o frontend (`port 3000`) em paralelo |
| `npm run build` | Compila o build de produção do frontend e do backend |
| `npm run test` | Executa a suíte de testes automatizados do backend |

---

## Deploy no Vercel

Suporte a Vercel Multi-Service via vercel.json:

```json
{
  "services": {
    "frontend": { "root": "frontend", "framework": "nextjs" },
    "backend": { "root": "backend", "entrypoint": "src/app.ts" }
  },
  "rewrites": [
    { "source": "/api/backend(/.*)?", "destination": { "type": "service", "service": "backend" } },
    { "source": "/(.*)", "destination": { "type": "service", "service": "frontend" } }
  ]
}
```

---

## Licença

Este projeto está sob a licença ISC. Consulte as configurações no package.json.
