from fastapi.testclient import TestClient

from rag.main import app

client = TestClient(app)


def test_health_returns_ok():
    res = client.get("/health")

    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_health_has_uptime_and_timestamp():
    body = client.get("/health").json()

    assert isinstance(body["uptimeSeconds"], int)
    assert isinstance(body["timestamp"], str)