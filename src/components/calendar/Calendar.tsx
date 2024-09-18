import Card from "../card/Card.tsx";
import * as css from './calendar.module.css';
import React, { useState, useMemo } from "react";

interface WeekCalendarProps {
	currentDate?: Date;
}

const propagateDates = (startDate: Date): string[] => {
	const dates: string[] = [];

	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
		dates.push(formattedDate);
	}

	return dates;
};

function WeekCalendar({ currentDate = new Date() }) {
	const [selectedDay, selectDay] = useState<number>(0);
	const dates = useMemo(() => propagateDates(currentDate), [currentDate]);

	return (
		<Card className={css.calendarWrapper}>
			{dates.map((date, index) => (
				<div key={index}
				     className={index === selectedDay ? css.today : '' }
				     onClick={() => selectDay(index)}>
					{date}
				</div>
			))}
		</Card>
	);
};

export default WeekCalendar;