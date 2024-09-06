const { RuleTester } = require("eslint");
const { rules } = require(".");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  languageOptions: { ecmaVersion: "latest" },
});

ruleTester.run(
  "complexity", // rule name
  rules.complexity, // rule code
  {
    valid: [
      {
        code: "a => a?.b?.c",
        options: [{ max: 2 }],
      },
    ],
    invalid: [
      {
        code: "a => a ? a : (b ? b : c)",
        options: [{ max: 2 }],
        errors: [
          {
            message:
              "Arrow function has a complexity of 3. Maximum allowed is 2.",
          },
        ],
      },
    ],
  }
);

console.log("All tests passed!");
