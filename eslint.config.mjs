import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals"
import json from "@eslint/json";
import tsdoc from "eslint-plugin-tsdoc";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "node_modules",
    "dist",
    "out",
    "test/FakeSearchClient.ts" // it has a lot of unused vars, but used only for tests
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  json.configs.recommended,
  {
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
  { files: ["**/*.ts"], plugins: { tsdoc }, rules: {"tsdoc/syntax": "warn"} },
]);
