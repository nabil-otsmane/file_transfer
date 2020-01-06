#!/usr/bin/env node
const { default_port } = require("../lib/config");
const chalk = require("chalk");

const error = chalk.red;
const info = chalk.blueBright;
const success = chalk.green;
const def = chalk.gray;

let path;

const argv = require("yargs")
    .command(["$0 [path] [dir]", "both [path] [dir]"], 'start web server', (yargs) => {
        yargs.positional("path", {
            describe: 'path to file/folder to share',
            type: "string",
            default: "."
        });
        yargs.positional("dir", {
            describe: 'dir for uploaded files',
            default: ".",
            type: "string"
        })
    })
    .command("download [path]", "start web server for user download", (yargs) => {
        yargs.positional("path", {
            describe: 'path to file/folder to share',
            type: "string",
            default: "."
        });
    })
    .command("upload [dir]", "start web server for upload from the user", (yargs) => {
        yargs.positional("dir", {
            describe: 'dir for uploaded files',
            default: ".",
            type: "string"
        })
    })
    .option('h', {
        alias: "help",
        description: "display help message"
    })
    .help("help")
    .option("port", {
        alias: 'p',
        type: "number",
        default: default_port,
        description: "web server port"
    })
    .global(["help", "port", "verbose"])
    .option("verbose", {
        alias: 'v',
        type: "boolean",
        description: "Run with verbose logging"
    }).argv;

if(argv.verbose)
    console.info(`starting server on port: ${info(argv.port)} and path: ${info(argv.path)}`);

console.log(argv);