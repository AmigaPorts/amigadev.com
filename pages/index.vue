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
	data() {
		return {
			loading: true,
			landing: {
				producers: [
					{
						imageUrl: ''
					},
					{
						imageUrl: ''
					},
					{
						imageUrl: ''
					}
				]
			}
		};
	},
	mounted() {
		this.fetchLandingInfo();
	},
	methods: {
		async fetchLandingInfo() {
			const landing = await this.$axios.$get('/v1/page/landing');
			this.landing = landing;
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
button {
	margin: 10px;
}
</style>
