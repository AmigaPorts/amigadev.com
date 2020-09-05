<template>
  <nav class="navbar container justify-content-center">
    <ul
      v-if="isAuthenticated"
      class="navbar-nav d-none d-md-flex ml-auto"/>
    <ul
      v-else
      class="navbar-nav col-md-10 d-none d-flex flex-row justify-content-start align-items-center">
      <li class="nav-item text-white site-title d-flex justify-content-center ">
        <img
          src="https://avatars1.githubusercontent.com/u/34406884?v=4"
          alt="AmigaDev"
          title="AmigaDev">
        <span>AmigaDev</span>
      </li>
      <li class="nav-item text-white ">
        <nuxt-link
          to="/">
          Home
        </nuxt-link>
      </li>
      <li class="nav-item text-white ">
        <nuxt-link
          to="/ports">
          Ports
        </nuxt-link>
      </li>
      <li class="nav-item text-white ">
        <nuxt-link
          to="/members">
          Members
        </nuxt-link>
      </li>
      <li class="nav-item text-white ">
        <nuxt-link
          to="/about">
          About
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
header {
	/*background-color: #ffe6598f !important;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);*/
	position: fixed;
	width: 100vw;
	top: 0px;
	left: 0px;
	right: 0px;
	z-index: 1000;
	background-color: #202020b5;

	nav {
		z-index: 10000;
		height: 50px;
		font-family: Raleway;
		line-height: 34px;
		.site-title {
			font-family: 'Raleway', sans-serif;
			font-size: 1.5em;
		}
		input {
			border-radius: 20px;
			max-width: 180px;
			height: 34px;
		}
		ul.navbar-nav {
			padding-left: 15px;
			list-style: none;
			li {
				display: inline-block;
				padding-right: 2em;

				img {
					height: 34px;
					padding-right: 7px;
				}

				a {
					line-height: 37px;
				}
			}
		}
	}
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			email: '',
			password: '',
			error: null
		};
	},
	computed: {
		...mapGetters(['isAuthenticated', 'loggedInUser']),
		adminUrl() {
			return process.env.ADMIN_URL;
		}
	},
	methods: {
		async login() {
			try {
				await this.$auth.loginWith('local', {
					data: {
						username: this.email,
						password: this.password
					}
				});

				this.$router.push('/search');
			} catch (e) {
				this.error = e.response.data.message;
			}
		},
		async logout() {
			await this.$auth.logout();
		}
	}
};
</script>
