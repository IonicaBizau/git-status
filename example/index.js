"use strict";

const gitStatus = require("../lib");

gitStatus((err, data) => {
    console.log(err || data);
});
