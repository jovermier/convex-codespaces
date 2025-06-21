import { globalIgnores } from "eslint/config";
import globals from "globals";
import pluginJs from "@eslint/js";
import css from "@eslint/css";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactCompiler from "eslint-plugin-react-compiler";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      reactPlugin,
      prettier,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
  },
  globalIgnores([
    ".pnpm-store/*",
    "node_modules/*",
    "public/*",
    "dist/*",
    "build/*",
    "**/reportWebVitals.ts",
    "**/serviceWorker.ts",
    "**/*.d.ts",
    "**/.history",
    "**/.next/",
    "**/.turbo/",
    "**/.vscode/",
  ]),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  reactCompiler.configs.recommended,
  // React rules
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/no-array-index-key": "warn",
      "react/no-unknown-property": "warn",
      "react/display-name": "warn",
      "react/jsx-no-constructed-context-values": "warn",
      "react/no-unused-prop-types": "warn",
      "react/jsx-wrap-multilines": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/require-default-props": "off",
      "react/prop-types": "off",
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "react/function-component-definition": [
        "off",
        {
          namedComponents: "arrow-function",
        },
      ],
    },
  },
  // React Hooks rules
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  // JSX a11y rules
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
    },
  },
  // TypeScript rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "off",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/prefer-for-of": "off",
    },
  },
  // Import rules
  {
    rules: {
      "import/named": "off",
      "import/extensions": "off",
      "import/no-named-as-default": "off",
      "import/no-named-export": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-restricted-exports": "off",
    },
  },
  // General JS rules
  {
    rules: {
      camelcase: "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": "off",
      "no-param-reassign": "off",
      "no-shadow": "off",
      "no-useless-rename": [
        "error",
        {
          ignoreImport: true,
          ignoreExport: true,
        },
      ],
      "default-case": "off",
      "default-param-last": "off",
      "arrow-body-style": ["error", "as-needed"],
      "no-promise-executor-return": "off",
      "react-compiler/react-compiler": "error",
    },
  },
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "no-irregular-whitespace": "off",
      "css/no-duplicate-imports": "error",
    },
  },
  // Prettier rules (should be last)
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
