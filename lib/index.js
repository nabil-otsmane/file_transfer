var server = require("./server");
var defaultOptions = require("./options");


module.exports = function(serverOptions = defaultOptions) {
    if(serverOptions.upload) {
        const tus = require('tus-node-server');
        const uploadApp = require("express")();

        const tusServer = new tus.Server();
        tusServer.datastore = new tus.FileStore({
            path: serverOptions.uploadDir
        });

        // adding upload route
        uploadApp.use("*", server.handle.bind(tusServer));
        server.use('/upload', uploadApp);

        // don't forget to change the client template accordingly
    }

    if(serverOptions.download) {
        // no download for now
    }

    return server;
}