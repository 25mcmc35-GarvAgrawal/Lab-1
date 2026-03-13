import { useState } from "react"
import Search from "./Components/search";
import GetWeather from "./Components/GetWeather";

function App() {
  const [city , setCity] = useState("London") ;
  return (
    <>
    <Search setCity={setCity}></Search>
    <GetWeather city={city}></GetWeather>
    </>
  )
}

export default App
