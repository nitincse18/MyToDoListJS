const spawn = require("child_process").spawn;
const path = require("path");

console.log(`Building for ${process.env.NODE_ENV}`)
spawn(path.resolve(__dirname, "node_modules/.bin/ng.cmd"), ["build", `--configuration=${process.env.NODE_ENV}`, '--aot'], {stdio: 'inherit'});