import { plainToInstance, Transform } from "class-transformer";
import { IsIn, IsInt, Max, Min, validateSync } from "class-validator";

const NODE_ENVS = ["development", "test", "production"] as const;

type NodeEnv = (typeof NODE_ENVS)[number];

// The shape of our environment, with rules and default values
class EnvVariables {
  @IsIn(NODE_ENVS)
  NODE_ENV: NodeEnv = "development"; // default when not set

  @Transform(({ value }) => Number(value)) // "4000" (string) → 4000 (number)
  @IsInt()
  @Min(1)
  @Max(65535) // highest valid port number
  PORT: number = 4000; // default when not set
}

function loadConfig() {
  const env = plainToInstance(EnvVariables, process.env);
  const errors = validateSync(env);

  if (errors.length > 0) {
    const problems = errors.flatMap((e) => Object.values(e.constraints ?? {}));
    console.error(
      "❌ Invalid environment configuration:\n - " + problems.join("\n - "),
    );
    process.exit(1);
  }

  // Export friendly camelCase names, not raw ENV_NAMES
  return { nodeEnv: env.NODE_ENV, port: env.PORT };
}

export const config = loadConfig();
