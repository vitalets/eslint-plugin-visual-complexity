# eslint-plugin-visual-complexity

[![lint](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/lint.yaml/badge.svg)](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/lint.yaml)
[![test](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/test.yaml/badge.svg)](https://github.com/vitalets/eslint-plugin-visual-complexity/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-visual-complexity)](https://www.npmjs.com/package/eslint-plugin-visual-complexity)
[![license](https://img.shields.io/npm/l/eslint-plugin-visual-complexity)](https://github.com/vitalets/eslint-plugin-visual-complexity/blob/main/LICENSE)

A custom eslint rule to check code [complexity](https://eslint.org/docs/latest/rules/complexity) without optional chaining.

## Example

Counts the complexity of the following function as **1**, not **4**:

```js
function f(a) {
  return a?.b?.c?.d;
}
```

Complexity **4**, calculated by the core eslint rule, means the function above is equivalent to:
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

## Motivation
Starting from v9, eslint [changed](https://github.com/eslint/eslint/issues/18060) the algorithm of calculating complexity. Now it additionally counts complexity for optional chaining / optional call expressions. While it matches the cyclomatic complexity formula, these expressions don't increase the _visual complexity_ of the code.

After updating to eslint v9, you may need to increase the complexity threshold in the config, because of optional chaining in your code. In turn, this allows complex functions pass your eslint check as well.

Official request for providing an option to disable the new behavior was [discarded](https://github.com/eslint/eslint/issues/18432). That's why this package appeared.

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
          'visual/complexity': ['error', { max: 6 }],
          complexity: 0, // <- disable core complexity rule
        }
      }
      // ...
    ]
    ```

## License
[MIT](https://github.com/vitalets/eslint-plugin-visual-complexity/blob/main/LICENSE)
