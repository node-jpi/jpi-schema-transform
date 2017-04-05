var browserify = require('browserify')
var b = browserify()
b.add(__dirname + '/main.js')
b.transform(require('..'))
b.bundle().pipe(process.stdout)

