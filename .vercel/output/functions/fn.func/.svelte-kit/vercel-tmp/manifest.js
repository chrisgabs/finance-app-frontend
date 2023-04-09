export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.453890d5.js","imports":["_app/immutable/entry/start.453890d5.js","_app/immutable/chunks/index.6effa054.js","_app/immutable/chunks/singletons.865aaa9f.js","_app/immutable/chunks/control.e7f5239e.js","_app/immutable/chunks/parse.d12b0d5b.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.ea9b95df.js","imports":["_app/immutable/entry/app.ea9b95df.js","_app/immutable/chunks/supabaseClient.a424811f.js","_app/immutable/chunks/_commonjsHelpers.042e6b4d.js","_app/immutable/chunks/index.6effa054.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/accounts",
				pattern: /^\/api\/accounts\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/accounts/_server.ts.js')
			},
			{
				id: "/api/records",
				pattern: /^\/api\/records\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/records/_server.ts.js')
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
