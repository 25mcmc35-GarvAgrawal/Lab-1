var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_KEY } from "./config.js";
const weatherReport = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (city.trim().length == 0) {
            return {
                type: "app-error",
                message: "City cannot be empty",
            };
        }
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = yield response.json();
        if (!response.ok) {
            return {
                type: "api-error",
                cod: data.cod,
                message: data.message,
            };
        }
        return {
            type: "success",
            coord: data.coord,
            weather: data.weather,
            main: data.main,
            visibility: data.visibility,
        };
    }
    catch (error) {
        return {
            type: "app-error",
            message: "Failed to fetch weather data",
        };
    }
});
const formatTemp = (k) => `${(k - 273.15).toFixed(2)}°C`;
const getWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (!display) {
        return;
    }
    if (!button) {
        return;
    }
    button.disabled = true;
    display.innerHTML = "Loading...";
    const result = yield weatherReport(city);
    if (result.type == "success") {
        display.innerHTML = `
        <p>Temperature: ${formatTemp(result.main.temp)}</p>
        <p>Humidity: ${result.main.humidity}</p>
        <p>Weather : ${result.weather[0].description}</p>
        `;
    }
    else {
        display.innerHTML = result.message;
    }
    button.disabled = false;
});
const button = document.querySelector("#button");
const display = document.querySelector("#display");
const city = document.querySelector("#city");
if (button && city) {
    button.addEventListener("click", () => {
        getWeather(city.value);
    });
}
//# sourceMappingURL=index.js.map