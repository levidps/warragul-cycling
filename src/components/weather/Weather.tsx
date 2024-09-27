import { PropsWithChildren, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import {
	WeatherForecastResponse,
	WeatherForecast,
	DailyWeatherForecast
} from "../../models/weather.models.ts";
import Card from "../card/Card.tsx";
import * as css from './weather.module.css'
import { dateFormat, hourFormat } from "../../utils/dates.ts";
import RainIcon from "../icons/Rain.tsx";
import { angleToDirection, round } from "../../utils/maths.ts";
import { useWeatherData } from "../../context/WeatherContext.tsx";

function RainForecast({rain}: PropsWithChildren<{rain?: number}>) {
	return (
		<p className={css.rainWrapper}>
			<span className='units'><RainIcon/></span>
			{rain ? `${round(rain)}mm` : '-'}
		</p>
	)
}

export function ForecastDetails({ temp, rain }: DailyWeatherForecast) {
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

function HourlyForecast({ forecast}: { forecast?: WeatherForecast[] }) {
	return (
		<Card title='Hourly'>
			<div className={css.forecastWrapper}>
				{forecast && forecast.map((d) => {
					return <div className={css.dailyForecast}>
						<p>
							{dateFormat(d.dt)}
							<br/>{hourFormat(d.dt)}
						</p>
						<p>
							{round(d.temp)}°
						</p>
						<RainForecast rain={d.rain ? d.rain['1h'] : undefined}/>
					</div>
				})}
			</div>
		</Card>
	)
}

function Weather() {
	const { weather } = useWeatherData();

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
				<HourlyForecast forecast={weather?.hourly}/>
			</div>
		</>
	);
}

export default Weather;