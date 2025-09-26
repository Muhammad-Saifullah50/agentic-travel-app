
from pydantic import BaseModel

class TriageResponse(BaseModel):
    message: str
    type: str = "triage"
    agent: str | None = None
