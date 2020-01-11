const app = require("./server");
const chalk = require("chalk");
const os = require("os");
const dns = require("dns");
const defaultOptions = require("./options");
const createTusd = require("./tusd");

const info = chalk.blueBright;

module.exports = function(serverOptions) {
    serverOptions = {...defaultOptions, ...serverOptions};

    let reasons = [];

    if(serverOptions.upload) {
        reasons.push("upload");
        const tusd = createTusd(serverOptions);
    }

    if(serverOptions.download) {
        reasons.push("download");
        // no download for now
    }

    app.get("/", (req, res) => {
        dns.lookup(os.hostname(), (err, address) => {
            res.render("index", {
                HOST: address,
                USE: reasons
            });
        });
    });

    return {
        start: (port = serverOptions.port, host = serverOptions.host, cb) => {
            cb = cb || function() {
                console.success(`Server started at ${info(serverOptions.host)}:${info(serverOptions.port)}.`);
            }

            if(serverOptions.verbose)
            {
                let reason = "";
                if(reasons.length != -1)
                    reason = `both ${info("download")} and ${info("upload")}`;
                else
                    reason = info(reasons[0]);
                
                dns.lookup(os.hostname(), (err, adr) => {
                    console.verbose(`Local IP: ${info(adr)}`);
                });
                console.verbose(`Starting server for ${reason}...\n`);
            }
            app.listen(port, host, cb);
        }
    };
}