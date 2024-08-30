import './App.css'
import Weather from "./components/weather/Weather.tsx";
import Routes from "./components/routes/Routes.tsx";
import AppCalendar from "./components/calendar/Calendar.tsx";

function App() {

  return (
    <>
      <main>
          <Weather/>
          <Routes/>
          <AppCalendar/>
      </main>
    </>
  )
}

export default App
