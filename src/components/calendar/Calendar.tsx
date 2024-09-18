import Card from "../card/Card.tsx";
import * as css from './calendar.module.css';
import React, { useState, useMemo } from "react";

interface WeekCalendarProps {
	currentDate?: Date;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ currentDate = new Date() }) => {
	const getDates = (startDate: Date): string[] => {
		const dates: string[] = [];

		for (let i = 0; i < 7; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
			dates.push(formattedDate);
		}

		return dates;
	};

	const dates = useMemo(() => getDates(currentDate), [currentDate]);

	return (
		<Card className={css.calendarWrapper}>
			{dates.map((date, index) => (
				<div key={index} className="flex-1 p-4 border border-gray-300 text-center">
					{date}
				</div>
			))}
		</Card>
	);
};

export default WeekCalendar;