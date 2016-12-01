"use strict";

const spawno = require("spawno")
    , oargv = require("oargv")
    , parse = require("parse-git-status")
    ;

/**
 * gitStatus
 * A git-status wrapper.
 *
 * [`parse-git-status`](https://github.com/jamestalmage/parse-git-status) is used to parse the output.
 *
 * @name gitStatus
 * @function
 * @param {Object} options The `spawno` options.
 * @param {Function} cb The callback function.
 */
function gitStatus (options, cb) {
    if (typeof options === "function") {
        cb = options;
        options = {};
    }

    spawno("git", ["status", "--porcelain", "-z"], options, (err, stdout, stderr) => {
        if (err || stderr) { return cb(err || stderr, stdout); }
        cb(null, parse(stdout));
    });
}

/**
 * Ignores LF to CRLF warnings and gives parsed status info
 * @param cb {Function}
 */
gitStatus.parseWithLineEndingWarnings = function (cb) {
    return function (err, result) {
        let showStderr = err;
        if (err && typeof err === 'string') {
            const stderrLines = err.trim().split(/\n/);
            const warningsAfterFilter = stderrLines.filter(line => {
                return (line !== 'The file will have its original line endings in your working directory.' &&
                !line.startsWith('warning: LF will be replaced by CRLF in'));
            });
            showStderr = warningsAfterFilter.length;
            err = new Error(err);
            result = parse(result);
        }
        if (showStderr) { return cb(err); }
        cb(null, result);
    }
};

module.exports = gitStatus;
