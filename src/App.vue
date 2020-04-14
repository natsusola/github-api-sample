<template lang="pug">
  .app
    Home
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Home from './views/Home.vue';

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
