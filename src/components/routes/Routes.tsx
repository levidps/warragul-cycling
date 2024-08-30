import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card.tsx";
import * as css from './routes.module.css';

type Route = {
	id: number;
	name: string;
	rwgps_id?: string;
	difficulty: number;
	distance: number;
}

const FETCH_ROUTES = async (): Promise<Route[]> => {
	const response = await axios.get('https://warragul-cc-routes.levidps.workers.dev/');
	return response.data;
}

function RouteItem({name, rwgps_id}: Route) {
	const [embedUrl, setEmbed] = useState<string>(null);

	useEffect(() => {
		setEmbed(`https://ridewithgps.com/embeds?type=route&id=${rwgps_id}&hideSurface=true`)
	}, [rwgps_id]);
	return (
		<>
			<Card>
				<iframe src={embedUrl}
				        style={{width: '1px', minWidth: '100%', height: '350px', border: 'none'}}/>
			</Card>
		</>
	)
}


function Routes() {
	const [ routes, setRoutes ] = useState<Route[]>([])
	const [ search, setSearch] = useState<string>()

	useEffect(() => {
		FETCH_ROUTES().then((resp) => {
			setRoutes(resp);
		});

	}, []);

	return(
		<div className={css.routeWrapper}>
			<div className={css.routeActions}>
				<Card>
					<input type='text' onKeyUp={(e) => setSearch(() => e.target.value)}/>
					<button>FILTERS</button>
				</Card>
			</div>
			{routes.map((route) => {
				return (<RouteItem {...route}/>)
			})}
		</div>
	)
}

export default Routes