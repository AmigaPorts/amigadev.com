const pkg = require('./package');
require('dotenv').config({
	path: 'environments/' + process.env.NODE_ENV + '.env'
});

module.exports = {
	mode: 'spa',

	/*
  ** Headers of the page
  */
	head: {
		title: 'AmigaDev',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#f0bc02' },

	/*
  ** Global CSS
  */
	css: ['@/assets/scss/app.scss'],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		{
			src: '~/plugins/velocity',
			ssr: false
		}
	],

	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		// Doc: https://bootstrap-vue.js.org/docs/
		['bootstrap-vue/nuxt', { css: false }],
		// Doc: https://www.npmjs.com/package/nuxt-fontawesome
		'nuxt-fontawesome',
		[
			'@nuxtjs/dotenv',
			{
				path: 'environments/',
				filename: process.env.NODE_ENV + '.env'
			}
		]
	],
	env: {
		API_BASE_URL: process.env.ADMIN_URL
	},
	router: {
		middleware: ['auth']
	},
	/*
  ** nuxt fontawesome module configuration
  */
	fontawesome: {
		imports: [
			{
				set: '@fortawesome/free-brands-svg-icons',
				icons: ['fab']
			},
			{
				set: '@fortawesome/free-solid-svg-icons',
				icons: ['fas']
			},
			{
				set: '@fortawesome/free-regular-svg-icons',
				icons: ['far']
			}
		]
	},
	/*
  ** Axios module configuration
  */
	axios: {
		baseURL: process.env.API_BASE_URL
	},
	auth: {
		redirect: {
			login: '/'
		},
		strategies: {
			local: {
				endpoints: {
					login: {
						url: 'jwt-auth/v1/token',
						method: 'post',
						propertyName: 'token'
					},
					user: { url: 'v1/users', method: 'get', propertyName: '' },
					logout: false
				}
			}
		}
	},

	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	}
};
