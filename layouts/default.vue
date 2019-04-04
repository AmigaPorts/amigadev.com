<template>
  <div class="amigadev-main">
    <header>
      <SiteHeader/>
    </header>
    <main class="container d-flex justify-content-center">
      <div class="col-md-10">
        <nuxt/>
      </div>
    </main>
    <!--<SiteFooter/>-->
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue';
import SiteFooter from '~/components/SiteFooter.vue';

export default {
	components: {
		SiteHeader,
		SiteFooter
	}
};
</script>
