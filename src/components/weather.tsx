import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { WeatherForecastResponse } from "../models/weather.models.ts";
import Card from "./Card.tsx";

const BASE_URL = 'https://open-weather-map.levidps.workers.dev/';

function Weather() {
	const [weather, setWeather] = useState<WeatherForecastResponse | null>(null)

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				// TODO: built to accept LAT/LON if want to support alternate locales
				const response = await axios.get<string, AxiosRequestConfig<any>>(BASE_URL)
				setWeather(response.data)
			} catch (error) {
				console.error('Error fetching weather data:', error)
			}
		}

		fetchWeather().then();
	}, [])

	return(
		<>
			<div style={{ display: 'flex', gap: '8px' }}>
				{ weather?.current &&
				    <Card>
					    <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
					         alt={weather.current.weather[0].description}
					    />
					    { JSON.stringify(weather.current) }
				    </Card>
				}
				<pre>{JSON.stringify(weather?.current, null, 2)}</pre>
				<pre>{JSON.stringify(weather?.daily, null, 2)}</pre>
				<pre>{JSON.stringify(weather?.hourly, null, 2)}</pre>
			</div>
		</>
	)
}

export default Weather;