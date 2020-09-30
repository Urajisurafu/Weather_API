class Weather {

    constructor() {
        this.key = 'e195020009cbe2ac3402f91866610c25';
        this.url = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeatherByName(city) {
        const url = `${this.url}?q=${city}&appid=${this.key}`;
        return await this.getWeather(url);
    }

    async getWeatherById(cityId) {
        const url = `${this.url}?id=${cityId}&appid=${this.key}`;
        return await this.getWeather(url);
    }

    async getWeather(url) {
        const fetch = require("node-fetch");
        const response = await fetch(url);

        if (response.ok) {
            return await response.json();
        }
        return {};
    }
}

class WeatherInMyCity extends Weather {

    constructor() {
        super();
        this.name = 'Minsk';
        this.id = 625144;
    }

    async getWeatherByName() {
        return await super.getWeatherByName(this.name);
    }

    async getWeatherById() {
        return await super.getWeatherById(this.id);
    }
}

class RandomWeather extends Weather {

    constructor() {
        super();
        this.cities = [
            {id: 620127,name: 'Vitebsk'},
            {id: 2643743,name: 'London'},
            {id: 1220988,name: 'Moskva'},
            {id: 2890943,name: 'Kieve'}
        ];
    }

    addCity(id, name) {
        this.cities.push({
            id,
            name
        });
    }

    async getWeatherByName() {
        const position = this.randomPosition();
        const {name} = this.cities[position];
        return await super.getWeatherByName(name);
    }

    async getWeatherById() {
        const position = this.randomPosition();
        const {id} = this.cities[position];
        return await super.getWeatherById(id);
    }

    randomPosition() {
        return Math.floor(Math.random() * this.cities.length);
    }
}
