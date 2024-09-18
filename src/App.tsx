import './App.css'
import Weather from "./components/weather/Weather.tsx";
import Routes from "./components/routes/Routes.tsx";
import WeekCalendar from "./components/calendar/Calendar.tsx";
import { useWeatherData, WeatherProvider } from "./context/WeatherContext.tsx";
import { useEffect } from "react";

function App() {
    const { fetchWeather } = useWeatherData()
    useEffect(() => {
        fetchWeather();
    }, []);

  return (
    <>
      <main>
          <Weather/>
          <div className="content">
              <WeekCalendar/>
              <Routes/>
          </div>
      </main>
    </>
  )
}

export default App
