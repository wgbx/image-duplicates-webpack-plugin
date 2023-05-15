const { writeFile, readdirSync, existsSync, statSync, readFileSync } = require('node:fs')
const { resolve, join, extname } = require('node:path')
const log = require('picocolors')
const crypto = require('node:crypto')

const defaultOptions = {
  imagePath: 'src',
  imageType: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'],
  isAbsolutePath: false
}

const errorTip = (title, text) => {
  console.log(`${log.bold(log.red(title))} ${text}`)
}

const getFileMap = (userOptions) => {
  const { imagePath, imageType, isAbsolutePath } = userOptions
  const assetPath = resolve(process.cwd())
  const absolutePath = resolve(process.cwd(), imagePath)
  const hashTable = new Map()

  const processFile = (filePath) => {
    if (statSync(filePath).isDirectory()) {
      readdirSync(filePath).forEach(filename => {
        processFile(join(filePath, filename))
      })
    } else if (imageType.includes(extname(filePath).toLowerCase())) {
      const fileData = readFileSync(filePath)
      const hash = crypto.createHash('md5').update(fileData).digest('hex')
      let fileRelativePath = filePath.replaceAll('\\', '/')
      if (!isAbsolutePath) {
        fileRelativePath = filePath.replace(assetPath, '').replaceAll('\\', '/')
      }
      if (hashTable.has(hash)) {
        hashTable.set(hash, [...hashTable.get(hash), fileRelativePath])
      } else {
        hashTable.set(hash, [fileRelativePath])
      }
    }
  }

  if (!existsSync(absolutePath)) {
    errorTip('文件夹不存在:', absolutePath)
    process.exit(0)
  }
  readdirSync(absolutePath).forEach(filename => {
    const filePath = join(absolutePath, filename)
    processFile(filePath)
  })
  return hashTable
}

const setFile = (data) => {
  writeFile('./image-duplicates.json', JSON.stringify(data), (err) => {
    if (err) {
      log.red('image-duplicates.json 文件写入失败')
    }
  })
}

class ImageDuplicatesWebpackPlugin {
  options;
  constructor(options) {
    this.options = options;
  }
  apply() {
    const userOptions = { ...defaultOptions, ...this.options }
    const dataMap = getFileMap(userOptions)
    const sameFile = []
    dataMap.forEach((item) => {
      if (item.length > 1) sameFile.push({ '相同图片': item })
    })
    setFile(sameFile)
  }
}

module.exports = ImageDuplicatesWebpackPlugin;