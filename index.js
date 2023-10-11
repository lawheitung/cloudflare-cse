/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const hasValidHeader = (request, env) => {
	return request.headers.get('X-Custom-Auth-Key') === env.AUTH_KEY_SECRET;
  };
  
  function authorizeRequest(request, env, key) {
	switch (request.method) {
	  case 'GET':
	  default:
		return false;
	}
  }

export default {
	
	async fetch(request, env) {
	  const COUNTRY = request.cf.country;

	  const TIME = performance.now();
	  const TIMEZONE = request.cf.timezone
	  const dDate = new Date(TIME).toLocaleDateString("en", {timeZone: TIMEZONE});
	  const dTime = new Date(TIME).toLocaleTimeString("en", {timeZone: TIMEZONE});
	  const name = COUNTRY + ".png"
	  const imglink = "https://"+ env.domain + "/" + name
	  

	  let userEmail = request.headers.get("Cf-Access-Authenticated-User-Email") || '_development';
    

	  const TIMESTAMP = dDate +' '+ dTime;
	  const html = `<!DOCTYPE html>
		  <body>
			<h1>Hello World</h1>
			<p> ${userEmail} authenticated at ${TIMESTAMP} from ${COUNTRY} </p>
			<img src = ${imglink} >
		  </body>`;
  
	  return new Response(html, {
		headers: {
		  "content-type": "text/html;charset=UTF-8",
		},
	  });
	},
  };