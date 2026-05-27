import json
import uuid
from pathlib import Path
from typing import Any, Dict

from langchain_core.tools import tool

_ORDERS_PATH = Path(__file__).parent.parent / "mock_db" / "orders.json"

_orders_cache: Dict[str, Dict[str, Any]] = {}
_refund_state: Dict[str, str] = {}
_tickets: Dict[str, Dict[str, Any]] = {}


def _load_orders() -> Dict[str, Dict[str, Any]]:
    global _orders_cache
    if not _orders_cache:
        with open(_ORDERS_PATH, "r") as f:
            orders = json.load(f)
        _orders_cache = {o["order_id"]: o for o in orders}
    return _orders_cache


@tool
def order_lookup(order_id: str) -> Dict[str, Any]:
    """Look up order details by order ID. Returns status, item, delivery date, amount, and customer name."""
    orders = _load_orders()
    order = orders.get(order_id.upper().strip())
    if not order:
        return {"error": f"Order {order_id} not found", "order_id": order_id}
    if order_id.upper() in _refund_state:
        order = {**order, "status": _refund_state[order_id.upper()]}
    return {
        "order_id": order["order_id"],
        "customer_name": order["customer_name"],
        "item": order["item"],
        "status": order["status"],
        "amount": order["amount"],
        "delivery_date": order["delivery_date"],
        "notes": order.get("notes", ""),
    }


@tool
def refund_trigger(order_id: str, reason: str) -> Dict[str, Any]:
    """Initiate a refund for an order. Requires order ID and reason. Returns confirmation and refund timeline."""
    orders = _load_orders()
    oid = order_id.upper().strip()
    order = orders.get(oid)
    if not order:
        return {"error": f"Order {order_id} not found", "order_id": order_id}
    if order["status"] == "already_refunded":
        return {
            "order_id": oid,
            "status": "already_refunded",
            "message": "A refund has already been processed for this order.",
            "refund_timeline": "N/A",
        }
    _refund_state[oid] = "refund_initiated"
    return {
        "order_id": oid,
        "status": "refund_initiated",
        "reason": reason,
        "amount": order["amount"],
        "message": f"Refund of ${order['amount']:.2f} has been initiated for order {oid}.",
        "refund_timeline": "5-7 business days",
        "item": order["item"],
    }


@tool
def ticket_create(issue: str, priority: str) -> Dict[str, Any]:
    """Create a support ticket for an issue. Priority should be low, medium, or high. Returns ticket ID and ETA."""
    ticket_id = f"TKT-{str(uuid.uuid4())[:8].upper()}"
    eta_map = {"high": "2-4 hours", "medium": "4-8 hours", "low": "1-2 business days"}
    eta = eta_map.get(priority.lower(), "1-2 business days")
    _tickets[ticket_id] = {"issue": issue, "priority": priority, "status": "open"}
    return {
        "ticket_id": ticket_id,
        "issue": issue,
        "priority": priority,
        "status": "open",
        "eta": eta,
        "message": f"Support ticket {ticket_id} created successfully. A specialist will follow up within {eta}.",
    }


@tool
def faq_retriever(query: str) -> Dict[str, Any]:
    """Retrieve relevant FAQ/policy information for a query from the knowledge base."""
    try:
        from rag.retriever import retrieve
        chunks = retrieve(query, n=2)
        return {"query": query, "results": chunks, "source": "policy.md"}
    except Exception as e:
        return {"query": query, "results": [], "error": str(e)}


ALL_TOOLS = [order_lookup, refund_trigger, ticket_create, faq_retriever]
TOOL_MAP = {t.name: t for t in ALL_TOOLS}
