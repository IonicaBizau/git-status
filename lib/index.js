"use strict";

const spawno = require("spawno")
    , oargv = require("oargv")
    , parse = require("parse-git-status")
    ;

/**
 * gitStatus
 * A git-status wrapper.
 *
 * @name gitStatus
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
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
