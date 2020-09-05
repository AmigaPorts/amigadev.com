<template>
  <section>
    <LoadingOverlay
      :text="'Loading...'"
      :show="!landing"/>
    <div class="container">
      <div class="row">
        <div class="col-md p-0">
          <div
            :v-if="landing != null"
            class="col-md p-0"
            v-html="$md.render(landing)"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from '~/components/Loading';
import LoadingOverlay from '~/components/LoadingOverlay';
import { mapActions } from 'vuex';

export default {
	auth: false,
	components: {
		Loading,
		LoadingOverlay
	},
	computed: {
		landing() {
			return this.$store.state.ghpages.data['README'];
		}
	},
	async created() {
		if (!this.ssr) {
			await this.get('README');
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
				await store.dispatch('ghpages/get', 'README');
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
