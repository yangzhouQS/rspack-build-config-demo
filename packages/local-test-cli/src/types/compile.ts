import type { RspackOptions } from "@rspack/core";
import { RsbuildConfig } from "@rsbuild/core";
import { ServerBuildCommandFlags } from "../webpages-server/webpages-server.types";
import { InternalContext } from "./context.type";

interface RsbuildCompilerExtras {
  commandFlags: ServerBuildCommandFlags;
  debug?: boolean;
  watchMode?: boolean;
}

export interface RunRsbuildCompilerArgOptions<T = RsbuildCompilerExtras> {
  configuration: any; // PackerConfigType;
  rsbuildConfig?: RsbuildConfig;
  rsbuildServerConfig?: RsbuildConfig;
  rspackConfig?: RspackOptions; // | MultiRspackOptions;
  context: InternalContext<any>; // InternalContext;
  tsConfigPath?: string;
  extras: T;
  onSuccess?: () => void;
}
