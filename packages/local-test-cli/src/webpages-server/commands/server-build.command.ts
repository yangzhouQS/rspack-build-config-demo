import { buildCommand } from "@stricli/core";

export const serverBuildCommand = buildCommand({
  parameters: {
    flags: {
      count: {
        brief: "是否以调试模式启动",
        kind: "parsed",
        // parse: numberParser,
        optional: false,
      },
    },
  },
  docs: {
    brief: "Echo the first argument to the console",
  },
});
