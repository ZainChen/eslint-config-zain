module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort'],
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: [
          'function-declaration',
          'function-expression',
          'arrow-function',
        ],
        unnamedComponents: 'function-expression',
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // 这里是把 import './*.scss' 自动排序到最后。其它排序规则顺序都保持和依赖包里 defaultGroups 一样
          // 解决父组件样式覆盖不了子组件样式问题。如果 import './*.scss' 排在第一，子组件样式优先级会高于父组件
          // Side effect imports.
          ['^\\u0000'],
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
}
