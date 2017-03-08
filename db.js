var MongoClient = require('mongodb').MongoClient;

module.exports = {
    
    insertCityWeather: function(json){
        
        //connection URL, db-weather
        var url = 'mongodb://localhost:27017/weather';

        //connect to the server
        MongoClient.connect(url, function(err, db) {

            console.log("Connected successfully to server");

            insertRecord(db, function() {
                db.close();
            });

        });
        
        var insertRecord = function(db, json) {

          //get the cityWeather collection, if none, create it
          var collection = db.collection('cityWeather');

          //insert one cityWeather record
          collection.insertOne(json);
        };
    }
        
    
};
