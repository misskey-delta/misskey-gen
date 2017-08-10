var question = require("./tools/question")

module.exports = async () => {
    var isValidURL = (value) => {
        const regExp = /^(http)|(https):.+\/?$/
        return regExp.test(value)
    }
    var values = {
        urls: {},
        tls: {},
        mongo: {},
        redis: {},
        ports: {
            web: {},
            file: {}
        },
        recaptcha: {}
    }
    /** url section */
    values.urls.primary =
        process.env.MISSKEY_GEN_URLS_PRIMARY ||
        await question.input("what is primary URL for api & web servers? (ex. https://misskey.cf/)", isValidURL)
    values.urls.secondary =
        process.env.MISSKEY_GEN_URLS_SECONDARY ||
        await question.input("what is secondary url for file server? (ex. https://uc-misskey.cf/)", isValidURL)
    /** tls section */
    values.tls.enable =
        process.env.MISSKEY_GEN_TLS_ENABLE
        ? Boolean(process.env.MISSKEY_GEN_TLS_ENABLE)
        : await question.confirm("do you want to use Node.js providing TLS?")
    if (values.tls.enable) {
        values.tls.key =
            process.env.MISSKEY_GEN_TLS_KEY ||
            await question.input("where is TLS key file?")
        values.tls.cert =
            process.env.MISSKEY_GEN_TLS_CERT ||
            await question.input("where is TLS cert file?")
    }
    /** mongoDB section */
    values.mongo.host =
        process.env.MISSKEY_GEN_MONGO_HOST
        ? Boolean(process.env.MISSKEY_GEN_MONGO_HOST)
        : await question.input("what is MongoDB server hostname? (ex. localhost)")
    values.mongo.auth =
        process.env.MISSKEY_GEN_MONGO_AUTH
        ? Boolean(process.env.MISSKEY_GEN_MONGO_AUTH)
        : await question.confirm("do you want to use MongoDB authentication?")
    if (values.mongo.auth) {
        values.mongo.authUser =
            process.env.MISSKEY_GEN_MONGO_USER
            ? Boolean(process.env.MISSKEY_GEN_MONGO_USER)
            : await question.confirm("what is MongoDB's username?")
        values.mongo.authPassword =
            process.env.MISSKEY_GEN_MONGO_PASSWORD ||
            await question.input("what is MongoDB's password?")
    }
    /** redis section */
    values.redis.host =
        process.env.MISSKEY_GEN_REDIS_HOST ||
        await question.input("what is Redis server hostname? (ex. localhost)")
    values.redis.auth =
        process.env.MISSKEY_GEN_REDIS_AUTH
        ? Boolean(process.env.MISSKEY_GEN_REDIS_AUTH)
        : await question.confirm("do you want to use Redis authentication?")
    if (values.redis.auth) {
        values.redis.authPassword =
            process.env.MISSKEY_GEN_REDIS_PASSWORD ||
            await question.input("what is Redis's password?")
    }
    /** port section */
    values.ports.api =
        process.env.MISSKEY_GEN_PORTS_API
        ? Number.parseInt(process.env.MISSKEY_GEN_PORTS_API)
        : await question.inputNumber("what is http port to run misskey-api?")
    values.ports.web.http =
        process.env.MISSKEY_GEN_PORTS_WEB_HTTP
        ? Number.parseInt(process.env.MISSKEY_GEN_PORTS_WEB_HTTP)
        : await question.inputNumber("what is http port to run misskey-web?")
    if (values.tls.enable) {
        values.ports.web.https =
            process.env.MISSKEY_GEN_PORTS_WEB_HTTPS
            ? Number.parseInt(process.env.MISSKEY_GEN_PORTS_WEB_HTTPS)
            : await question.inputNumber("what is https port to run misskey-web?")
    }
    values.ports.file.internal =
        process.env.MISSKEY_GEN_PORTS_FILE_INTERNAL
        ? Number.parseInt(process.env.MISSKEY_GEN_PORTS_FILE_INTERNAL)
        : await question.inputNumber("what is internal http port to run misskey-file?")
    values.ports.file.http =
        process.env.MISSKEY_GEN_PORTS_FILE_HTTP
        ? Number.parseInt(process.env.MISSKEY_GEN_PORTS_FILE_HTTP)
        : await question.inputNumber("what is http port to run misskey-file?")
    if (values.tls.enable) {
        values.ports.file.https =
            process.env.MISSKEY_GEN_PORTS_FILE_HTTPS
            ? Number.parseInt(process.env.MISSKEY_GEN_PORTS_FILE_HTTPS)
            : await question.inputNumber("what is https port to run misskey-file?")
    }
    /** recaptcha section */
    values.recaptcha.site =
        process.env.MISSKEY_GEN_RECAPTCHA_SITE ||
        await question.input("please input recaptcha site key.")
    values.recaptcha.secret =
        process.env.MISSKEY_GEN_RECAPTCHA_SECRET ||
        await question.input("please input recaptcha secret key.")
    /** theme color */
    values.themeColor =
        process.env.MISSKEY_GEN_THEME_COLOR ||
        await question.input("what color do you want use in misskey? (ex. #666666)")
    /** file storage */
    values.fileStorage =
        process.env.MISSKEY_GEN_FILE_STORAGE_PATH ||
        await question.input("please input path for misskey-file storage.")
    return values
}