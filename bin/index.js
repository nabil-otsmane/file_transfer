#!/usr/bin/env node
const createServer = require("../lib");
const { port, host, uploadDir } = require("../lib/options");

// add style to the console
require("./console");

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
            default: uploadDir,
            type: "string"
        })
    }, argv => {
        server = createServer({
            uploadDir: argv.uploadDir,
            download: true,
            upload: true,
            sharedPath: argv.sharedPath,
            port: argv.port,
            verbose: argv.verbose,
            host: argv.host
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
            port: argv.port,
            verbose: argv.verbose,
            host: argv.host
        });
    })
    .command("upload [uploadDir]", "start web server for upload from the user", (yargs) => {
        yargs.positional("uploadDir", {
            describe: 'directory for uploaded files',
            default: uploadDir,
            type: "string"
        })
    }, argv => {
        server = createServer({
            uploadDir: argv.uploadDir,
            download: false,
            upload: true,
            port: argv.port,
            verbose: argv.verbose,
            host: argv.host
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
        default: port,
        description: "web server port"
    })
    .option("host", {
        alias: 'H',
        type: "string",
        default: host,
        description: "web server host"
    })
    .global(["help", "port", "verbose"])
    .option("verbose", {
        alias: 'v',
        type: "boolean",
        description: "Run with verbose logging"
    }).argv;

server.start();
