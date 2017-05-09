const Path = require('path')
const through = require('through2')
const deref = require('json-schema-deref-sync')

// module.exports = function (path) {
//   const resolved = Path.join(baseFolder, path)
//   const json = require(resolved)

//   const options = {
//     baseFolder: Path.dirname(resolved),
//     failOnMissing: true
//   }

//   const schema = deref(json, options)

//   if (schema instanceof Error) {
//     throw schema
//   }

//   return schema
// }

module.exports = function (file, options) {
  if (!/\.json$/i.test(file)) {
    return through()
  }

  const baseFolder = Path.dirname(file)

  return through(function (buf, enc, next) {
    const options = {
      failOnMissing: true,
      baseFolder: baseFolder
    }

    const schema = deref(JSON.parse(buf), options)

    this.push(JSON.stringify(schema, null, 2))
    next()
  })
}
