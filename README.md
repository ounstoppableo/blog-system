### 前言

这是一个博客项目，构想是基于angular框架搭建一个能够阅读、上传文件的博客系统，具体业务后续添加。。。

### 风格管理

使用eslint+prettier+commitlint+husky进行风格管理

- eslint安装，具体参考[angular-eslint](https://github.com/angular-eslint/angular-eslint#migrating-an-angular-cli-project-from-codelyzer-and-tslint)

  ```sh
  ng add @angular-eslint/schematics
  ```

- prettier安装，具体参考

  ```sh
  pnpm i prettier -D
  ```

  用法:

  - 根目录创建一个**.prettierrc.json**文件和**prettierignore**文件
  - **prettierignore**复制gitignore的内容
  - ```sh
    #文件格式化
    npx prettier --write .
    #查看哪些文件会被格式化，不具体执行
    npx prettier --write .
    ```

- 解决冲突问题

  ```sh
  #eslint-config-prettier:它会关闭所有不必要或者可能与 Prettier 冲突的 ESLint 规则
  #eslint-plugin-prettier:它会将 Prettier 作为 ESLint 规则运行
  npm install --save-dev eslint-config-prettier
  npm install --save-dev eslint-plugin-prettier
  ```

  将**"plugin:prettier/recommended"**写入**.eslintrc.json**中的extends数组的最后：

  ```json
  "extends": [
    "plugin:@angular-eslint/template/recommended",
    "plugin:@angular-eslint/template/accessibility",
    "plugin:prettier/recommended"
  ],
  ```

  执行**ng lint --fix**会自动修复prettier的规则

- 添加完这些后，html文档可能会出现报错，这是因为prettier与angular不适配的问题

  解决方案：

  在**eslintrc.json**的rules添加：**"prettier/prettier": ["error", { "parser": "angular" }]**

  ```json
  "rules": {
    "prettier/prettier": ["error", { "parser": "angular" }]
  }
  ```

- commitlint配置

  ```sh
  #安装husky
  npm install --save-dev husky
  #安装commitlint
  npm install --save-dev @commitlint/config-conventional @commitlint/cli
  ```

  - 添加commitlint.config.js

    ```js
    module.exports = { extends: ['@commitlint/config-conventional'] };
    ```

- husky配置

  ```sh
  #生成husky配置文件
  npx husky install
  ```

  ```sh
  #生成pre-commit文件
  npx husky add .husky/pre-commit ""
  ```

  在pre-commit文件中添加各种需要在提交前执行的指令
