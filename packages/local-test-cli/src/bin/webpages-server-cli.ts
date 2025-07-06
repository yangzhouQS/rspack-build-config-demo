#!/usr/bin/env node
import process from "node:process";
import { run } from "@stricli/core";
import { webServerApp } from "../webpages-server/web-server-app";
import { buildContext } from "../webpages-server/web-server-context";

;(async () => {
  await run(webServerApp, process.argv.slice(2), buildContext(process));
})();
