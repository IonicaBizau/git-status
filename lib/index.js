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
module.exports = function gitStatus (options, cb) {

    if (typeof options === "function") {
        cb = options;
        options = {};
    }

    spawno("git", ["status", "--porcelain", "-z"], options, (err, stdout, stderr) => {
        if (err || stderr) { return cb(err || stderr); }
        cb(null, parse(stdout));
    });
};
