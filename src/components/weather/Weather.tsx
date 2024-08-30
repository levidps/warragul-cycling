import { PropsWithChildren, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { WeatherForecastResponse, DailyForecast } from "../../models/weather.models.ts";
import Card from "../card/Card.tsx";
import * as css from './weather.module.css'
import { dateFormat } from "../../utils/dates.ts";
import RainIcon from "../icons/Rain.tsx";
import { angleToDirection, round } from "../../utils/maths.ts";

const BASE_URL = 'https://open-weather-map.levidps.workers.dev/';

function RainForecast({rain}: PropsWithChildren<{rain?: number}>) {
	return (
		<p className={css.rainWrapper}>
			<span className='units'><RainIcon/></span>
			{rain ? `${round(rain)}mm` : '-'}
		</p>
	)
}

function ForecastDetails({ temp, rain }: DailyForecast) {
	return (
		<>
			<p>
				<span className='units'>H</span>
				{round(temp.max)}°
			</p>
			<p>
				<span className='units'>L</span>
				{round(temp.min)}°
			</p>
			<RainForecast rain={rain}/>
		</>
	)
}

function Forecast({ forecast }: PropsWithChildren<{ forecast?: DailyForecast[] }>) {
	return (
		<Card>
			<div className={css.forecastWrapper}>
				{forecast && forecast.map((d) => {
					return <div className={css.dailyForecast}>
						<p>{dateFormat(d.dt)}</p>
						<ForecastDetails {...d}/>
					</div>
				})}
			</div>
		</Card>
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
							 <p>{round(weather.current.temp)}°</p>
							 <p>
								 {round(weather.current.wind_speed)}<i
								 style={{ opacity: '.5d' }}>/</i>{round(weather.current.wind_gust)}
								 <span className='units'>kph</span>
								 <span className={css.windDirection}>{angleToDirection(weather.current.wind_deg)}</span>
							 </p>
						 </div>
						 <div className={css.dailyWeather}>
							 <ForecastDetails {...weather.daily[0]}/>
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