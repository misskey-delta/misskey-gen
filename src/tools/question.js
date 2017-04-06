/* require modules */
var readline = require('readline')

/**
 * question prover: input
 *
 * @param query {string} question sentence
 * @param callback {function} function to test inputted value, taking an argument of inputted value. (option)
 * @param reInputNotifier {string} re-input error sentence (option)
 * @returns {string} inputted value that passed callback.
 */
var question = async (query, callback, reInputNotifier = "not a valid input value") => {
    /* interface.question promise wrapper */
    var q = (query, noReturn = false, retryTimes) => new Promise((resolve, reject) => {
        var union = ""
        if (retryTimes) {
            console.log(`${query} (retry ${retryTimes} times)`)
        } else {
            console.log(query)
        }
        process.stdout.write("  > ")

        if (process.stdin.isTTY) process.stdin.setRawMode(true)
        readline.emitKeypressEvents(process.stdin)
    
        // handler for process.stdin event named 'keypress'
        var stdinHandler = (ch, key) => {
            var handler = (input) => {
                process.stdin.removeListener("keypress", stdinHandler)
                if (process.stdin.isTTY) process.stdin.setRawMode(false)
                // clear previous line
                readline.cursorTo(process.stdout, 0)
                // noReturn time, remove input in this line
                if (noReturn) readline.clearLine(process.stdout, 1)
                readline.moveCursor(process.stdout, 0, -1)
                readline.clearLine(process.stdout, 1)
                resolve(input)
            }

            if (key.ctrl === true & key.name === "c") {
                process.exit()
            }
            // magic with noReturn
            else if (key.name === "return") {
                if (! noReturn) process.stdout.write("\n")
                handler(union)
            }
            // OH LEGACY!!!
            else if (key.name === key.sequence.toLowerCase() || key.name === undefined || key.name === "space") {
                union += key.sequence
                process.stdout.write(key.sequence)
            } else if (key.name === "backspace") {
                readline.moveCursor(process.stdout, -1)
                readline.clearLine(process.stdout, 1)
                union = union.substr(-1)
            }
        }

        process.stdin.on("keypress", stdinHandler)
    })

    var result = await q(`[?] ${query}`)

    /* if callback exists, check with it! */
    if (callback && typeof callback === "function") {
        var fuck = 0
        while (! callback(result) === true) {
            result = await q(`[!] ${reInputNotifier}, please re-input...`, true, fuck)
            fuck++
        }
    }

    return result
}
exports.input = question

/**
 * question prover: confirm
 *
 * @param query {string} question sentence
 * @returns {boolean}
 */
exports.confirm = async (query) => {
    var result = await question(`${query} (y/n)`, (answer) => /^y|n$/.test(answer), "not y/n")
    return "y" === result
}

/**
 * question provider: inputNumber
 *
 * @param query {string} question sentence
 * @returns {number}
 */
exports.inputNumber = async (query) => {
    var result = await question(`${query} (number)`, (answer) => /^\d+$/.test(answer), "not a valid input number")
    return Number.parseInt(result)
}
