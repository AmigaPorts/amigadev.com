<template>
  <section>
    <h3>{{ name }}</h3>
    <table style="margin-bottom:40px;">
      <thead>
        <tr>
          <td>Name</td>
          <td>Language</td>
          <td>--</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(port, key) in landing"
          :key="key">
          <td>
            <a
              :href="port.repoUrl"
              target="_blank">{{ port.name }}</a>
          </td>
          <td>{{ port.language }}</td>
          <td>
            <template
              v-if="port.page">
              <nuxt-link
                :to="'/ports/' + port.name">
                Download
              </nuxt-link>
            </template>
            <template v-else>
              --
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		landing: {
			type: Object,
			default: null
		}
	}
};
</script>

<style scoped>
</style>
