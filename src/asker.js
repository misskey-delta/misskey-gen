module.exports = () => {
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
    values.urls.primary = await question.input("what is primary URL for api & web servers? (ex. https://misskey.cf/)", isValidURL)
    values.urls.secondary = await question.input("what is secondary url for file server? (ex. https://uc-misskey.cf/)", isValidURL)
    /** tls section */
    values.tls.enable = await question.confirm("do you want to use Node.js providing TLS?")
    if (values.tls.enable) {
        values.tls.key = await question.input("where is TLS key file?")
        values.tls.cert = await question.input("where is TLS cert file?")
    }
    /** mongoDB section */
    values.mongo.host = await question.input("what is MongoDB server hostname? (ex. localhost)")
    values.mongo.auth = await question.confirm("do you want to use MongoDB authentication?")
    if (values.mongo.auth) {
        values.mongo.authUser = await question.confirm("what is MongoDB's username?")
        values.mongo.authPassword = await question.confirm("what is MongoDB's password?")
    }
    /** redis section */
    values.redis.host = await question.input("what is Redis server hostname? (ex. localhost)")
    values.redis.auth = await question.confirm("do you want to use Redis authentication?")
    if (values.redis.auth) values.redis.authPassword = await question.confirm("what is Redis's password?")
    /** port section */
    values.ports.api = await question.inputNumber("what is http port to run misskey-api?")
    values.ports.web.http = await question.inputNumber("what is http port to run misskey-web?")
    if (values.tls.enable) values.ports.web.https = await question.inputNumber("what is https port to run misskey-web?")
    values.ports.web.streaming = await question.inputNumber("what is streaming port to run misskey-web?")
    values.ports.file.http = await question.inputNumber("what is http port to run misskey-file?")
    if (values.tls.enable) values.ports.file.https = await question.inputNumber("what is https port to run misskey-file?")
    /** recaptcha section */
    values.recaptcha.site = await question.input("please input recaptcha site key.")
    values.recaptcha.secret = await question.input("please input recaptcha secret key.")
    /** theme color */
    values.themeColor = await question.input("what color do you want use in misskey? (ex. #666666)")
    return values
}