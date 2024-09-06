# eslint-plugin-visual-complexity

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
Starting from eslint v9, the algorithm of calculating complexity was [changed](https://github.com/eslint/eslint/issues/18060). Now it counts complexity for optional chaining / optional call expressions. While it's inline with the cyclomatic complexity formula, these expressions don't increase the _visual complexity_ of the code.

After updating to eslint v9, you may need to increase the complexity threshold in the config, because of optional chaining in your code. In turn, this allows complex functions pass your eslint check as well.

Official request for providing an option to disable the new behavior was [discarded](https://github.com/eslint/eslint/issues/18432). That's why this package appeared.

## Usage

1. Install the package
    ```
    npm install -D eslint-plugin-visual-complexity
    ```

2. Import and use plugin in `eslint.config.js`:
    ```js
    import visualComplexity from "eslint-plugin-visual-complexity"; // <- import the plugin

    export default [
      {
        plugins: {
          'visual-complexity': visualComplexity, // <- add the plugin
        },
        rules: {
          'visual-complexity/complexity': ['error', { max: 4 }], // <- set complexity rule
          complexity: 0, // <- disable core complexity rule
        }
      }
      // ...
    ]
    ```

## License
[MIT](https://github.com/vitalets/eslint-plugin-visual-complexity/blob/main/LICENSE)
