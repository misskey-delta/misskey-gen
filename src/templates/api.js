module.exports = (values, apiKey, fileKey) => {
    var host, protocol, temp
    [temp, protocol, host] = /^(https?:\/\/)(.*)$/.exec(values.urls.secondary)
    // split magic (remove end slash)
    host = host.split("/")[0]
    var response = {
        mongo: {
            uri: "mongodb://" + values.mongo.host + "/misskey-api"
        },
        redis: {
            host: values.redis.host,
            port: 6379
        },
        fileServer: {
            passkey: fileKey,
            url: protocol + host,
            ip: "127.0.0.1",
            port: values.ports.file.internal
        },
        apiPasskey: apiKey,
        port: {
            http: values.ports.api
        },
        https: {
            enable: false
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
    return response
}