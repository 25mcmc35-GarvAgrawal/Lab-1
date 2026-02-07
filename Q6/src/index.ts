import { API_KEY } from "./config.js";

interface responseSuccess {
  type: "success";
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      description: string;
    },
  ];

  main: {
    temp: number;
    humidity: number;
  };
  visibility: number;
}

interface responseError {
  type: "api-error";
  cod: number;
  message: string;
}

interface app_error {
  type: "app-error";
  message: string;
}

type responseResult = responseSuccess | responseError | app_error;

const weatherReport = async (city: string): Promise<responseResult> => {
  try {
    if (city.trim().length == 0) {
      return {
        type: "app-error",
        message: "City cannot be empty",
      };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    );
    const data = await response.json();

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
  } catch (error) {
    return {
      type: "app-error",
      message: "Failed to fetch weather data",
    };
  }
};

const formatTemp = (k: number) =>
  `${(k - 273.15).toFixed(2)}°C`;

const getWeather = async (city: string) => {
  if (!display) {
    return;
  }

  if(!button){
    return ; 
  }

  button.disabled = true ; 

  display.innerHTML = "Loading...";

  const result = await weatherReport(city);

  if (result.type == "success") {
    display.innerHTML = `
        <p>Temperature: ${formatTemp(result.main.temp)}</p>
        <p>Humidity: ${result.main.humidity}</p>
        <p>Weather : ${result.weather[0].description}</p>
        `;
  } else {
    display.innerHTML = result.message;
  }

  button.disabled = false ; 
};

const button = document.querySelector<HTMLButtonElement>("#button");
const display = document.querySelector<HTMLDivElement>("#display");
const city = document.querySelector<HTMLInputElement>("#city");

if (button && city) {
    button.addEventListener("click", () => {
        getWeather(city.value);
    });
}
