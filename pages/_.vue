<template>
  <section>
    <Loading
      :text="'Loading...'"
      :show="!landing"/>
    <div class="container">
      <div class="row">
        <div class="col-md p-0">
          <div
            v-if="landing"
            v-show="landing"
            class="col-md p-0"
            v-html="$md.render(landing.data)"/>
        </div>
  </div></div></section>
</template>

<script>
import Loading from '~/components/Loading';
import LoadingOverlay from '~/components/LoadingOverlay';
import { mapActions, mapGetters } from 'vuex';

export default {
	auth: false,
	components: {
		Loading,
		LoadingOverlay
	},
	computed: {
		landing() {
			return this.getPageBySlug(
				this.$route.params.pathMatch == ''
					? 'README'
					: this.$route.params.pathMatch
			);
		},
		...mapGetters('ghpages', {
			getPageBySlug: 'getPageBySlug'
		})
	},
	async created() {
		if (this.ssr) {
			await this.$store.commit(
				'ghpages/runtimeApiUrl',
				process.env.GITHUB_PAGES_BASE_URL
			);
		}
	},
	methods: {
		...mapActions({
			get: 'ghpages/get'
		})
	},
	async fetch({ error, store, params }) {
		await store.dispatch(
			'ghpages/get',
			params.pathMatch == '' ? 'README' : params.pathMatch
		);
		if (process.server) {
			console.log('ssr');

			try {
				// asd
			} catch (err) {
				console.log(err);
			}
		}
	},
	async asyncData({ error, app, env, store, params }) {
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
