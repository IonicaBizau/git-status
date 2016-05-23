"use strict";

const gitStatus = require("../lib");

gitStatus((err, data) => {
    console.log(err || data);
    // => [ { x: ' ', y: 'M', to: 'example/index.js', from: null } ]
});
