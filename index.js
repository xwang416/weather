// content of index.js
var weatherMap = require('./weatherMap.js');
var http = require('http');
var port = 9000;

var requestHandler = (request, response) => {  
    var url = request.url;
    var arr = url.split('/');
    var cities = arr[arr.length-1].split('%7C');
    
    cities.forEach(function(city){

        weatherMap.getWeather(city);

    });
  
    response.end('Results are shown in console.');
};

var server = http.createServer(requestHandler);

server.listen(port, (err) => {  
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});