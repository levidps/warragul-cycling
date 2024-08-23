import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { WeatherForecastResponse } from "../models/weather.models.ts";
import { API_KEY } from "../env.ts";
import Card from "./Card.tsx";

const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const DEFAULT_LOCATION : {lat: number, lon: number} = { lat:-38.1667, lon:145.9333};

function Weather() {
	const [weather, setWeather] = useState<WeatherForecastResponse | null>(null)

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const config = {
					params: {
						...DEFAULT_LOCATION,
						appid: API_KEY,
						units: 'metric',
						exclude: 'minutely,alerts',
					}
				};
				const response = await axios.get<string, AxiosRequestConfig<any>>(BASE_URL, config)
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