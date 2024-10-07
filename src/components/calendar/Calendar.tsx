import Card from "../card/Card.tsx";
import * as css from './calendar.module.css';
import { useState, useMemo, useEffect, useRef } from "react";
import { useWeatherData } from "../../context/WeatherContext.tsx";
import { ForecastDetails } from "../weather/Weather.tsx";
import { DailyWeatherForecast } from "../../models/weather.models.ts";
import { assignHSLValues, mapHSL } from "../../utils/colors.ts";
import { dateFormat } from "../../utils/dates.ts";

type WeekCalendarProps = {
	currentDate?: Date;
}

type DayDate = {
	ds: number,
	formatted: string | null
}

const propagateDates = (startDate: Date): DayDate[] => {
	const dates: DayDate[] = [];

	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		const formattedDate = dateFormat(date.valueOf() / 1000);
		dates.push({ ds: date.valueOf(), formatted: formattedDate });
	}

	return dates;
};

type DateCardProps = {
	date: DayDate,
	index: number,
	isSelected: boolean,
	onClick: any,
	weather: DailyWeatherForecast | undefined,
}
function DateCard({date, index, isSelected, weather, onClick}: DateCardProps) {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (ref.current)
			assignHSLValues(ref.current, mapHSL(weather?.temp.max, weather?.rain))
	}, [weather, ref]);

	return (
		<div ref={ref}
		     key={index}
		     className={css.calendarDay + ' ' + (isSelected ? css.today : '')}
		     onClick={() => onClick(index)}>
			<p>{date.formatted}</p>
			{ weather &&
			 <ForecastDetails {...weather}/>
			}
		</div>)
}

function WeekCalendar({ currentDate = new Date() }: WeekCalendarProps) {
	const [ selectedDay, selectDay ] = useState<number>(0);
	const dates = useMemo(() => propagateDates(currentDate), [ currentDate ]);
	const { weather } = useWeatherData();

	return (
		<Card className={css.calendarWrapper}>
			{dates.map((date, index) => (
				<DateCard date={date}
				          index={index}
				          weather={weather?.daily[ index ]}
				          isSelected={selectedDay === index}
				          onClick={selectDay} />
			))}
		</Card>
	);
}

export default WeekCalendar;