<h1 align="center">image-duplicates-webpack-plugin</h1>
<p align="center">Find whether there are duplicate images in the project</p>

[简体中文](./READM-ZH.md)

# Configuration Options

| **Configuration Option Name** | **Required** | **Meaning**           | **Default Value** | **Type**  |
| -------------- | ------------ | --------           | ---------- | --------  |
| `imagePath`    | No           | The image path to be searched | src        | `string`  |
| `imageType`    | No           | The image types to be searched | ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']|`Array<string>` |
| `outputResourcePathFormat`    | No           | The output resource path format | false      | `Boolean` |

## [Installation](https://www.npmjs.com/package/image-duplicates-webpack-plugin)

```bash
npm install image-duplicates-webpack-plugin -D
pnpm add image-duplicates-webpack-plugin -D
```

## Usage

- vue.config.js

```js
const ImageDuplicatesWebpackPlugin = require('image-duplicates-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new ImageDuplicatesWebpackPlugin()]
  }
}
```
