from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, ValidationError


class OrderLookupResult(BaseModel):
    order_id: str
    customer_name: Optional[str] = None
    item: Optional[str] = None
    status: Optional[str] = None
    amount: Optional[float] = None
    delivery_date: Optional[str] = None
    notes: Optional[str] = None
    error: Optional[str] = None


class RefundResult(BaseModel):
    order_id: str
    status: str
    message: str
    refund_timeline: Optional[str] = None
    amount: Optional[float] = None
    reason: Optional[str] = None
    item: Optional[str] = None
    error: Optional[str] = None


class TicketResult(BaseModel):
    ticket_id: str
    issue: str
    priority: str
    status: str
    eta: str
    message: str
    error: Optional[str] = None


class FAQResult(BaseModel):
    query: str
    results: List[str]
    source: Optional[str] = None
    error: Optional[str] = None


_VALIDATORS = {
    "order_lookup": OrderLookupResult,
    "refund_trigger": RefundResult,
    "ticket_create": TicketResult,
    "faq_retriever": FAQResult,
}


def validate_tool_output(
    tool_name: str, raw_output: Dict[str, Any]
) -> Union[OrderLookupResult, RefundResult, TicketResult, FAQResult, Dict]:
    model = _VALIDATORS.get(tool_name)
    if model is None:
        return raw_output
    try:
        return model(**raw_output)
    except ValidationError:
        return raw_output
