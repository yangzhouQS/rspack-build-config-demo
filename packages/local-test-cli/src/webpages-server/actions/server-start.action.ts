import { logger } from "../../logger";
import { ServerStartCommandFlags } from "../webpages-server.types";
import { ServerBuildAction } from "./server-build.action";

export class ServerStartAction extends ServerBuildAction {
  public async handle(commandFlags: ServerStartCommandFlags) {
    logger.debug("------------------StartAction------------------");

    try {
      // 是否启用 watch
      const isWatchEnabled = commandFlags?.watch;
      // 是否启用 debug 模式，即是否启用 参数 --inspect
      const isDebugEnabled = commandFlags?.debug;

      const onSuccess = () => {
        console.log("dev --- onSuccess");
      };

      await this.runBuild(
        {
          commandFlags,
          isWatchEnabled,
          isDebugEnabled,
          onSuccess,
        },
      );
    }
    catch (error) {
      logger.error("[startAction dev] Failed to start dev server.");
      logger.error(error);
    }
  }
}
