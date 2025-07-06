import type { Mode } from "@rspack/core";
import process from "node:process";
import color from "picocolors";

export { color };
// export type Mode = "development" | "production" | "none";
export const getNodeEnv = (): Mode => process.env.NODE_ENV as Mode;
export function setNodeEnv(env = ""): void {
  if (["development", "production"].includes(env)) {
    process.env.NODE_ENV = env;
  }
}
