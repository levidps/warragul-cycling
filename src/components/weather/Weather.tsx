import { PropsWithChildren, useEffect, useRef, } from "react";
import {
	WeatherForecast,
	DailyWeatherForecast
} from "../../models/weather.models.ts";
import Card from "../card/Card.tsx";
import * as css from './weather.module.css'
import { dateFormat, hourFormat } from "../../utils/dates.ts";
import RainIcon from "../icons/Rain.tsx";
import { angleToDirection, round } from "../../utils/maths.ts";
import { useWeatherData } from "../../context/WeatherContext.tsx";
import { assignHSLValues, mapHSL } from "../../utils/colors.ts";

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
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (ref.current && ref.current.children && forecast) {
			Array.from(ref.current.children).forEach((el, i) => {
				const weather: undefined | WeatherForecast = forecast[i];
				assignHSLValues(el as HTMLElement, mapHSL(weather.temp, weather.rain ? weather.rain['1h'] : 0))
			})
		}
	}, [forecast, ref]);
	return (
		<Card title='Hourly'>
			<div ref={ref} className={css.forecastWrapper}>
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

function CurrentForecast({current, daily}: {current: WeatherForecast, daily: DailyWeatherForecast}) {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (ref.current)
			assignHSLValues(ref.current, mapHSL(current.temp, daily.rain))
	}, [current, daily, ref]);

	return (
		<Card >
			<div ref={ref} className={css.weatherCard}>
				<img src={`https://openweathermap.org/img/wn/${current.weather[ 0 ].icon}@2x.png`}
				     alt={current.weather[ 0 ].description}
				     className={css.weatherIcon}
				/>
				<div className={css.currentWeather}>
					<p>{dateFormat(current.dt)}</p>
					<p>{round(current.temp)}°</p>
					<p>
						{round(current.wind_speed)}<i
						style={{ opacity: '.5d' }}>/</i>{round(current.wind_gust)}
						<span className='units'>kph</span>
						<span className={css.windDirection}>{angleToDirection(current.wind_deg)}</span>
					</p>
				</div>
				<div className={css.dailyWeather}>
					<ForecastDetails {...daily}/>
				</div>
			</div>
		</Card>
	)
}

function Weather() {
	const { weather } = useWeatherData();

	return (
		<>
			<div className={css.weatherWrapper}>
				{weather?.current && <CurrentForecast current={weather.current} daily={weather.daily[0]}/>}
				<HourlyForecast forecast={weather?.hourly}/>
			</div>
		</>
	);
}

export default Weather;