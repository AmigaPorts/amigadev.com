<template>
  <section>
    <LoadingOverlay
      :text="'Loading...'"
      :show="loading"/>
    <div class="container">
      <div class="row">
        <div class="col-md p-0">
          <div class="px-4 pb-4">
            <h1 class="pt-md-3 m-md-0">{{ page.post_title }}</h1>
            <nuxt-link :to="'/' + page.parentSlug">
              <div
                class="bg-secondary my-2 text-center text-white d-inline-block amigadev-product-producer-link amigadev-cursor-pointer">
                <span unselectable="on">{{ page.parentTitle }}</span>
              </div>
            </nuxt-link>
            <p class="font-size-18">{{ page.shortInformation }}</p>
          </div>
          <div
            :v-html="page.post_content"
            class="col-md p-0"/>
        </div>
      </div>
  </div></section>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs';
import LoadingOverlay from '~/components/LoadingOverlay';

export default {
	auth: false,
	components: {
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
			page: {}
		};
	},
	mounted() {
		this.fetchProduct(this.$route.params.pages);
	},
	methods: {
		async fetchProduct(slug) {
			try {
				const page = await this.$axios.$get('/v1/pages/' + slug);
				this.page = page;
				this.title = page.post_title + ' :: ';
				this.loading = false;
			} catch (e) {
				return this.$nuxt.error({ statusCode: 404, message: e });
			}
		}
	}
};
</script>
