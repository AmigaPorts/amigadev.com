<template>
  <div>
    <LoadingOverlay
      :text="'Loading...'"
      :show="loading"/>
    <img
      :src="port.imageUrl"
      class="w-100 d-md-none amigadev-port-image"
      alt="field">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <img
          :src="port.topImage"
          class="pt-md-3 w-50 amigadev-port-image"
          alt="field">
        <h1 class="pt-md-3 m-md-0">{{ port.title }}</h1>
        <p
          class="font-size-18"
          v-html="port.description"/>
      </div>
      <div class="col-md-12">
        <Downloads
          v-if="portDownloads !== null"
          :versions="portDownloads.versions"
          :downloads="portDownloads.nightly"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Downloads from '~/components/Downloads';
import Download from '~/components/Download';
import LoadingOverlay from '~/components/LoadingOverlay';

export default {
	auth: false,
	components: {
		Downloads,
		LoadingOverlay
	},
	head() {
		return {
			title: this.title + 'AmigaDev'
		};
	},
	data() {
		return {
			title: '',
			loading: true,
			port: {},
			portDownloads: null
		};
	},
	mounted() {
		this.fetchPort(this.$route.params.port);
		this.fetchPortDownloads(this.$route.params.port);
	},
	methods: {
		async fetchPort(slug) {
			this.port = await this.$axios.$get('/v1/ports/' + slug);

			this.title = this.port.title + ' :: ';
			this.loading = false;
		},
		async fetchPortDownloads(slug) {
			const portDownloads = await this.$axios.$get(
				'/v1/ports/' + slug + '/downloads'
			);

			this.portDownloads = portDownloads;

			this.loading = false;
		}
	}
};
</script>
