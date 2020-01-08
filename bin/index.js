#!/usr/bin/env node
const chalk = require("chalk");
const fs = require("fs");
const createServer = require("../lib");
const { default_port, default_host } = require("../lib/config");

const error = chalk.red;
const info = chalk.blueBright;
const success = chalk.green;
const def = chalk.gray;

let server;

const argv = require("yargs")
    .command(["$0 [sharedPath] [uploadDir]", "both [sharedPath] [uploadDir]"], 'start web server', (yargs) => {
        yargs.positional("sharedPath", {
            describe: 'path to file/folder to share',
            type: "string",
            default: "."
        });
        yargs.positional("uploadDir", {
            describe: 'dir for uploaded files',
            default: "./uploads",
            type: "string"
        })
    }, argv => {
        server = createServer({
            uploadDir: argv.uploadDir,
            download: true,
            upload: true,
            sharedPath: argv.sharedPath,
        });
    })
    .command("download [sharedPath]", "start web server for user download", (yargs) => {
        yargs.positional("sharedPath", {
            describe: 'path to file/folder to share',
            type: "string",
            default: "."
        });
    }, argv => {
        server = createServer({
            download: true,
            upload: false,
            sharedPath: argv.sharedPath,
        });
    })
    .command("upload [uploadDir]", "start web server for upload from the user", (yargs) => {
        yargs.positional("uploadDir", {
            describe: 'directory for uploaded files',
            default: "./uploads",
            type: "string"
        })
    }, argv => {
        server = createServer({
            uploadDir: argv.uploadDir,
            download: false,
            upload: true,
        });
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
{
    let reason = "";
    if(argv._.length == 0 || argv._.indexOf("both") != -1)
        reason = `both ${success("download")} and ${success("upload")}`;
    else
        reason = success(argv._[0]);
    console.info(`starting server for ${reason}.\n`);
}

server.listen(argv.port, default_host, () => {
    console.log(`Server ${success("started")} at ${info(default_host)}:${info(argv.port)}`)
});
