const http = require('http');
//const db = require('./db.js');

module.exports = {

    getWeather: function(city, serverRes) {

        var result;

        var options = {
            host: 'api.openweathermap.org',
            port: '80',
            path: '/data/2.5/weather?q=' + city + '&APPID=8b4cfba64690a44aa14a0504e21d7129',
            method: 'GET'
        };

        http.request(options, function(res) {

            var body = '';
            const absZero = 273.15;

            res.setEncoding('utf8');
            res.on('error', function(err) {
                    console.log('There is an error', err);
                })
                .on('data', function(data) {
                    body += data;
                })
                .on('end', function() {
                    result = JSON.parse(body);

                    var json = {
                        city: city,
                        statusCode: res.statusCode,
                        temp: Math.ceil(result.main.temp - absZero)
                    }

                    console.log('\n' + json.city);
                    console.log('http status: ' + json.statusCode)
                    console.log('current temp: ' + json.temp + 'C\n------------------\n');

                    //db.insertCityWeather(json);
                    serverRes.end(JSON.stringify(json));

                });


        }).end();

        //setTimeout(function() { console.log(result); }, 500);
    }
};