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
            const current = resp?.current;
            const {h, s, l} = mapHSL(current?.temp, current?.rain?.['1h'], current?.dt);
            document.body.style.setProperty('--color-hue', `${h}`);
            document.body.style.setProperty('--color-sat', `${s}%`);
            document.body.style.setProperty('--color-light', `${l}%`);
            console.log(h,s,l);
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
