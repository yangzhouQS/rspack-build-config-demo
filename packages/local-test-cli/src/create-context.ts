import process from "node:process";
import { getAbsolutePath } from "./helpers/path";
import { InternalContext } from "./types/context.type";
import { PackerConfigType } from "./types/packer-config.type";
import { ServerBuildCommandFlags } from "./webpages-server/webpages-server.types";

/**
 * 创建上下文
 * @param {PackerConfigType} configuration
 * @param commandFlags
 * @returns {Promise<InternalContext>}
 */
export async function createContext<C extends ServerBuildCommandFlags>(
  configuration: PackerConfigType,
  commandFlags: C,
): Promise<InternalContext<C>> {
  const action = commandFlags.action ? commandFlags.action : "build";
  const rootPath = configuration.global?.cwd
    ? getAbsolutePath(process.cwd(), configuration.global.cwd)
    : process.cwd();

  return {
    uuid: Date.now(),
    version: PACKER_VERSION,
    rootPath,
    distPath: "",
    action,
    config: configuration,
    commandFlags,
  };
}
