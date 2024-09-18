export default {
	async fetch(request, env, ctx) {
		const { results } = await env.db.prepare(
			"SELECT * FROM routes LIMIT 10"
		).all();

		return new Response(JSON.stringify(results), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': request.headers.get('Origin')
			},
			status: 200
		});
	},
};