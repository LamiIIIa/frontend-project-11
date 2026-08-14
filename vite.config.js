import { resolve } from "path";

export default {
  root: resolve(__dirname),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    hot: true,
  },
};
