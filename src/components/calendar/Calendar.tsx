import Card from "../card/Card.tsx";
import * as css from './calendar.module.css';
import './react-calendar.css';
import Calendar from "react-calendar";
import { useState } from "react";

function AppCalendar() {
	const [selectedDay, setSelectedDay] = useState();
	return (
		<div className={css.calendarWrapper}>
			<Card>
				<Calendar onChange={(e) => setSelectedDay(() => e)} value={selectedDay} />
			</Card>
		</div>
	)
}

export default AppCalendar;