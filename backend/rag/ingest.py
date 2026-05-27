import os
from pathlib import Path

import chromadb
from chromadb.utils import embedding_functions

_POLICY_PATH = Path(__file__).parent.parent / "docs" / "policy.md"
_CHROMA_PATH = str(Path(__file__).parent.parent / "chroma_store")
_COLLECTION = "policy_docs"


def _chunk_policy(text: str, min_len: int = 100):
    paragraphs = [p.strip() for p in text.split("\n\n") if len(p.strip()) >= min_len]
    return paragraphs


def ingest() -> None:
    client = chromadb.PersistentClient(path=_CHROMA_PATH)
    ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="sentence-transformers/all-MiniLM-L6-v2", device="cpu"
    )
    collection = client.get_or_create_collection(name=_COLLECTION, embedding_function=ef)

    if collection.count() > 0:
        return

    with open(_POLICY_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    chunks = _chunk_policy(text)
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    collection.add(documents=chunks, ids=ids)
    print(f"[RAG] Ingested {len(chunks)} chunks from policy.md")


if __name__ == "__main__":
    ingest()
