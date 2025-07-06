import { defineConfig } from "tsdown";
import pkgJson from "./package.json";

const define = {
  PACKER_VERSION: JSON.stringify(pkgJson.version),
  PACKER_NAME: JSON.stringify(pkgJson.name),
};
export default defineConfig({
  entry: [
    "src/bin/webpages-packer-cli.ts",
    "src/bin/webpages-server-cli.ts",
  ],
  shims: true,
  format: ["esm"],
  define,
});
