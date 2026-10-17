export type HealthStatus = {
  status: string;
  uptimeSeconds: number;
  timestamp: string;
};

export function getHealth(): HealthStatus {
  return {
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}
// { "status": "ok", "uptimeSeconds": 12, "timestamp": "2026-10-17T15:30:00.000Z" }
