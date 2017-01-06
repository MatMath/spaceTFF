// WHY? I cannot run Forever on node-static so I need to make it as a simple js app to run the other public file.
// To Run: forever serveStatic.js &

var static = require('node-static');

var file = new static.Server('./public');
const PORT = process.env.PORT || "8080";

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(PORT);
