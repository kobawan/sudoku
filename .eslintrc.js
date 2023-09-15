module.exports = {
  extends: ["react-app"],
  rules: {},
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "no-throw-literal": 0,
      },
    },
  ],
};
