import { buildApplication, buildRouteMap } from "@stricli/core";
import { version } from "../../package.json";
import { serverBuildCommand } from "./commands/server-build.command";
import { serverStartCommand } from "./commands/server-start.command";

const routes = buildRouteMap({
  routes: {
    build: serverBuildCommand,
    start: serverStartCommand,
  },
  docs: {
    brief: "服务端构建工具",
    hideRoute: {
      // install: true,
      // uninstall: true,
    },
  },
});

export const webServerApp = buildApplication(routes, {
  name: "webpages-server",
  versionInfo: {
    currentVersion: version,
  },
});
