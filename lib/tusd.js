const { spawn } = require("child_process");
const path = require("path");

module.exports = function(options) {
    
        // set tuds command with all options
        const sep = path.sep;
        // getting absolute path of the tusd binary
        const p = path.normalize(__dirname + sep + ".." + sep +"binaries"+ sep +"tusd.exe");

        let tusd = spawn(p, [
            "-base-path", "/upload/", 
            "-max-size", options.maxSize,
            "-host", options.host,
            "-port", options.tusdPort,
            "-upload-dir", options.uploadDir
        ]);

        tusd.stdout.on("data", (data) => {
            if(options.verbose){
                let d = data.toString().split("\n");
                d.map(a => {
                    console.verbose(a);
                });
            }
        });

        tusd.stderr.on("data", (data) => {
            let d = data.toString().split("\n");
            d.map(a => {
                console.err(a);
            });
        })

        tusd.on("error", (err) => {
            console.err(err.message);
        });
        tusd.on("close", (code) => {
            if(options.verbose)
                console.verbose("process exited with code " + code);
        });

        return tusd;
}