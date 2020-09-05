<template>
  <div
    v-if="show" >

    <div class="amigadev-loading-container">
      <div><font-awesome-icon :icon="['fas', 'spinner']" /></div>
      <p v-if="text">{{ text }}</p>
    </div>

  </div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true
		},
		show: {
			type: Boolean,
			default: true
		}
	}
};
</script>
