import { RunRsbuildCompilerArgOptions } from "../types/compile";
import { PackerConfigType } from "../types/packer-config.type";
import { RunActionBuildArgOptions } from "../webpages-server/actions/server-build.action";

export abstract class BaseCompiler {
  public abstract run(arg: RunRsbuildCompilerArgOptions): any;
}

export interface RunCompilerArgOptions extends RunActionBuildArgOptions {
  configuration: PackerConfigType;
}
