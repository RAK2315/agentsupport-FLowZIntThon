# AgentSupport

A full-stack AI customer support agent built with FastAPI, LangGraph, Groq (llama-3.3-70b-versatile), ChromaDB, and Next.js 14.

## Architecture

- **Backend**: FastAPI + LangGraph state graph with 5 nodes (intent_router, tool_executor, action_validator, audit_logger, responder)
- **LLM**: Groq llama-3.3-70b-versatile (zero-cost beyond API key)
- **RAG**: ChromaDB + sentence-transformers/all-MiniLM-L6-v2 on CPU
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, dark theme

## Prerequisites

- Python 3.10+
- Node.js 18+
- A Groq API key (free at console.groq.com)

## Environment Variables

### Backend (`.env` in `backend/`)

```
GROQ_API_KEY=your_groq_api_key_here
```

### Frontend (`.env.local` in `frontend/`)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Local Development

### Backend

```bash
cd agentsupport/backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your_key_here" > .env

# Start the server (RAG ingestion runs automatically on startup)
uvicorn main:app --reload --port 8000
```

The server will be available at `http://localhost:8000`. API docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd agentsupport/frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/chat` | Send a message, get AI response |
| GET | `/audit/{session_id}` | Get full audit trail for a session |
| DELETE | `/audit/{session_id}` | Clear session audit trail |

### Example Chat Request

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id": "demo-session", "message": "I received the wrong item for order ORD-003"}'
```

### Example Audit Trail Request

```bash
curl http://localhost:8000/audit/demo-session
```

## Demo Script

The mock database supports this exact demo flow:

**User**: "I received the wrong item for order ORD-003"

**Agent flow**:
1. `intent_router` — classifies as wrong-item case, plans 3 tools
2. `tool_executor` — calls `order_lookup("ORD-003")` → finds `wrong_item` status
3. `tool_executor` — calls `refund_trigger("ORD-003", ...)` → initiates $249.99 refund
4. `tool_executor` — calls `ticket_create(...)` → creates high-priority ticket
5. `responder` — generates confirmation with ticket ID and refund timeline

The audit trail captures all steps with full tool inputs, outputs, and reasoning.

## Deployment

### Backend → Render

1. Push the `agentsupport/backend` directory to a GitHub repo
2. Create a new **Web Service** on [render.com](https://render.com)
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `GROQ_API_KEY=your_key`

> Note: ChromaDB uses `./chroma_store` for persistence. On Render's free tier, this resets on each deploy. For production, use a persistent disk or an external vector DB.

### Frontend → Vercel

1. Push the `agentsupport/frontend` directory to a GitHub repo (or the root of a repo)
2. Import the project on [vercel.com](https://vercel.com)
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com`
5. Deploy

## Project Structure

```
agentsupport/
├── backend/
│   ├── main.py                  FastAPI app + endpoints
│   ├── agent/
│   │   ├── graph.py             LangGraph state machine
│   │   ├── tools.py             4 tools: order_lookup, refund_trigger, ticket_create, faq_retriever
│   │   ├── validator.py         Pydantic validation models
│   │   └── audit.py             In-memory session audit store
│   ├── rag/
│   │   ├── ingest.py            ChromaDB ingestion on startup
│   │   └── retriever.py         Semantic search over policy.md
│   ├── mock_db/
│   │   └── orders.json          6 sample orders
│   ├── docs/
│   │   └── policy.md            Return/refund/warranty policy (400+ words)
│   └── requirements.txt
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── page.tsx             Chat interface
    │   └── audit/page.tsx       Audit trail viewer
    ├── components/
    │   ├── ChatWindow.tsx       Full chat UI with session management
    │   ├── AuditPanel.tsx       Collapsible audit step cards
    │   └── StepReplay.tsx       Animated step-by-step replay
    └── package.json
```
