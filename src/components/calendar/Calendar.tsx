import Card from "../card/Card.tsx";
import * as css from './calendar.module.css';
import React, { useState, useMemo } from "react";
import { useWeatherData } from "../../context/WeatherContext.tsx";
import { ForecastDetails } from "../weather/Weather.tsx";

type WeekCalendarProps = {
	currentDate?: Date;
}

type DayDate = {
	ds: number,
	formatted: string
}

const propagateDates = (startDate: Date): DayDate[] => {
	const dates: DayDate[] = [];

	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
		dates.push({ ds: date.valueOf(), formatted: formattedDate });
	}

	return dates;
};

function WeekCalendar({ currentDate = new Date() }) {
	const [selectedDay, selectDay] = useState<number>(0);
	const dates = useMemo(() => propagateDates(currentDate), [currentDate]);
	const { weather } = useWeatherData();

	return (
		<Card className={css.calendarWrapper}>
			{dates.map((date, index) => (
				<div key={index}
				     className={css.calendarDay + ' ' + (index === selectedDay ? css.today : '')}
				     onClick={() => selectDay(index)}>
					<p>{date.formatted}</p>
					{weather?.daily[index] &&
					    <ForecastDetails {...weather?.daily[index]}/>
					}
				</div>
			))}
		</Card>
	);
};

export default WeekCalendar;