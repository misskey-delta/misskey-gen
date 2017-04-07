module.exports = (values, fileKey) => {
    var host, protocol, temp
    [temp, protocol, host] = /^(https?:\/\/)(.*)$/.exec(values.urls.secondary)
    // split magic (remove end slash)
    host = host.split("/")[0]
    var response = {
        passkey: fileKey,
        port: {
            internal: values.ports.file.internal,
            http: values.ports.file.http
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
        responce.port.https = values.ports.file.https
    }
    return response
}