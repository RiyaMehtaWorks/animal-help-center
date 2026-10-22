import { app } from "./app.js";
import { config } from "./config/config.js";
// const PORT = Number(process.env.PORT) || 4000;

app.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});
