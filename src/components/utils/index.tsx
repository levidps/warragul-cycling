import { PropsWithChildren, useEffect, useState } from "react";
import * as css from './utils.module.css';

export type TEmbedProps = {
	id: string,
	label?: string,
}

export function Units({children}: PropsWithChildren) {
	return (
		<span className={css.units}>{children}</span>
	)
}

export function StravaEmbed({ id }: PropsWithChildren<TEmbedProps>) {
	const [scriptLoaded, setScriptLoaded] = useState<boolean>()
	useEffect(() => {
		if (scriptLoaded)
			return;

		const scriptTag = document.createElement('script');
		scriptTag.src = 'https://strava-embeds.com/embed.js';
		scriptTag.addEventListener('load', () => setScriptLoaded(true));
		document.body.append(scriptTag);
	}, []);

	return (
		<div className={css.embedWrapper}>
			<a href={'https://www.strava.com/routes/' + id} target="_blank">View on Strava</a>
			<div style={{ minHeight: '150px' }}
			     className="strava-embed-placeholder"
			     data-embed-type="route"
			     data-embed-id={id}
			     data-full-width="true"
			     data-hide-elevation="true" data-style="standard"
			     data-from-embed="true"></div>
		</div>
	)
}