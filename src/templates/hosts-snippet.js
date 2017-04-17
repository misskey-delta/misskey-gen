var url = require('url');

module.exports = (values, subdomains) => {
    var snippet = "# add this to hosts file\n127.0.0.1\t"
    var primaryUrl = url.parse(values.urls.primary)
    var secondaryUrl = url.parse(values.urls.secondary)
    var primaryHostname = primaryUrl.hostname
    snippet += primaryHostname + " " + secondaryUrl.hostname
    Object.keys(subdomains).forEach(category => {
        Object.keys(subdomains[category]).forEach(subdomain => {
            snippet += ` ${subdomains[category][subdomain]}.${primaryHostname}`
        })
    })
    return snippet
}
