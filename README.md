> **Note**
> This is currently a hack day project.

# @guardian/scripts
Like [react-scripts](https://www.npmjs.com/package/react-scripts) but for the Guardian.

## What does it do?
`@guardian/scripts` provides zero-config solutions to:
1. Lint (via ESLint) a (TypeScript) project with [the Guardian's house rules](https://github.com/guardian/csnx/blob/main/libs/%40guardian/eslint-config/index.js)
2. Run tests (via Jest)

## What doesn't it do?
In short, a lot!

- Integrate with IDEs

   We still want to be able to format on save.

- Support much customisation via flags or configuration
 
   We want to be able to update Jest snapshots via `jest -u`, or fix eslint issues via `eslint --fix`, for example.

- Support non-TypeScript projects
- Offer zero-config for TypeScript, though [`@guardian/tsconfig`](https://github.com/guardian/csnx/tree/main/libs/%40guardian/tsconfig) can be used for that
- And more!

## Why do I want it?
### To have fewer (direct) dependencies!
Using `@guardian/scripts` removes the need to have the following in your project:
- `jest`
- `ts-jest`
- `@guardian/eslint-config-typescript`
- `eslint`

Fewer (direct) dependencies :arrow_right: Fewer Dependabot PRs :arrow_right: Fewer chores :arrow_right: Happier developers!

### To have less configuration
Configuration for ESLint and Jest is pretty the same across projects. Why do we need to repeat ourselves?!

## How do I use it?
> **Note**
> Requires NPM, and does not work with Yarn[^1].

This module is not (yet!) published to NPM. To use it, you can install directly from GitHub:

```bash
npm i -D guardian/scripts#main
```

Then update your scripts in `package.json`:

```json
{
  "scripts": {
    "test": "gu-scripts test",
    "lint": "gu-scripts lint"
  }
}
```

## Show me an example
See https://github.com/guardian/cdk-playground/pull/314 for an example usage.

`@guardian/scripts` is used by itself too. Checkout the [`package.json`](package.json).

[^1]: GitHub installation is achieved through the `prepare` lifecycle script. See [this issue](https://github.com/yarnpkg/yarn/issues/5235) for more info about Yarn incompatibility.
