<template>
  <button 
    :class="[checked ? primaryColor : 'bg-dark'] + ' btn text-white mx-2 mx-md-3 mt-2 mt-md-5 amigadev-button amigadev-search-button'" 
    type="button">
    {{ [checked ? 'Dölj ' : 'Visa '] + buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: ''
    },
    primaryColor: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: true
    }
  }
}
</script>
