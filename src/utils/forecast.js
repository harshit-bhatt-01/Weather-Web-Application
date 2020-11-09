var request = require("request")
require("dotenv").config()

var forecast = (lat, lon, callback) => {

    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=" + process.env.weatherKey

        request({url, json: true}, (error, {body} = {}) => {
            if(error) {
                callback("Can't connect to Weather API.", undefined)
            } else if(body.cod == 400) {
                callback("Unable to find weather forecast.", undefined)
            } else {
                callback(undefined, {
                    temp: parseInt(body.main.temp) - 273,
                    pressure: body.main.pressure,
                    humidity: body.main.humidity,
                    windSpeed: body.wind.speed
                })
            }
        }) 
}

module.exports = forecast