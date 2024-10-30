<h1 align="center">image-duplicates-webpack-plugin</h1>
<p align="center">查找项目中是否有重复图片</p>

## 配置项

| **配置项名称** | **是否必须** | **含义**           | **默认值** | **类型**  |
| -------------- | ------------ | --------           | ---------- | --------  |
| `imagePath`    | 否           | 需要查找的图片路径 | src        | `string`  |
| `imageType`    | 否           | 需要查找的图片类型 | ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']|`Array<string>` |
| `imageType`    | 否           | 输出的资源路径格式 | false      | `Boolean` |

## [安装]((https://www.npmjs.com/package/image-duplicates-webpack-plugin))

```bash
npm install image-duplicates-webpack-plugin -D
pnpm add image-duplicates-webpack-plugin -D
```

## 用法

- vue.config.js

```js
const ImageDuplicatesWebpackPlugin = require('image-duplicates-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new ImageDuplicatesWebpackPlugin()]
  }
}
```
