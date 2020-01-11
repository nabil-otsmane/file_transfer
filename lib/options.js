const defaultOptions = {
    uploadDir: "./uploads",  // folder for storing uploads from users
    sharedPath: "./",
    download: true,          // is the user going to download from the server
    upload: true,            // is the user going to upload to the server
    maxSize: 10*1024*1024*1024,
    port: 8000,
    tusdPort: 1337,
    host: "0.0.0.0",
    verbose: false
}

module.exports = defaultOptions;