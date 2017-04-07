/** modules */
var fs = require("fs")
var path = require("path")
/** tools */
var random = require("./tools/random")
/** templates */
var webTemplate = require("./templates/web")
var apiTemplate = require("./templates/api")
var fileTemplate = require("./templates/file")
/** parts */
var asker = require("./asker")

/**
 * shit main
 */
var main = async () => {
    /** source directory path */
    var current = path.dirname(__filename)
    var baseDir = path.join(current, "..")
    var storeDir = path.join(baseDir, "store")

    var values = await asker()
    var apiKey = random()
    var fileKey = random()
    var web = webTemplate(values, apiKey)
    var api = apiTemplate(values, apiKey, fileKey)
    var file = fileTemplate(values, fileKey)

    /** create store directory */
    try {
        fs.mkdirSync(storeDir)
    } catch (e) {
        if (e.code !== 'EEXIST') throw e
    }

    /** save */
    try {
        fs.writeFileSync(path.join(storeDir, "web.json"), JSON.stringify(web, null, 4))
        fs.writeFileSync(path.join(storeDir, "api.json"), JSON.stringify(api, null, 4))
        fs.writeFileSync(path.join(storeDir, "file.json"), JSON.stringify(file, null, 4))
    } catch (e) {
        console.dir(e)
    }
}

/* run main */
main().then(r => {
    process.exit()
}).catch(e => {
    console.dir(e)
    process.exit(1)
})