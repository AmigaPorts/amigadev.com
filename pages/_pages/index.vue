<template>
  <div>
    <LoadingOverlay
      :text="'Loading...'"
      :show="loading"/>
    <div class="container">
      <Breadcrumbs
        :type="'page'"
        :product-name="page.post_title"
        :product-slug="page.slug"
        :producer-name="page.parentTitle"
        :producer-slug="page.parentSlug"
      />
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
            <div class="font-size-12 pl-4 mb-4 amigadev-product-content-container">
              <div class="row">
                <div class="col-6">
                  <p class="mb-0">
                    <strong>Innehåll:</strong>
                    {{ page.contents }}
                  </p>
                </div>
                <div class="col-6">
                  <p class="mb-1">
                    <strong>Atrikelnummer:</strong>
                    {{ page.itemNumber }}
                  </p>
                  <p class="mb-1">
                    <strong>Minsta beställning:</strong>
                    {{ page.minimumOrder }}
                  </p>
                  <p class="mb-0">
                    <strong>Vikt:</strong>
                    {{ page.weight }}
                  </p>
                </div>
              </div>
            </div>
            <nuxt-link :to="'/' + page.parentSlug + '#contact'">
              <button class="btn btn-primary">Kontakta producent</button>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md p-0">
          <img
            :src="page.imageUrl"
            class="w-100 pt-md-3 d-none d-md-block amigadev-product-image"
            alt="field"
          >
          <div class="px-4 pb-4 p-md-0 pt-md-4">
            <h5>Utökad information</h5>
            <p class="font-size-12">{{ page.extendedInformation }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs';
import LoadingOverlay from '~/components/LoadingOverlay';

export default {
	auth: true,
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
			const page = await this.$axios.$get('/v1/pages/' + slug);
			this.page = page;
			this.title = page.post_title + ' :: ';
			this.loading = false;
		}
	}
};
</script>
