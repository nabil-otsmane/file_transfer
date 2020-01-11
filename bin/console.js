const chalk = require("chalk");

const error = chalk.red;
const info = chalk.blueBright;
const success = chalk.green;
const def = chalk.gray;

console.success = function() {
    console.log(`[${success("*")}] `, ...arguments);
}

console.verbose = function() {
    console.log(`[${info("#")}] `, def(...arguments));
}

console.err = function() {
    console.error(`[${error("!")}] `, ...arguments);
}