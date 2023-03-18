English | [简体中文](./README.CN.md)

# eslint-config-zain

Add `Eslint` rules for `React` and `Typescript`.

## Usage

Installation

```bash
# You only need to install this package, no need to install eslint, prettier or other configuration packages
npm i -D eslint-config-zain
```

Add configuration file `.eslintrc.js` and filter files and folders in `.eslintignore`:

```js
module.exports = {
  extends: 'eslint-config-zain',
  rules: {},
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        // This line can be added or not according to your own configuration
        config: require.resolve('./configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
  },
}
```

Add script and configuration to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
  }
}
```

## Development

1. Publish the package to `~/.yalc` and listen for file modifications:

```
npm run start
```

2. Debugging local packages from `~/.yalc` is used in other projects.

```bash
# Install yalc globally
npm i yalc -g

# Add the local package to other debugging projects (run this command in other projects)
yalc add eslint-config-zain --dev

# Install the dependencies in the local package eslint-config-zain (after the dependencies in the current project are updated, you need to execute this command again in other projects)
npm i
```

3. After debugging is complete, remove the local packages in `~/.yalc`, restore the `package.json` file, and the `node_modules` dependency package.

```bash
# Remove the local package and restore the package.json file
yalc remove eslint-config-zain

# Restore the `node_modules` dependencies
npm i
```

4. Local package hot update principle explanation:

- Using `nodemon` to watch for modifications to specific files, triggering `yalc push` to publish updates to the local package after modification.

```bash
# nodemon commonly used parameters for monitoring file changes and executing corresponding commands (more commands can be viewed through nodemon -h)
nodemon
 --ignore node_modules/ # Ignore directories
 --watch ./ # Watch directories
 -C # Only execute after the change, do not execute the command when first starting up (this project is set to execute when first starting up)
 -e js,ts,json,md # Monitor files with specified suffixes
 --debug # Debug
 -x "npm run push" # Customize commands
```

## Publishing Dependency Packages

1. Update the version number in the `package.json`.

```json
{
  "version": "1.0.4",
}
```

2. Add `npm` user (if already added, there is no need to add it again).

```bash
# (Mac) After adding, the _authToken of the current user will be recorded in this directory: /Users/[current user directory]/.npmrc
npm adduser
```

3. Publish

```bash
npm publish
```
