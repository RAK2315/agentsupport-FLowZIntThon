from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from pydantic import BaseModel


class AuditStep(BaseModel):
    step_num: int
    node_name: str
    tool_called: Optional[str] = None
    tool_input: Optional[Dict[str, Any]] = None
    tool_output: Optional[Any] = None
    reasoning: Optional[str] = None
    timestamp: str


_store: Dict[str, List[AuditStep]] = {}


def log_step(
    session_id: str,
    node_name: str,
    reasoning: Optional[str] = None,
    tool_called: Optional[str] = None,
    tool_input: Optional[Dict[str, Any]] = None,
    tool_output: Optional[Any] = None,
) -> AuditStep:
    if session_id not in _store:
        _store[session_id] = []
    step_num = len(_store[session_id]) + 1
    step = AuditStep(
        step_num=step_num,
        node_name=node_name,
        tool_called=tool_called,
        tool_input=tool_input,
        tool_output=tool_output,
        reasoning=reasoning,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    _store[session_id].append(step)
    return step


def get_audit(session_id: str) -> List[AuditStep]:
    return _store.get(session_id, [])


def clear_audit(session_id: str) -> None:
    _store.pop(session_id, None)
