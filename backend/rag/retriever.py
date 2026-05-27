from pathlib import Path
from typing import List

import chromadb
from chromadb.utils import embedding_functions

_CHROMA_PATH = str(Path(__file__).parent.parent / "chroma_store")
_COLLECTION = "policy_docs"

_client = None
_collection = None


def _get_collection():
    global _client, _collection
    if _collection is None:
        _client = chromadb.PersistentClient(path=_CHROMA_PATH)
        ef = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="sentence-transformers/all-MiniLM-L6-v2", device="cpu"
        )
        _collection = _client.get_or_create_collection(
            name=_COLLECTION, embedding_function=ef
        )
    return _collection


def retrieve(query: str, n: int = 2) -> List[str]:
    collection = _get_collection()
    if collection.count() == 0:
        return []
    results = collection.query(query_texts=[query], n_results=min(n, collection.count()))
    documents = results.get("documents", [[]])[0]
    return documents
