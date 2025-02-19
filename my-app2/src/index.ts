/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {

}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(request.body)
		console.log(request.headers)
		console.log(request.method)

		if (request.method === "GET") {
			return Response.json({
				message: "You sent a GET request"
			})
		}
		if (request.method === "POST") {
			return Response.json({
				message: "You sent a POST request"
			})
		}
		return Response.json({
			message: "Hi There!",
		});
	},
} satisfies ExportedHandler<Env>;
