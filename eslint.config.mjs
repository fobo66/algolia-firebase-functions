import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import tsdoc from "eslint-plugin-tsdoc";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules", "dist", "out"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  { files: ["**/*.ts"], plugins: { tsdoc }, rules: { "tsdoc/syntax": "warn" } },
]);
