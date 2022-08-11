const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const axios = require("axios");
const _ = require("lodash");

const app = express();

app.use(express.json());

app.get("/getWeather/:city", async (req, res) => {
    const city = req.params.city;
    console.log("Hello", city);
    const cityDetails = await getWeather(city);
    console.log(cityDetails.data);
    res.send(cityDetails.data);
})

app.post("/getWeatherForMultiCity", async (req, res) => {
    const reqBody = req.body;
    const cities = reqBody.cities;
    const allCityPromises = _.map(cities, async (city) => {
        return await getWeather(city);
    })
    Promise.all(allCityPromises).then(result => {
        const cityMap = _.keyBy(_.map(result, 'data'), 'name');
        res.send(cityMap);
    })
})

app.listen(PORT, (data) => {
    console.log(`Server Started at ${PORT}`);
})

function getWeather(city) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67b917b39574880732880a917e7eee43`);
}