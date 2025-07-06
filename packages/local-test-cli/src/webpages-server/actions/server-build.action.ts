import path from "node:path";
import process from "node:process";
import deepmerge from "deepmerge";
import { RsbuildServerCompiler } from "../../compiler/rsbuild-server.compiler";
import { ConfigurationLoader } from "../../configuration/configuration.loader";
import { defaultPackerConfig } from "../../configuration/default-packer-config";
import { FileSystemReader } from "../../configuration/file-system.reader";
import { RSPACK_BUILD_ERROR } from "../../constants";
import { createContext } from "../../create-context";
import { formatEntry } from "../../helpers/config.helper";
import { createOnSuccessHook } from "../../helpers/process-hook";
import { logger } from "../../logger";
import { RunRsbuildCompilerArgOptions } from "../../types/compile";
import { InternalContext } from "../../types/context.type";
import { PackerConfigType } from "../../types/packer-config.type";
import { packerServicePlugin } from "../plugins/node-service";
import { ServerBuildCommandFlags } from "../webpages-server.types";
import { AbstractAction } from "./abstract.action";

export interface RunActionBuildArgOptions {
  commandFlags: ServerBuildCommandFlags;
  isWatchEnabled: boolean;
  isDebugEnabled?: boolean;
  pathToTsconfig?: string;
  onSuccess?: () => void;
}

export class ServerBuildAction extends AbstractAction {
  protected readonly fileSystemReader = new FileSystemReader(process.cwd());
  protected readonly loader: ConfigurationLoader = new ConfigurationLoader(
    this.fileSystemReader,
  );

  public async handle(commandFlags: ServerBuildCommandFlags): Promise<void> {
    logger.debug("------------------BuildAction------------------");
    try {
      // 是否启用 watch
      const isWatchEnabled = !!(commandFlags.watch);

      await this.runBuild(
        {
          commandFlags,
          isWatchEnabled,
          isDebugEnabled: false,
        },
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  public async runBuild({ commandFlags, isWatchEnabled, isDebugEnabled }: RunActionBuildArgOptions) {
    // 打包配置文件
    let configuration = await this.loader.load(commandFlags?.config);
    configuration = deepmerge(defaultPackerConfig, configuration);

    const context = await createContext<any>(configuration as PackerConfigType, commandFlags);

    const rspackConfig = await this.createRspackConfig(context);

    // 解析出站点和服务打包的配置
    logger.debug("--------runBuild-------------configuration");

    const onSuccess = this.createBuildCallback(context);

    const buildParams = {
      configuration,
      rspackConfig,
      context,
      extras: {
        // inputs: commandOptions,
        watchMode: isWatchEnabled,
        debug: isDebugEnabled,
      },
      tsConfigPath: "tsconfig.json",
      onSuccess,
    } as RunRsbuildCompilerArgOptions<any>;

    /* 构建服务模块 */
    try {
      console.log("-------构建服务模块-------222-");
      const serverCompiler = new RsbuildServerCompiler();
      await serverCompiler.run(buildParams);
    }
    catch (err) {
      const isRspackError = err instanceof Error && err.message === RSPACK_BUILD_ERROR;
      if (!isRspackError) {
        logger.error(`[commands ${context.action}] Failed to build.`);
      }
      logger.error(err);
      process.exit(1);
    }
    finally {
      logger.info("--------------- rsbuild server --------------- end");
    }
  }

  /**
   * 创建服务打包配置
   * @param {InternalContext} context
   * @returns {Promise<void>}
   */
  async createRspackConfig(context: InternalContext<any>) {
    return packerServicePlugin(context);
  }

  createBuildCallback(context: InternalContext<any>) {
    const { isServerBuild } = formatEntry(context);
    if (!isServerBuild || context.action === "build") {
      return () => {};
    }
    return createOnSuccessHook(
      "controllers/main",
      "src",
      true,
      path.join(context.rootPath, "dist"),
      "node",
      {
        shell: false,
      },
    );
  }
}
