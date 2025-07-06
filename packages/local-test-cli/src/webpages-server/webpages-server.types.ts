import { CommandContext } from "@stricli/core";
import { ActionType } from "../types/context.type";

/**
 * 服务构建支持参数
 */
export interface ServerBuildCommandFlags extends CommandContext {
  env: string;
  config: string;
  tsConfigPath: string;
  watch: boolean;
  typeCheck: boolean;
  action: ActionType;
}

/**
 * 本地服务启动支持参数
 */
export interface ServerStartCommandFlags extends ServerBuildCommandFlags {
  debug: boolean;
}
