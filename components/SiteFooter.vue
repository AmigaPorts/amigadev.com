<template>
  <footer class="text-white bg-primary">
    <div class="container mb-5 mb-md-0">
      <div class="row">
        <div class="col-md">
          <div>
            <img
              src="/amigadev-logo-green.png"
              alt="Västernorrlandsgården logotyp">
          </div>
          <p>Org.nr {{ organization_number }}</p>
          <p>Postadress: {{ postal_address }}</p>
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
			organization_number: 'Laddar organisationsnummer...',
			postal_address: 'Laddar adress...',
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
			this.organization_number = site_info.organization_number;
			this.postal_address = site_info.postal_address;
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
