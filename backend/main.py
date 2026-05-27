import os
from contextlib import asynccontextmanager
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    from rag.ingest import ingest
    ingest()
    yield


app = FastAPI(title="AgentSupport API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    response: str
    session_id: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    from agent.graph import run_agent
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    response = run_agent(req.session_id, req.message)
    return ChatResponse(response=response, session_id=req.session_id)


@app.get("/audit/{session_id}")
def get_audit(session_id: str):
    from agent.audit import get_audit as _get
    steps = _get(session_id)
    return [s.model_dump() for s in steps]


@app.delete("/audit/{session_id}")
def delete_audit(session_id: str):
    from agent.audit import clear_audit
    clear_audit(session_id)
    return {"status": "cleared", "session_id": session_id}
