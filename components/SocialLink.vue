<template>
  <a 
    :href="link" 
    target="_blank"
    class="text-center align-top text-white">
    <font-awesome-layers class="float-left float-md-none amigadev-social-icon">
      <font-awesome-icon :icon="[icon_type, icon]" />
    </font-awesome-layers>
    <p class="float-left float-md-none">{{ name }}</p>
  </a>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    icon: {
      type: String,
      default: '',
      required: true
    },
    icon_type: {
      type: String,
      default: '',
      required: true
    },
    link: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
//To use bootstrap breakpoints an import is needed for the component
@import 'node_modules/bootstrap/scss/bootstrap';

.amigadev-social-icon {
  font-size: 40px;
  @include media-breakpoint-down(sm) {
    font-size: 12px;
    margin-top: 2px;
    margin-right: 5px;
  }
}
a {
  margin: 5px 15px 5px 15px;
  width: 80px;
  &:hover {
    text-decoration: none;
  }
  @include media-breakpoint-down(sm) {
    margin: 0;
    width: auto;
  }
}

p {
  @include media-breakpoint-down(sm) {
    margin: 0;
  }
}
</style>
