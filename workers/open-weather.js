function validateCache(cache) {
	if (!cache)
		return false;

	const parsed = JSON.parse(cache);
	return ((parsed.current.dt + 3600) * 1000) > new Date().valueOf();
}

export default {
	async fetch(request, env, ctx) {
		const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
		const QUERY = new URL(request.url).searchParams;

		const PARAMS = {
			lat: QUERY.get('lat') ? QUERY.get('lat') : -38.1667,
			lon: QUERY.get('lon') ? QUERY.get('lon') : 145.9333,
			appid: env.opw_key,
			units: 'metric',
			exclude: 'minutely,alerts',
		};

		const CACHE_KEY = `weatherCache_${PARAMS.lat}_${PARAMS.lon}`;

		try {
			const cache = await env.Weather_Cache.get(CACHE_KEY);

			if (validateCache(cache)) {
				return new Response(cache, {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': request.headers.get('Origin')
					},
				});
			}

			const weatherResponse = await fetch(`${BASE_URL}?lat=${PARAMS.lat}&lon=${PARAMS.lon}&exclude=minutely&appid=${PARAMS.appid}&units=${PARAMS.units}`, {
				method: 'GET'
			});

			if (!weatherResponse.ok) {
				throw new Error(`OpenWeatherMap API responded with ${weatherResponse.status}`)
			}

			const forecast = await weatherResponse;
			const toCache = await forecast.clone().json();

			await env.Weather_Cache.put(CACHE_KEY, JSON.stringify(toCache));

			return forecast;
		} catch (error) {
			console.error('Error fetching weather data:', error)
			return new Response('Error fetching weather data', { status: 500 })
		}
	},
};