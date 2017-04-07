module.exports = (values, fileKey) => {
    var host, protocol, temp
    [temp, protocol, host] = /^(https?:\/\/)(.*)(\/.*)$/.exec(values.urls.secondary)
    var response = {
        passkey: fileKey,
        port: {
            internal: values.ports.file.internal,
            http: values.ports.file.http,
            https: values.ports.file.https ? values.ports.file.https : values.ports.file.http + 5
        },
        https: {
            enable: values.tls.enable
        },
        url: protocol + host,
        storagePath: values.fileStorage
    }
    /** https section */
    if (values.tls.enable) {
        response.https.keyPath = values.tls.key
        response.https.certPath = values.tls.cert
    }
    return responce
}