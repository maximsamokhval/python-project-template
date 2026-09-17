/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: "no-runtime-cycles",
      severity: "error",
      from: {},
      to: {
        circular: true,
        dependencyTypesNot: ["type-only"],
      },
    },
    {
      name: "no-unresolved-imports",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: "no-production-imports-from-tests",
      severity: "error",
      from: {
        path: "^src",
      },
      to: {
        path: "(^|/)(tests?|__tests__|test-support)(/|$)|\\.(spec|test)\\.",
      },
    },
    {
      name: "no-production-imports-from-dev-dependencies",
      severity: "error",
      from: {
        path: "^src",
      },
      to: {
        dependencyTypes: ["npm-dev"],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    tsConfig: {
      fileName: "tsconfig.app.json",
    },
  },
};
