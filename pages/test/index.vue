<template>
  <section>
    <LoadingOverlay
      :text="'Loading...'"
      :show="!landing(params.pages)"/>
    <div class="container">
      <div class="row">
        <div class="col-md p-0">
          <div
            :v-html="$md.render(landing(params.pages))"
            class="col-md p-0"/>
        </div>
      </div>
  </div></section>
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
		landing(page) {
			return this.$store.state.pages.data[page];
		}
	},
	async created() {
		if (!this.ssr) {
			await this.get(this.$params.pages);
		} else {
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
		if (process.server) {
			try {
				await store.dispatch('ghpages/get', params.pages);
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
