import './App.css'
import Weather from "./components/weather/Weather.tsx";
import Routes from "./components/routes/Routes.tsx";
import WeekCalendar from "./components/calendar/Calendar.tsx";
import { useWeatherData } from "./context/WeatherContext.tsx";
import { useEffect } from "react";
import { mapHSL } from "./utils/colors.ts";

function App() {
    const { fetchWeather } = useWeatherData()
    useEffect(() => {
        fetchWeather().then((resp) => {
            console.log(resp?.current);

            const current = resp?.current;
            console.log(mapHSL(current?.temp, current?.rain?.['1h'], current?.dt));
        });
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
