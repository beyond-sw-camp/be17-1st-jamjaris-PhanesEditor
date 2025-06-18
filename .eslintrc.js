module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "@typescript-eslint",
  ],
  "rules": {
    // 여기에서 Airbnb 규칙을 덮어쓰거나 추가할 수 있습니다.
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/extensions": 0, // 확장자 없이 import 허용
    "no-use-before-define": "off", // 사용 전에 정의되지 않은 변수 허용 (TypeScript 때문에)
    "react/react-in-jsx-scope": "off", // React 17 이상에서는 필요 없음
  },
  "settings": {
    "react": {
      "version": "detect", // React 버전을 자동으로 감지
    },
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        // TypeScript 관련 규칙 추가
      }
    }
  ]
};