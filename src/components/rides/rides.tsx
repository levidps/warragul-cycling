import { data, TRide } from '../../rides.ts';
import Card from "../card/Card.tsx";
import  * as css from './rides.module.css';
import { PropsWithChildren, useEffect, useState } from "react";
import { dayMap, timeOfDayUnits } from "../../utils/dates.ts";

function Units({children}: PropsWithChildren) {
	return (
		<span className={css.units}>{children}</span>
	)
}

function Rides() {
	const [rides, setRides] = useState<TRide[]>([]);

	useEffect(() => {
		const decorated = data.sort((a, b) => a.day - b.day);
		setRides(() => decorated);
	});

	return (<div className={css.rides}>
		<h1>Group Rides</h1>
		{rides.map((ride) => {
			return (<>
				<Card title={dayMap[ride.day] + ' ' + ride.name}
				      className={css.ridesCard}>
					<div className={css.cardBody}>
						<div className={css.details}>
							<p><strong>Time:</strong> {ride.start}<Units>{timeOfDayUnits(ride.start)}</Units></p>
							<p><strong>Leaves:</strong> {ride.location}</p>
							<p><strong>Pace:</strong> {ride.speed}<Units>kph</Units><br/>
								{ride.speed_min && ride.speed_max &&
								 <small>({ride.speed_min}<Units>kph</Units> to {ride.speed_max}<Units>kph</Units>)</small>}
							</p>
						</div>
						<p>{ride.description}</p>
					</div>
				</Card>
			</>)
		})}
	</div>)
}

export default Rides;