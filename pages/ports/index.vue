<template>
  <div>
    <Loading
      :text="'Loading ports...'"
      :show="!landing"/>
    <div v-if="landing">
      <Port
        :landing="landing.software"
        name="Software"/>
      <Port
        :landing="landing.script"
        name="Tools"/>
      <Port
        :landing="landing.hardware"
        name="Hardware"/>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading';
import Port from '~/components/Port';
import { mapActions, mapGetters } from 'vuex';

export default {
	auth: false,
	components: {
		Loading,
		Port
	},
	computed: {
		landing() {
			return this.$store.state.ports.data;
		},
		...mapGetters('ports', {
			getPageBySlug: 'getPageBySlug'
		})
	},
	async created() {
		if (this.ssr) {
			await this.$store.commit('ports/runtimeApiUrl', process.env.API_BASE_URL);
		}
	},
	methods: {
		...mapActions({
			get: 'ports/get'
		})
	},
	async fetch({ error, store, params }) {
		await store.dispatch('ports/get');
	},
	async asyncData({ error, app, env, store, params }) {
		return {
			ssr: process.server
		};
	}
};
</script>
