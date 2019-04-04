<template>
  <p :class="[type == 'producer' ? 'text-white' : ''] + ' pl-2 pt-2 d-none d-md-block font-size-12'">
    <nuxt-link
      class="amigadev-breadcrumbs"
      to="/search">Sök</nuxt-link> / <nuxt-link
        :to="'/' + producerSlug"
        class="amigadev-breadcrumbs">{{ producerName }}</nuxt-link><span v-if="type == 'product'"> / <nuxt-link
          :to="'/' + producerSlug + '/' + productSlug"
          class="amigadev-breadcrumbs">{{ productName }}</nuxt-link>
  </span></p>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: ''
		},
		productName: {
			type: String,
			default: ''
		},
		productSlug: {
			type: String,
			default: ''
		},
		producerName: {
			type: String,
			default: ''
		},
		producerSlug: {
			type: String,
			default: ''
		}
	}
};
</script>
