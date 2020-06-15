<template>
  <section>
    <Loading
      :text="'Loading...'"
      :show="!landing"/>
    <div
      class="d-flex justify-content-center align-items-center flex-column">
      <img
        v-if="landing"
        :src="landing.logo"
        class="amigadev-landing-round-logo"
        alt="AmigaDev">
      <h1 class="align-center">{{ landing.title }}</h1>
    </div>
  </section>
</template>

<script>
import Loading from '~/components/Loading';
import LoadingOverlay from '~/components/LoadingOverlay';
import { mapActions } from 'vuex';

export default {
	middleware: 'guest',
	auth: false,
	components: {
		Loading,
		LoadingOverlay
	},
	computed: {
		landing() {
			return this.$store.state.pages.data.landing;
		}
	},
	async created() {
		if (!this.ssr) {
			await this.get('landing');
		} else {
			await this.$store.commit('pages/runtimeApiUrl', process.env.API_BASE_URL);
		}
	},
	methods: {
		...mapActions({
			get: 'pages/get'
		})
	},
	async fetch({ error, store, params }) {
		if (process.server) {
			try {
				await store.dispatch('pages/get', 'landing');
			} catch (err) {
				console.log(err);
			}
		}
	},
	async asyncData({ error, app, env, store }) {
		return {
			ssr: process.server
		};
	}
};
</script>

<style lang="scss" scoped>
button {
	margin: 10px;
}
</style>
