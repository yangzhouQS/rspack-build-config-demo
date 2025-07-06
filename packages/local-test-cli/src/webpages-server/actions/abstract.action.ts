import { ServerBuildCommandFlags } from "../webpages-server.types";

export abstract class AbstractAction {
  public abstract handle(commandFlags: ServerBuildCommandFlags): Promise<void>;
}
