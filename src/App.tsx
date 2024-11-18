import './App.css'
import Weather from "./components/weather/Weather.tsx";
import WeekCalendar from "./components/calendar/Calendar.tsx";
import { useWeatherData } from "./context/WeatherContext.tsx";
import { useEffect } from "react";
import Rides from "./components/rides/rides.tsx";
import Events from "./components/events/events.tsx";
import Footer from "./components/footer/footer.tsx";

function App() {
    const { fetchWeather } = useWeatherData()
    useEffect(() => {
        fetchWeather().then();
    }, []);

  return (
    <>
      <main>
          <Weather/>
          <div>
              <WeekCalendar/>
              <div className="content">
                  <Rides/>
                  <Events/>
              </div>
          </div>
      </main>
      <Footer/>
    </>
  )
}

export default App
