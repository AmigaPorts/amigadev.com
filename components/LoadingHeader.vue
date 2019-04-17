<template>
  <div
    v-if="loading" >

    <div class="amigadev-loading-container">
      <div><font-awesome-icon :icon="['fas', 'spinner']" /></div>
    </div>

  </div>
</template>

<script>
export default {
	data: function() {
		return {
			loading: false
		};
	},
	methods: {
		start: () => {
			this.loading = true;
		},
		finish: () => {
			this.loading = false;
		}
	}
};
</script>
