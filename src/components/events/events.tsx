import { data, TEvent } from '../../events.ts';
import { dateFormat, timeOfDayUnits } from "../../utils/dates.ts";
import * as css from "../rides/rides.module.css";
import * as eventCss from './events.module.css';
import Card from "../card/Card.tsx";
import { StravaEmbed, Units } from "../utils";


function EventCard(event: TEvent) {
	return (
		<Card title={dateFormat(event.ts) + ': ' + event.name}
		      className={css.ridesCard + ' ' + eventCss.card}>
			<div className={css.cardBody}>
				<div className={css.details}>
					<p><strong>Time:</strong> {event.start}<Units>{timeOfDayUnits(event.start)}</Units></p>
					<p><strong>Leaves:</strong> {event.location}</p>
				</div>
				<p>{event.description}</p>
				{event.stravaId && <StravaEmbed id={event.stravaId} />}
			</div>
		</Card>
	);
}

function Events() {
	return(<div className={css.rides}>
		<h1>Events</h1>
		{data.map((event) => <EventCard {...event} />)}
	</div>)
}

export default Events;