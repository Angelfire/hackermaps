<template>
  <div>
    <h8k-navbar v-bind:header="title"></h8k-navbar>
    <Navigation :locations="locations"/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      title: 'Hackermaps',
      locations: [
        'Lombard St, San Francisco, CA, USA',
        'PIER 39, The Embarcadero, San Francisco, CA, USA',
        'Golden Gate Bridge, San Francisco, CA, USA',
        `Fisherman's Wharf, San Francisco, CA, USA`,
        'Alcatraz Island, San Francisco, CA, USA'
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/h8k-design/dist/index.css';
</style>
