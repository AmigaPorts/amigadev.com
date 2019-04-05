<template>
  <div>
    <LoadingOverlay
      :text="'Loading ports...'"
      :show="loading"/>

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
			title: 'Ports :: ',
			loading: true,
			filters: null,
			topProductImageUrl: '',
			topProductTitle: '',
			topProductShortInformation: '',
			topProductSlug: '',
			topProductCategory: '',
			producer: {
				topProductId: 0,
				products: {},
				posts: []
			}
		};
	},
	mounted() {
		this.fetchPageInfo();
	},
	methods: {
		async fetchPageInfo() {
			//await this.fetchFilters()
			await this.fetchProducer(this.$route.params.ports);
		},
		async fetchProducer(slug) {
			try {
				this.producer = await this.$axios.$get('/v1/ports');
				this.title = this.producer.title + ' - ';
			} catch (e) {
				return this.$nuxt.error({ statusCode: 404, message: e });
			}
		},
		async fetchFilters() {
			let filters = await this.$axios.$get('/v1/search/categories');
			for (let filter in filters) {
				filters[filter].name = filters[filter].name.replace('&amp;', '&');
			}
			this.filters = filters;
		},
		generateTopProduct(id) {
			this.topProductImageUrl = this.producer.products[id].imageUrl;
			this.topProductTitle = this.producer.products[id].title;
			this.topProductShortInformation = this.producer.products[
				id
			].shortInformation;
			this.topProductSlug = this.producer.products[id].slug;
			this.topProductCategory = this.filters[
				this.producer.products[id].categories[0]
			].name;

			this.loading = false;
		}
	}
};
</script>
