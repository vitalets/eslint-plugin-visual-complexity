const eslint = require("eslint/use-at-your-own-risk");

module.exports = {
  name: "eslint-plugin-visual-complexity",
  rules: {
    complexity: createComplexityRule(),
  },
};

function createComplexityRule() {
  const origRule = eslint.builtinRules.get("complexity");
  return {
    ...origRule,
    create(context) {
      const res = origRule.create(context);

      // disable un-needed checks
      delete res.AssignmentPattern;
      delete res.MemberExpression;
      delete res.CallExpression;

      return res;
    },
  };
}
