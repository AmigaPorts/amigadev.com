import axios from 'axios';

export const state = () => ({
	data: [],
	pages: 0,
	env: {
		GITHUB_PAGES_BASE_URL: process.env.GITHUB_PAGES_BASE_URL
	}
});

export const mutations = {
	set(state, obj) {
		state.data[state.pages] = obj;
		state.pages++;
	},
	runtimeApiUrl(state, value) {
		state.env.API_BASE_URL = value;
	}
};

export const getters = {
	getPageBySlug: state => name => {
		return state.data.find(page => page.name === name);
	}
};

export const actions = {
	async get({ commit, state }, name) {
		console.log('get');
		if (!state.data.find(page => page.name === name)) {
			const apiUrl = state.env.GITHUB_PAGES_BASE_URL + name + '.md';
			let { data } = await axios.get(apiUrl);
			commit('set', { name: name, data: data });
		}
	},
	nuxtServerInit({ commit }) {
		commit('runtimeApiUrl', process.env.GITHUB_PAGES_BASE_URL);
	}
};
