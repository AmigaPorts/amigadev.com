<template>
  <section>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <template
          v-if="port === null">
          <Loading
            :text="'Loading port data...'"
            :show="port === null"/>
        </template>
        <template v-else>
          <img
            :src="port.topImage"
            class="pt-md-3 w-50 amigadev-port-image"
            alt="field">
          <h1 class="pt-md-3 m-md-0">{{ port.title }}</h1>
          <p
            class="font-size-18"
            v-html="port.description"/>
        </template>
      </div>
      <div
        v-if="portDownloads == null"
        class="col-md-12">
        <Loading
          :text="'Loading releases...'"
          :show="portDownloads === null"/>
      </div>
      <div
        v-else
        class="col-md-12 mb-4">
        <h2>Release Builds</h2>
        <Downloads
          v-if="portDownloads !== null && portDownloads.releases.length > 0"
          :versions="portDownloads.versions"
          :downloads="portDownloads.releases"
          version_string="Version"
        />
        <span v-else>No release builds available...</span>
      </div>
      <div
        v-if="portDownloads == null"
        class="col-md-12">
        <Loading
          :text="'Loading nightlies...'"
          :show="portDownloads === null"/>
      </div>
      <div
        v-else
        class="col-md-12">
        <h2>Nightly Builds</h2>
        <Downloads
          v-if="portDownloads !== null && portDownloads.nightly.length > 0"
          :versions="portDownloads.versions"
          :downloads="portDownloads.nightly"
          version_string="Date"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Downloads from '~/components/Downloads';
import Download from '~/components/Download';
import Loading from '~/components/Loading';

export default {
	auth: false,
	components: {
		Downloads,
		Loading
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
			port: null,
			portDownloads: null
		};
	},
	mounted() {
		this.fetchPort(this.$route.params.port);
		this.fetchPortDownloads(this.$route.params.port);
		setInterval(() => {
			this.fetchPortDownloads(this.$route.params.port);
		}, 5000);
	},
	methods: {
		async fetchPort(slug) {
			try {
				this.port = await this.$axios.$get('/v1/ports/' + slug);

				this.title = this.port.title + ' :: ';
				this.loading = false;
			} catch (e) {
				return this.$nuxt.error({ statusCode: 404, message: e });
			}
		},
		async fetchPortDownloads(slug) {
			const portDownloads = await this.$axios.$get(
				'/v1/ports/' + slug + '/downloads'
			);

			this.portDownloads = portDownloads;
		}
	}
};
</script>
