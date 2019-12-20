var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

http.createServer(function(req, res) {
    if(req.url === '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var oldPath = files.fileToUpload.path;
            var newPath = __dirname + '/uploads/' + files.fileToUpload.name;
            fs.createReadStream(oldPath).pipe(fs.createWriteStream(newPath));
            fs.unlink(oldPath, function(err) {
                if(err) throw err;
            });
            res.write('File Uploaded');
            res.end();
            
        });
    } else {
        res.writeHead(200, { 'Content-Type' : "text/html" });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
}).listen(8000, function(err){
	if(!err)console.log("server started at port 8000.");
});