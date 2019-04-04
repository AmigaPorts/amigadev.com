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
          :versions="port.versions"
          :downloads="port.nightly"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Downloads from '~/components/Downloads';
import Breadcrumbs from '~/components/Breadcrumbs';
import LoadingOverlay from '~/components/LoadingOverlay';

export default {
	auth: false,
	components: {
		Downloads,
		Breadcrumbs,
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
			port: {}
		};
	},
	mounted() {
		this.fetchProduct(this.$route.params.port);
	},
	methods: {
		async fetchProduct(slug) {
			const port = await this.$axios.$get('/v1/ports/' + slug);
			this.port = port;

			this.title = port.title + ' :: ';
			this.loading = false;
		}
	}
};
</script>
