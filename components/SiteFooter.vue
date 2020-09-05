<template>
  <footer class="text-white bg-primary">
    <div
      class="container justify-content-center">
      <div
        class="col-md-10 d-none d-flex flex-row justify-content-start align-items-center">
        <div class="col-md">
          <div>
            <img
              src="/amigadev-logo-green.png"
              alt="AmigaDev logotype">
          </div>
        </div>
        <div class="col-md mt-2">
          <Invite v-if="isAuthenticated"/>
        </div>
        <div class="col-md mt-2 d-flex justify-content-md-end flex-column flex-md-row">
          <SocialLink
            v-for="(social_link, index) in social_links"
            :key="index"
            :icon="social_link.icon.icon"
            :icon_type="social_link.icon.icon_type"
            :name="social_link.title"
            :link="social_link.url"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
import Invite from '~/components/Invite';
import SocialLink from '~/components/SocialLink';

export default {
	components: {
		Invite,
		SocialLink
	},
	data() {
		return {
			social_links: []
		};
	},
	computed: {
		...mapGetters(['isAuthenticated'])
	},
	mounted() {
		this.fetchSiteInfo();
	},
	methods: {
		async fetchSiteInfo() {
			const site_info = await this.$axios.$get('/v1/site-info');
			this.social_links = site_info.social_links;
		}
	}
};
</script>

<style lang="scss">
footer {
	padding: 25px 0 30px 0;
	flex-shrink: 0;
	p,
	label {
		margin: 0 0 5px 0;
		font-size: 12px;
	}
}
</style>
