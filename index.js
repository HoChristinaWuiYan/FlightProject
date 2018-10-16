const http = require("http");
const fs = require("fs");
const getJSON = require("get-json");
const request = require("request");
const googlemaps = require("googlemaps");

const hostname = "127.0.0.1";
const port = 3001;

fs.readFile("main.html", (err, html) => {
    if(err){
        throw err;
    }
        
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader ("Content-type", "text/html");
        res.write(html);
        res.end();
});

server.listen(port, hostname, () => {
    console.log("Server started on port " + port);
});

});
