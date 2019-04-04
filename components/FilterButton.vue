<template>
  <div
    :class="[checked ? 'bg-primary' : 'bg-dark'] + ' text-center text-white d-inline-block amigadev-search-filter-button'">
    <font-awesome-icon :icon="['fas', checked ? 'dot-circle' : 'circle']" />
    <span unselectable="on">{{ name }}</span>
  </div>
</template>

<script>
export default {
	props: {
		filterId: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			default: ''
		},
		checked: {
			type: Boolean,
			default: true
		}
	}
};
</script>


<style lang="scss" scoped>
</style>
