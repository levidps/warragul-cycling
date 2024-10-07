import './App.css'
import Weather from "./components/weather/Weather.tsx";
import WeekCalendar from "./components/calendar/Calendar.tsx";
import { useWeatherData } from "./context/WeatherContext.tsx";
import { useEffect } from "react";

function App() {
    const { fetchWeather } = useWeatherData()
    useEffect(() => {
        fetchWeather().then();
    }, []);

  return (
    <>
      <main>
          <Weather/>
          <div className="content">
              <WeekCalendar/>
          </div>
      </main>
    </>
  )
}

export default App
