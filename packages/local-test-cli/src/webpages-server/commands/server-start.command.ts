import { buildCommand } from "@stricli/core";
import { ServerStartCommandFlags } from "../webpages-server.types.ts";
import {ServerStartAction} from "../actions/server-start.action.ts";

export const serverStartCommand = buildCommand({
  /* loader: async (_this: LocalContext, flags: ServerStartCommandFlags) => {
    logger.info("---serverStartCommand----", flags);
    if (!flags) {
      throw new Error("flags is empty");
    }
    flags.action = "dev";
    new ServerStartAction().handle(flags);
  }, */
  /* loader: (a: any, b: any) => {
    console.log("----------------------a-----b--");
    console.log(a, b);
  }, */
  loader: async () => {
    return (flags: ServerStartCommandFlags, ...inputPaths: string[]) => {
      console.log("call-back---", flags, inputPaths);
      flags.action = "dev";
      new ServerStartAction().handle(flags);
    };
  },
  /* func: (flags: any, input: number) => {
    console.log("func-->", flags, input);
  }, */
  parameters: {
    /* positional: {
      kind: "tuple",
      parameters: [],
    }, */
    flags: {
      env: {
        kind: "parsed",
        brief: "process.env.NODE_ENV 环境变量",
        optional: true,
        parse: String,
        // default: "development",
      },
      config: {
        kind: "parsed",
        brief: "配置文件路径",
        optional: true,
        parse: String,
        // default: "development",
      },
      tsConfigPath: {
        kind: "parsed",
        brief: "Path to tsconfig file.",
        optional: true,
        parse: String,
        // default: "development",
      },
      debug: {
        kind: "boolean",
        brief: "是否以调试模式启动",
        default: false,
      },
      watch: {
        kind: "boolean",
        brief: "以监听模式启动",
        default: false,
      },
      typeCheck: {
        kind: "boolean",
        brief: "类型检查",
        default: false,
      },
    },
    aliases: {
      d: "debug",
      w: "watch",
      c: "config",
      p: "tsConfigPath",
    },
  },
  docs: {
    brief: "启动本地开发服务",
  },
});
