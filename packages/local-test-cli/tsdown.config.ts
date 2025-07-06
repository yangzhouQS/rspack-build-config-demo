import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/bin/webpages-packer-cli.ts",
    "src/bin/webpages-server-cli.ts",
  ],
  shims: true,
  format: ["esm"],
});
