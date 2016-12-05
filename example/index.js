"use strict";

const gitStatus = require("../lib");

gitStatus((err, data) => {
    console.log('gitStatus\n', err || data);
    // => [ { x: ' ', y: 'M', to: 'example/index.js', from: null } ]
});

gitStatus(gitStatus.parseWithLineEndingWarnings((err, data) => {
    console.log('parseWithLineEndingWarnings\n', err || data);
    // => [ { x: ' ', y: 'M', to: 'example/index.js', from: null } ]
}));
