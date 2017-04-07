var random = require("../tools/random")

module.exports = (values, apiKey) => {
    var host, protocol, temp
    [temp, protocol, host] = /^(https?:\/\/)(.*)(\/.*)$/.exec(values.urls.primary)
    var domainFromHost = (host) => {
        var temp, domain
        [temp, domain] = /^(.*?)(\..*?)$/.exec(host)
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
        sessionKey: random(),
        sessionSecret: random(),
        googleRecaptchaSecret: values.recaptcha.secret,
        publicConfig: {
            themeColor: values.themeColor,
            domain: domainFromHost(host),
            host: host,
            url: protocol + host,
            adminUrl: protocol + "admin." + host,
            adminDomain: "admin",
            authorizeUrl: protocol + "auth." + host,
            authorizeDomain: "auth",
            registerUrl: protocol + "signup." + host,
            registerDomain: "signup",
            signinDomain: protocol + "login." + host,
            signinUrl: "login",
            signoutDomain: protocol + "logout." + host,
            signoutUrl: "logout",
            resourcesDomain: "resources",
            resourcesHost: "resources." + host,
            resourcesUrl: protocol + "resources." + host,
            shieldUrl: protocol + "shield." + host,
            shieldDomain: "shield",
            aboutUrl: protocol + "about." + host,
            aboutDomain: "about",
            searchDomain: "search",
            searchUrl: protocol + "search." + host,
            helpUrl: protocol + "help." + host,
            helpDomain: "help",
            talkDomain: "talk",
            talkUrl: protocol + "talk." + host,
            forumDomain: "forum",
            forumUrl: protocol + "forum." + host,
            apiHost: "api" + host,
            apiUrl: protocol + "api." + host,
            webApiDomain: "himasaku",
            webApiHost: "himasaku." + host,
            webApiUrl: protocol + "himasaku." + host,
            webStreamingUrl: protocol + "streaming." + host,
            developerCenterHost: "dev." + host,
            developerCenterUrl: protocol + "dev." + host,
            colorDomain: "color",
            colorUrl: protocol + "color." + host,
            shareDomain: "share",
            shareUrl: protocol + "share." + host,
            widgetsDomain: "widgets",
            widgetsUrl: protocol + "widgets." + host,
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
