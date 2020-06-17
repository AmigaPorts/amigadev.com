import axios from 'axios';

export const state = () => ({
	data: {},
	set: false,
	env: {
		API_BASE_URL: process.env.API_BASE_URL
	}
});

export const mutations = {
	set(state, obj) {
		state.data = obj;
		state.set = true;
	},
	runtimeApiUrl(state, value) {
		state.env.API_BASE_URL = value;
	}
};

export const actions = {
	async get({ commit, state }) {
		console.log('get');
		if (!state.set) {
			const apiUrl = state.env.API_BASE_URL + 'v1/ports';
			let { data } = await axios.get(apiUrl);
			commit('set', data);
		}
	},
	nuxtServerInit({ commit }) {
		commit('runtimeApiUrl', process.env.API_BASE_URL);
	}
};
