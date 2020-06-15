import axios from 'axios';

export const state = () => ({
	data: {},
	env: {
		API_BASE_URL: process.env.API_BASE_URL
	}
});

export const mutations = {
	set(state, obj) {
		state.data[obj.name] = obj.data;
	},
	runtimeApiUrl(state, value) {
		state.env.API_BASE_URL = value;
	}
};

export const actions = {
	async get({ commit, state }, name) {
		if (state.data[name] == null) {
			const apiUrl = state.env.API_BASE_URL + 'v1/page/' + name;
			let { data } = await axios.get(apiUrl);
			commit('set', { name: name, data: data });
		}
	},
	nuxtServerInit({ commit }) {
		commit('runtimeApiUrl', process.env.API_BASE_URL);
	}
};
