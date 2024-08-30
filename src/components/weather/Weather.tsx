import { PropsWithChildren, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { WeatherForecastResponse, WeatherForecast, DailyForecast } from "../../models/weather.models.ts";
import Card from "../card/Card.tsx";
import * as css from './weather.module.css'
import { dateFormat } from "../../utils/dates.ts";

const BASE_URL = 'https://open-weather-map.levidps.workers.dev/';

function Forecast({ forecast }: PropsWithChildren<{forecast?: DailyForecast[]}>) {
	return(
		<>
			{forecast && forecast.map((d) => {
				return <>
					<p>{dateFormat(d.dt)}</p>
				</>
			})}
		</>
	)
}

function Weather() {
	const [ weather, setWeather ] = useState<WeatherForecastResponse | null>(null)

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const response = await axios.get<string, AxiosRequestConfig<any>>(BASE_URL)
				setWeather(response.data)
			} catch (error) {
				console.error('Error fetching weather data:', error)
			}
		}

		fetchWeather().then();
	}, [])

	return (
		<>
			<div className={css.weatherWrapper}>
				{weather?.current &&
				 <Card>
					 <div className={css.weatherCard}>
						 <img src={`https://openweathermap.org/img/wn/${weather.current.weather[ 0 ].icon}@2x.png`}
							  alt={weather.current.weather[ 0 ].description}
							  className={css.weatherIcon}
						 />
						 <div className={css.currentWeather}>
							 <p>{dateFormat(weather.current.dt)}</p>
							 <p>{weather.current.temp}°</p>
						 </div>
						 <div className={css.dailyWeather}>
							 <p>
								 <span className='units'>H</span>
								 {weather.daily[ 0 ].temp.max}°
							 </p>
							 <p>
								 <span className='units'>L</span>
								 {weather.daily[ 0 ].temp.min}°
							 </p>
						 </div>
					 </div>
				 </Card>
				}
				<Forecast forecast={weather?.daily}/>
			</div>
		</>
	);
}

export default Weather;