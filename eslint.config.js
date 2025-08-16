import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'

const compat = new FlatCompat({
  baseDirectory: path.resolve(),
})

export default [
  ...compat.extends('@rocketseat/eslint-config/react'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      camelcase: 'off',
      'no-useless-constructor': 'off',
    },
  },
]