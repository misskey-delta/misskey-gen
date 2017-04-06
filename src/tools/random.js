var crypto = require('crypto')

/**
 * create radom string.
 *
 * http://qiita.com/sifue/items/06032a373a1168e5b6e0
 */
module.exports = () => crypto.randomBytes(15).toString('hex')