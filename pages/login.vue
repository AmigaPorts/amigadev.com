<template>
  <div class="container">
    <Notification
      v-if="error"
      :message="error"
    />

    <form
      class="mt-5"
      method="post"
      @submit.prevent="login"
    >
      <input
        v-model="email"
        type="text"
        class="form-control w-100 mt-4"
        name="email"
      >
      <input
        v-model="password"
        type="password"
        class="form-control w-100 mt-4"
        name="password"
      >
      <button
        type="submit"
        class="btn btn-primary amigadev-button w-100 mt-4">
        Logga in
      </button>
    </form>
  </div>
</template>

<script>
//import Notification from '~/components/Notification'

export default {
  auth: true,
  /*
  components: {
    Notification
  },
  */
  data() {
    return {
      email: '',
      password: '',
      error: null
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
        })

        this.$router.push('/search')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border-radius: 20px;
  color: black;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: black;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: black;
  }
}
</style>
