# eslint-plugin-visual-complexity

[![lint](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/lint.yaml/badge.svg)](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/lint.yaml)
[![test](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/test.yaml/badge.svg)](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-visual-complexity)](https://www.npmjs.com/package/eslint-plugin-visual-complexity)
[![license](https://img.shields.io/npm/l/eslint-plugin-visual-complexity)](https://github.com/vitalets/eslint-plugin-visual-complexity/blob/main/LICENSE)

A custom eslint rule to check code [complexity](https://eslint.org/docs/latest/rules/complexity) without optional chaining.

## Motivation
Starting from v9, eslint [changed](https://github.com/eslint/eslint/issues/18060) the algorithm of calculating cyclomatic complexity of the code. Now it additionally counts [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). While it matches the complexity formula, these expressions don't actually increase the _visual complexity_.

For example, the following function has a complexity **4** by the core eslint rule:

```js
function f(a) {
  return a?.b?.c?.d;
}
```

It means the function is equivalent to:
```js
function f(a) {
  if (condition) {
    if (condition) {
        return a;
      } else if (condition) {
        return b;
     } else {
       return c;
     }
  } else {
    return d;
  }
}
```
But visually they are quite different. 

This plugin extends eslint `complexity` rule and 
kicks out optional chaining during calculation. It outputs **1** for the first function and **4** for the second one.

> There was a request to provide a built-in option to disable optional chaining counting, but it was [discarded](https://github.com/eslint/eslint/issues/18432).

## Usage

1. Install the package:
    ```
    npm install -D eslint-plugin-visual-complexity
    ```

2. Import and use the plugin in `eslint.config.js`:
    ```js
    import visualComplexity from "eslint-plugin-visual-complexity";

    export default [
      {
        plugins: {
          visual: visualComplexity,
        },
        rules: {
          "visual/complexity": ["error", { max: 6 }],
          complexity: 0, // <- disable core complexity rule
        }
      }
      // ...
    ]
    ```

## License
[MIT](https://github.com/vitalets/eslint-plugin-visual-complexity/blob/main/LICENSE)
