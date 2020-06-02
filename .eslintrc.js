module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "react/jsx-one-expression-per-line": 0,
    "react/react-in-jsx-scope": 0,
  },
};
