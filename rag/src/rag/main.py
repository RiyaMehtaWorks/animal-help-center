import time
from datetime import datetime, timezone

from fastapi import FastAPI

app = FastAPI(title="AnimalHelpCenter RAG service")

STARTED_AT = time.monotonic()


@app.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "uptimeSeconds": round(time.monotonic() - STARTED_AT),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }