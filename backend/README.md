# Weather API (Backend)

API RESTful em Node.js com Express v5 e TypeScript para fornecimento de dados meteorológicos, previsões diárias/horárias e métricas atmosféricas para países e cidades globais.

---

## Tecnologias e Arquitetura

- **Runtime e Framework**: Node.js, Express v5
- **Linguagem**: TypeScript
- **Integração Externa**: Native fetch para comunicação com a WeatherAPI / Open-Meteo
- **Segurança e CORS**: Pacote cors com origens dinâmicas configuráveis via variáveis de ambiente
- **Cache Local In-Memory**: Mecanismo com expiração automática (TTL) para otimização de latência e prevenção contra rate limits
- **Testes e Cobertura**: Vitest + Supertest (Testes de integração e unitários)
- **Qualidade e Padronização**: Biome (Linting e Formatação)

---

## Como Executar Localmente

### 1. Pré-requisitos
- Node.js (versão 20+)
- Gerenciador de pacotes NPM

### 2. Instalação de Dependências
Navegue até o diretório `backend` e instale as dependências:
```bash
cd backend
npm install
```

### 3. Configuração de Ambiente
Crie o arquivo `.env` no diretório do backend:
```env
PORT=3001
WEATHER_API_KEY=sua_chave_de_api_aqui
WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
CACHE_TTL_SECONDS=600
ALLOWED_ORIGINS=*
```

### 4. Iniciando o Servidor
Para iniciar com Live-Reload via `tsx`:
```bash
npm run dev
```
O servidor estará acessível em `http://localhost:3001`.

---

## Endpoints da API RESTful

### `GET /weather/:country`

Retorna os dados meteorológicos atuais e estendidos para o país especificado.

#### Exemplo de Resposta Bem-Sucedida (`200 OK`)
```json
{
  "success": true,
  "data": {
    "country": "Brazil",
    "city": "Brasília",
    "localtime": "2026-07-24 19:30",
    "temperature_c": 24.0,
    "temperature_f": 75.2,
    "condition": "Clear",
    "condition_icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
    "feels_like_c": 24.5,
    "feels_like_f": 76.1,
    "wind_kph": 12.5,
    "wind_dir": "SE",
    "humidity": 55,
    "uv_index": 0.0,
    "air_quality": {
      "us_epa_index": 1,
      "status": "Good"
    },
    "forecast": [
      {
        "date": "2026-07-24",
        "max_temp_c": 28.0,
        "min_temp_c": 16.0,
        "condition": "Sunny"
      }
    ]
  }
}
```

#### Tratamento de Erros Semânticos
Em caso de falha, o middleware unificado de erro (errorHandler.ts) normaliza a resposta:

```json
{
  "success": false,
  "code": "COUNTRY_NOT_FOUND",
  "message": "Não foi possível localizar o país informado ou sua capital."
}
```

Códigos de erro comuns:
- `COUNTRY_NOT_FOUND` (`404`): País ou localização não encontrados.
- `WEATHER_FETCH_ERROR` (`502`): Falha ao comunicar com a API meteorológica de terceiros.
- `INTERNAL_SERVER_ERROR` (`500`): Erro interno não tratado no servidor.

---

## Estrutura de Arquivos

```text
src/
├── config/           # Configurações globais e variáveis de ambiente (env.ts, cache.ts)
├── controllers/      # Controladores de rota Express (weatherController.ts)
├── middlewares/      # Handler global de exceções (errorHandler.ts)
├── routes/           # Definição das rotas RESTful (weatherRoutes.ts)
├── services/         # Lógica de negócio, fetch externo e cache (weatherService.ts, countryService.ts)
├── tests/            # Suíte de testes unitários e de integração (Vitest + Supertest)
├── types/            # Tipagens TypeScript para requisições e respostas de clima
├── app.ts            # Configuração das instâncias e rotas do Express
└── server.ts         # Inicialização do servidor HTTP
```

---

## Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor localmente com hot-reload via `tsx watch` |
| `npm run build` | Compila o TypeScript em JavaScript na pasta `/dist` via `tsc` |
| `npm start` | Inicializa o servidor compilado de produção (`node dist/server.js`) |
| `npm run test` | Executa os testes Vitest em modo interativo (watch) |
| `npm run test:run` | Executa a bateria de testes uma única vez (indicado para pipelines de CI/CD) |
| `npm run lint` | Valida regras de sintaxe e estilo com o Biome |
| `npm run format` | Aplica as correções de código automaticamente via Biome |
| `npm run check` | Executa validação conjunta de lint e formatação |

---

## Boas Práticas Implementadas

1. **Camada de Cache**: Utiliza cache em memória com expiração por TTL para evitar limites de requisição (rate limit) e proporcionar baixos tempos de resposta.
2. **Arquitetura Desacoplada**: Separação entre Controllers, Services e Middlewares para testabilidade e manutenção.
3. **Resiliência de API**: Tratamento gracioso de erros com mensagens padronizadas.