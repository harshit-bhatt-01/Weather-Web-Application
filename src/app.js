var path = require("path")
var express = require("express")
var app = express()
var hbs = require("hbs")
var request = require("request")
var geocode = require("./utils/geocode")
var forecast = require("./utils/forecast")

var port = process.env.PORT || 3000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Harshit Bhatt"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Always ready to help !!",
        name: "Harshit Bhatt"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Harshit Bhatt"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "No address provided to search"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                temp: forecastData.temp,
                forecast: "Wind speed= " + forecastData.windSpeed + 
                          " with Humidity= " + forecastData.humidity + 
                          "% and Pressure= " + forecastData.pressure
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404",
        errorMessage: "Help article not Found",
        name: "Harshit Bhatt"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        errorMessage: "Page not found",
        name: "Harshit Bhatt"
    })
})

app.listen(port, () => {
    console.log("Server ON !")
})
