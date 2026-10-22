export type HealthStatus = {
  status: "ok";
  uptimeSeconds: number;
  timestamp: string;
};

export class HealthService {
  getHealth(): HealthStatus {
    return {
      status: "ok",
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
