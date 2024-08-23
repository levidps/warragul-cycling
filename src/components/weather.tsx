import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { WeatherForecastResponse } from "../models/weather.models.ts";
import { API_KEY } from "../env.ts";

const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

function Weather() {
	const [weather, setWeather] = useState<WeatherForecastResponse | null>(null)

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const config = {
					params: {
						lat:-38.1667,
						lon:145.9333,
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
				<pre>{JSON.stringify(weather?.current, null, 2)}</pre>
				<pre>{JSON.stringify(weather?.daily, null, 2)}</pre>
				<pre>{JSON.stringify(weather?.hourly, null, 2)}</pre>
			</div>
		</>
	)
}

export default Weather;