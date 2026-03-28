import axios from "axios";
import React, { useEffect, useState } from "react";

const GetWeather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      try {
        setError(null) ; 
        setLoading(true);

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        );
        const data = res.data;

        const currentWeather = {
          city: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          wind: data.wind.speed,
        };
        setWeather(currentWeather);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);  

  if (Loading) return <p className="text-center font-bold ">Loading.....</p>;
  if (error) return <p className="text-center mt-6 text-red-500 font-bold">{error.message}</p>;

  return (
    <div className="mt-6 text-center border-2 border-gray-300 rounded-xl p-4 w-64 mx-auto shadow-md">
      <h2 className="text-2xl font-bold">{weather.city}</h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Weather: {weather.description}</p>
      <p>Wind Speed: {weather.wind} m/s</p>
    </div>
  );
};

export default GetWeather;
