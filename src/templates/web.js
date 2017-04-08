var random = require("../tools/random")

module.exports = (values, apiKey) => {
    var temp, host, protocol, httpPort
    [temp, protocol, host, httpPort] = /^(https?:\/\/)([^:]*?)(:.*)?\/?$/.exec(values.urls.primary)
    // split magic (remove end slash)
    host = host.split("/")[0]
    var domainFromHost = (host) => {
        var temp, domain
        [temp, domain] = /^(.*?)(\..*?)$/.exec(host)
        return domain
    }
    var subHost = (prefix) => `${prefix}.${host}`
    var subUrl = (prefix, port = values.ports.web.http) => {
        const tmp = `${protocol}${subHost(prefix)}`
        return port === 80 ? tmp : `${tmp}:${port}`
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
            url: protocol + host + (values.ports.web.http === 80 ? "" : `:${values.ports.web.http}`),
            adminDomain: "admin",
            adminUrl: subUrl("admin"),
            authorizeDomain: "auth",
            authorizeUrl: subUrl("auth"),
            registerDomain: "signup",
            registerUrl: subUrl("signup"),            
            signinDomain: "login", 
            sigininUrl: subUrl("login"),          
            signoutDomain: "logout",
            signoutUrl: subUrl("logout"),
            resourcesDomain: "resources",
            resourcesHost: subHost("resources"),
            resourcesUrl: subUrl("resources"),
            shieldDomain: "shield",
            shieldUrl: subUrl("shield"),            
            aboutDomain: "about",
            aboutUrl: subUrl("about"),           
            searchDomain: "search",
            searchUrl: subUrl("search"),
            helpDomain: "help",
            helpUrl: subUrl("help"),            
            talkDomain: "talk",
            talkUrl: subUrl("talk"),
            forumDomain: "forum",
            forumUrl: subUrl("forum"),
            apiHost: subHost("api", values.ports.api),
            apiUrl: subUrl("api", values.ports.api),
            webApiDomain: "himasaku",
            webApiHost: subHost("himasaku"),
            webApiUrl: subUrl("himasaku"),
            webStreamingUrl: subUrl("streaming", values.ports.web.streaming),
            developerCenterHost: subHost("dev"),
            developerCenterUrl: subUrl("dev"),
            colorDomain: "color",
            colorUrl: subUrl("color"),
            shareDomain: "share",
            shareUrl: subUrl("share"),
            widgetsDomain: "widgets",
            widgetsUrl: subUrl("widgets"),
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
