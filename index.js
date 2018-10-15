const http = require("http");
const fs = require("fs");
const getJSON = require("get-json");
const request = require("request");
const googlemaps = require("googlemaps");

const hostname = "127.0.0.1";
const port = 3000;

request('https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     const outputJSON = new Object();
     outputJSON.coordList = [];
     var importedJSON = JSON.parse(body);
     importedJSON.acList.forEach(function(aircraft){
  outputJSON.coordList.push([aircraft.Lat, aircraft.Long]);
    });
     
     var JSONdata = JSON.stringify(outputJSON);
     fs.writeFile("flightdata.json", JSONdata, function(err) {
    if (err) {
        console.log(err);
    }
}); 
  }
})



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
