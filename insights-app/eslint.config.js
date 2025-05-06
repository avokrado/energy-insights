import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginCheckFile from "eslint-plugin-check-file";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      js,
      "check-file": pluginCheckFile,
    },
    rules: {
      // 🔤 Enforce kebab-case for filenames
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx,js,jsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 📁 Enforce kebab-case for folder names
  {
    files: ["src/**/!(__tests__)/*"],
    plugins: {
      "check-file": pluginCheckFile,
    },
    rules: {
      "check-file/folder-naming-convention": [
        "error",
        {
          "**/*": "KEBAB_CASE",
        },
      ],
    },
  },

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React rules
  pluginReact.configs.flat.recommended,
]);
