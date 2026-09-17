import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const typedFiles = [
  "**/*.{ts,tsx}",
  "src/**/*.{js,jsx}",
  "tests/**/*.{js,jsx}",
];
const reactFiles = ["src/**/*.{jsx,tsx}", "tests/**/*.{jsx,tsx}"];

const typedConfigs = [
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
].map((config) => ({ ...config, files: typedFiles }));

export default tseslint.config(
  {
    ignores: [
      "coverage/**",
      "dist/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  },
  ...typedConfigs,
  {
    ...react.configs.flat.recommended,
    files: reactFiles,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ...react.configs.flat["jsx-runtime"],
    files: reactFiles,
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: reactFiles,
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: reactFiles,
  },
  {
    files: typedFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      "*.{js,mjs,cjs,ts}",
      "scripts/**/*.{js,mjs,cjs,ts}",
      "tests/**/*.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
);
