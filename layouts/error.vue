<template>
  <div class="container">
    <h1 class="display-1">{{ error.statusCode }}</h1>
    <div v-if="error.statusCode === 404">

      <h1>Page not found</h1>
      <p/>
    </div>
    <div v-else>
      <h1>Something went wrong</h1>
      <p/>
    </div>

    <nuxt-link to="/">
      <button class="btn btn-primary">Return to home page...</button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			default() {
				return [];
			}
		}
	}
};
</script>
