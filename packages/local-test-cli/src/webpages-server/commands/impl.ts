import type { LocalContext } from "../web-server-context";
import { ServerStartCommandFlags } from "../webpages-server.types";

export default async function startCommand(this: LocalContext, flags: ServerStartCommandFlags): Promise<void> {
  console.log("startCommand flags-->", flags);
  // ...
}
