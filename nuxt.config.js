const pkg = require('./package');
require('dotenv').config({
	path: 'environments/' + process.env.NODE_ENV + '.env'
});

var metaData = {
	siteName: process.env.SITE_NAME,
	author: process.env.AUTHOR,
	ogUrl: process.env.DEFAULT_URL,
	ogTitle: process.env.SITE_TITLE,
	ogDesc: process.env.SITE_DESCRIPTION,
	ogImage: process.env.SITE_FALLBACK_IMAGE,
	fbAppId: process.env.FB_APP_ID,
	twitterSite: process.env.TWITTER_SITE
};

var headerData = {
	title: metaData.ogTitle,
	htmlAttrs: {
		lang: 'sv'
	},
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			hid: 'description',
			name: 'description',
			content: metaData.ogDesc
		},
		{
			hid: 'author',
			name: 'author',
			content: metaData.author
		},
		{
			hid: 'og:site_name',
			property: 'og:site_name',
			content: metaData.siteName
		},
		{
			hid: 'og:url',
			property: 'og:url',
			content: metaData.ogUrl
		},
		{
			hid: 'og:title',
			property: 'og:title',
			content: metaData.ogTitle
		},
		{
			hid: 'og:description',
			property: 'og:description',
			content: metaData.ogDesc
		},
		{
			hid: 'og:image',
			property: 'og:image',
			content: metaData.ogImage
		},
		{
			hid: 'fb:app_id',
			property: 'fb:app_id',
			content: metaData.fbAppId
		},
		{
			hid: 'twitter:card',
			property: 'twitter:card',
			content: 'summary'
		},
		{
			hid: 'twitter:site',
			property: 'twitter:site',
			content: metaData.twitterSite
		},
		{
			hid: 'apple-mobile-web-app-title',
			property: 'apple-mobile-web-app-title',
			content: metaData.siteName
		}
	],
	link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	script: []
};

module.exports = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
	head: headerData,

	/*
  ** Customize the progress-bar color
  */
	loading: false, // '~/components/LoadingHeader.vue', // { color: '#f0bc02' },

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
		'@nuxtjs/pwa',
		'@nuxtjs/markdownit',
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

	router: {
		middleware: ['auth']
	},
	markdownit: {
		injected: true
	},
	/*
	** Nuxt.js pwa options
	*/
	pwa: {
		manifest: {
			name: process.env.SITE_NAME,
			short_name: process.env.SITE_NAME,
			theme_color: '#000000',
			background_color: '#141414'
		}
	},
	env: {
		URL_ORIGIN: process.env.DEFAULT_URL,
		API_BASE_URL: process.env.ADMIN_URL,
		ISPRODUCTION: process.env.ISPRODUCTION,
		METADATA: metaData
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
