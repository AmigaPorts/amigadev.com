<template>
  <div 
    v-show="show" 
    class="amigadev-loading-overlay">

    <div class="amigadev-loading-overlay-container">
      <div><font-awesome-icon :icon="['fal', 'spinner']" /></div>
      <p>{{ text }}</p>
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
}
</script>
