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
/** check process in debug mode */
var debug = -1 !== process.argv.indexOf("--debug")
/** source directory path */
var srcDir = path.dirname(__filename)
var baseDir = path.join(srcDir, "..")
var storeDir = path.join(baseDir, "store")

/**
 * shit main
 */
var main = async () => {
    /** get nesessary values for generation */
    var values
    // if debug mode, try to read values from values.json
    if (debug) try {
        values = JSON.parse(fs.readFileSync(path.join(storeDir, "values.json")))
    } catch (e) {
        console.log(e)
    }
    if (! values) values = await asker()
    // if debug mode, output values object to console
    if (debug) console.log(JSON.stringify(values, null, 4))

    /** generate random keys */
    var apiKey = random()
    var fileKey = random()

    /** load subdomains json */
    var subdomains = JSON.parse(fs.readFileSync(path.join(srcDir, "spec/subdomains.json")))

    /** make values to various setting objects */
    var web = webTemplate(values, apiKey, subdomains.web)
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
        // if debug mode, save values object to values.json
        if (debug) fs.writeFileSync(path.join(storeDir, "values.json"), JSON.stringify(values, null, 4))
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