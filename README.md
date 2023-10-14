### 前言

这是一个博客项目，构想是基于angular框架搭建一个能够阅读、上传文件的博客系统，具体业务后续添加。。。

### 风格管理

使用eslint+prettier+commitlint+husky进行风格管理

#### 大致流程

> 下载依赖包->添加配置文件->在package.json中配置执行命令

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
  #安装commitlint
  npm install --save-dev @commitlint/config-conventional @commitlint/cli
  ```

  - 添加commitlint.config.js

    ```js
    module.exports = { extends: ['@commitlint/config-conventional'] };
    ```

- husky配置

  ```sh
  #安装husky
  npm install --save-dev husky
  #生成husky配置文件
  npx husky install
  ```

  ```sh
  #生成pre-commit文件
  npx husky add .husky/pre-commit ""
  ```

  在pre-commit文件中添加各种需要在提交前执行的指令

#### 具体各文件配置如下

- eslintrc.json

  ```json
  {
    "root": true,
    "ignorePatterns": ["projects/**/*"],
    "overrides": [
      {
        "files": ["*.ts"],
        "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:@angular-eslint/recommended", "plugin:@angular-eslint/template/process-inline-templates"],
        "rules": {
          "@angular-eslint/directive-selector": [
            "error",
            {
              "type": "attribute",
              "prefix": "app",
              "style": "camelCase"
            }
          ],
          "@angular-eslint/component-selector": [
            "error",
            {
              "type": "element",
              "prefix": "app",
              "style": "kebab-case"
            }
          ]
        }
      },
      {
        "files": ["*.html"],
        "extends": ["plugin:@angular-eslint/template/recommended", "plugin:@angular-eslint/template/accessibility", "plugin:prettier/recommended"],
        "rules": {
          "prettier/prettier": ["error", { "parser": "angular" }]
        }
      }
    ],
    "rules": {
      // eslint（https://eslint.bootcss.com/docs/rules/）
      "no-var": "error", // 要求使用 let 或 const 而不是 var
      "no-multiple-empty-lines": ["warn", { "max": 1 }], // 不允许多个空行
      "no-unexpected-multiline": "error", // 禁止空余的多行
      "no-useless-escape": "off", // 禁止不必要的转义字符

      // typeScript (https://typescript-eslint.io/rules)
      "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
      "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
      "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
      "@typescript-eslint/semi": "off"
    }
  }
  ```

- prettierrc.json

  ```json
  {
    "singleQuote": true,
    "semi": true,
    "bracketSpacing": true,
    "htmlWhitespaceSensitivity": "ignore",
    "endOfLine": "auto",
    "trailingComma": "all",
    "tabWidth": 2
  }
  ```

- commitlint.config.json

  ```json
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'update',
          'build',
          'ci',
          'perf',
          'feat',
          'fix',
          'refactor',
          'docs',
          'chore',
          'style',
          'revert',
          'test',
        ],
      ],
      'type-case': [0],
      'type-empty': [0],
      'scope-empty': [0],
      'scope-case': [0],
      'subject-full-stop': [0],
      'subject-case': [0, 'never'],
      'header-max-length': [0, 'always', 72],
    },
  };
  ```

- pre-commit

  ```shell
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  pnpm run format
  pnpm run commitlint
  ```

- package.json的script属性

  ```json
  "scripts": {
  	...,
    "prepare": "husky install",
    "format": "npx prettier --write .",
    "commitlint": "npx commitlint --config commitlint.config.js -e -V"
  },
  ```

### 小坑

#### angular内置innerHTML置入标签时样式失效

> 解决方法：给样式添加:host ::ng-deep前缀

#### angular同路由不刷新页面

> 解决办法：自定义路由策略

```typescript
//customReuseStrategy.ts文件
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
export class CustomReuseStrategt implements RouteReuseStrategy {
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {}
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}
```

```typescript
//app-routing.module.ts文件
@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],  //修改同路由策略
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategt }] //使用自定义策略
})
```

#### 页面跳转不滚动到顶部

```js
//只需要在app-routing.module.ts文件中这样修改
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
        //添加这个字段
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategt }],
})
```

### 包优化

> 我们可以使用webpack-bundle-analyzer包，可视化监控打包后的项目体积分布

```sh
#下载包
npm install --save-dev webpack-bundle-analyzer
```

```sh
#使用angular cli的构建功能如下就可以输出stats-json文件
#production是angular.json中配置的构建环境
ng build --configuration production --stats-json
#执行完后会在dist文件夹生成stats.json文件
#然后执行以下命令可以在浏览器打开一个窗口可视化监控
webpack-bundle-analyzer dist/stats.json
```

```json
//我们可以将该命令配置到package.json文件中
"scripts":{
    "analyzer": "ng build --configuration analyzer --stats-json && webpack-bundle-analyzer dist/stats.json",
}
```

```json
//然后在angular.json中配置analyzer环境
"build": {
    "configurations": {
        "analyzer": {
              "optimization": true,
              "outputHashing": "all",
            //配置sourceMap更好对比源代码
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": true,
              "vendorChunk": true,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            },
    }
}
```

### 待做事项

- [x] 文章页面详情
- [x] 登录功能
- [x] 上传文件
- [x] tags上传
- [x] 搜索功能
- [x] tag标签分类功能
- [x] 文档分类功能
- [ ] 留言板功能（添加表情和图片）
- [x] 更新/删除文章
- [x] 懒加载动画效果
- [ ] 懒加载
- [x] 暗黑模式
- [x] 目录功能
- [ ] 目录功能代码抽取
- [ ] 图片懒加载
- [ ] 监控页面访客
- [ ] 优化包体积
