import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherProvider } from "./context/WeatherContext.tsx";

// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <WeatherProvider>
        <App />
      </WeatherProvider>
  </StrictMode>,
)
