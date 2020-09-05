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
    <!--<SiteFooter/>!-->
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue';
import SiteFooter from '~/components/SiteFooter.vue';

export default {
	components: {
		SiteHeader,
		SiteFooter
	},
	data() {
		return {
			ogUrl: ''
		};
	},
	watch: {
		$route() {
			this.ogUrl = window.location.origin + this.$route.fullPath;
		}
	},
	mounted() {
		this.ogUrl = window.location.origin + this.$route.fullPath;
	},
	head() {
		return {
			title: this.ogTitle,
			meta: [
				{
					hid: 'og:url',
					property: 'og:url',
					content:
						this.ogUrl == ''
							? 'https://www.amigadev.com' + this.$route.fullPath
							: this.ogUrl
				}
			]
		};
	}
};
</script>
