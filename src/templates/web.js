var random = require("../tools/random")

module.exports = (values, apiKey) => {
    var temp, host, protocol, port
    [temp, protocol, host, temp, port] = /^(https?:\/\/)([^:\/]+)(:(\d+))?/.exec(values.urls.primary)
    // cast port to number
    var portNum = port ? Number.parseInt(port) : null
    var domainFromHost = (host) => {
        var temp, domain
        [temp, domain] = /^([^\.]+)/.exec(host)
        return domain
    }
    var genHost = (prefix) => prefix ? `${prefix}.${host}` : host
    var genUrl = (prefix,
        port = portNum,
        isWebStandardPort = true,
        webStandardPort = values.tls.enable
            ? values.ports.web.https
            : values.ports.web.http) => {
        const tmp = `${protocol}${genHost(prefix)}`
        // return early with not defined port
        if (! port) return tmp
        // cut protocols default patturn
        switch (protocol) {
            case "http:":
                if (port === 80) return tmp
                break
            case "https:":
                if (port === 443) return tmp
        }
        // prior port than webStandardPort, when webStandardPort enabled or port isn't equal to webStandardPort.
        if (! webStandardPort || port !== webStandardPort) return `${tmp}:${port}` 
        // join webStandardPort...
        return `${tmp}:${webStandardPort}`
    }

    /** base */
    var response = {
        mongo: {
            uri: "mongodb://" + values.mongo.host + "/misskey-web"
        },
        redis: {
            host: values.redis.host
        },
        port: {
            http: values.ports.web.http,
            streaming: values.ports.web.streaming
        },
        https: {
            enable: values.tls.enable
        },
        apiPasskey: apiKey,
        apiServerIp: "127.0.0.1",
        apiServerPort: values.ports.api,
        cookiePass: random(),
        sessionKey: "hmsk",
        sessionSecret: random(),
        googleRecaptchaSecret: values.recaptcha.secret,
        publicConfig: {
            themeColor: values.themeColor,
            domain: domainFromHost(host),
            host: host,
            url: genUrl(null),
            adminDomain: "admin",
            adminUrl: genUrl("admin"),
            authorizeDomain: "auth",
            authorizeUrl: genUrl("auth"),
            registerDomain: "signup",
            registerUrl: genUrl("signup"),            
            signinDomain: "login", 
            sigininUrl: genUrl("login"),          
            signoutDomain: "logout",
            signoutUrl: genUrl("logout"),
            resourcesDomain: "resources",
            resourcesHost: genHost("resources"),
            resourcesUrl: genUrl("resources"),
            shieldDomain: "shield",
            shieldUrl: genUrl("shield"),            
            aboutDomain: "about",
            aboutUrl: genUrl("about"),           
            searchDomain: "search",
            searchUrl: genUrl("search"),
            helpDomain: "help",
            helpUrl: genUrl("help"),            
            talkDomain: "talk",
            talkUrl: genUrl("talk"),
            forumDomain: "forum",
            forumUrl: genUrl("forum"),
            apiHost: genHost("api"),
            apiUrl: genUrl("api", values.ports.api, false),
            webApiDomain: "himasaku",
            webApiHost: genHost("himasaku"),
            webApiUrl: genUrl("himasaku"),
            webStreamingUrl: genUrl("streaming", values.ports.web.streaming, false),
            developerCenterHost: genHost("dev"),
            developerCenterUrl: genUrl("dev"),
            colorDomain: "color",
            colorUrl: genUrl("color"),
            shareDomain: "share",
            shareUrl: genUrl("share"),
            widgetsDomain: "widgets",
            widgetsUrl: genUrl("widgets"),
            googleRecaptchaSiteKey: values.recaptcha.site,
        }
    }
    /** mongo section */
    if (values.mongo.auth) {
        response.mongo.options = {
            user: values.mongo.authUser,
            password: values.mongo.authPassword
        }
    }
    /** redis section */
    if (values.redis.auth) {
        response.redis.password = values.redis.authPassword
    }
    /** https section */
    if (values.tls.enable) {
        response.https.keyPath = values.tls.key
        response.https.certPath = values.tls.cert
        response.port.https = values.ports.web.https
    }

    return response
}
