module.exports = {
  "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    overrides: [
        {
          files: ['*.ts', '*.tsx'], // Your TypeScript files extension
    
          // As mentioned in the comments, you should extend TypeScript plugins here,
          // instead of extending them outside the `overrides`.
          // If you don't want to extend any rules, you don't need an `extends` attribute.
          extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
          ],
    
          parserOptions: {
            project: ['./tsconfig.json'], // Specify it only for TypeScript files
          },
        },
      ],
    "extends": [
        "eslint:recommended",
        'airbnb-base',
        'airbnb-typescript/base',
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "object-curly-newline": ["off"],
        "no-constant-condition": 0,
        "max-len": ["error", { "code": 160 }],
        "no-plusplus": 0,
        "no-continue": 0,
        "@typescript-eslint/no-shadow": 0,
        "class-methods-use-this": 0,
        "import/prefer-default-export": 0,
        "no-underscore-dangle": 0,
        "prefer-destructuring": 0,
    }
}
