<template>
  <div class="container">
    <h1 class="display-1">{{ error.statusCode }}</h1>
    <div v-if="error.statusCode === 404">
      
      <h1>Sidan hittades inte</h1>
      <p>Sidan du försöker komma åt finns inte. Kontrollera att länkadressen är korrekt eller gå tillbaka till startsidan.</p>
    </div>
    <div v-else>
      <h1>Hoppsan! Något gick fel</h1>
      <p>Sidan laddades inte korrekt. Var snäll och gå tillbaka till startsidan och testa igen.</p>
    </div>

    <nuxt-link to="/">
      <button class="btn btn-primary">Tillbaka till startsidan</button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return []
      }
    }
  }
}
</script>
