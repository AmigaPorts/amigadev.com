<template>
  <section>
    <LoadingOverlay
      :text="'Loading...'"
      :show="loading"/>
    <div
      class="d-flex justify-content-center align-items-center flex-column">
      <img
        :src="landing.logo"
        class="amigadev-landing-round-logo"
        alt="AmigaDev">
      <h1 class="align-center">{{ landing.title }}</h1>
    </div>
  </section>
</template>

<script>
import LoadingOverlay from '~/components/LoadingOverlay';

export default {
	middleware: 'guest',
	auth: false,
	components: {
		LoadingOverlay
	},
	async asyncData({ error, app, env, store }) {
		let landing = [];
		let loading = true;
		let ssr = process.server;

		if (ssr) {
			landing = fetchLandingInfo();
		}

		return {
			landing: landing,
			loading: loading,
			ssr: ssr
		};
	},
	created() {
		if (!this.ssr) {
			this.landing = this.fetchLandingInfo();
		}
	},
	methods: {
		fetchLandingInfo: async function() {
			const landing = await this.$axios.$get('/v1/page/landing');
			this.loading = false;

			return landing;
		}
	}
};
</script>

<style lang="scss" scoped>
button {
	margin: 10px;
}
</style>
