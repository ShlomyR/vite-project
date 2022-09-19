<template>
  <v-app>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/test_Sign.vue'


//import Input from './components/Input.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    //Input,
  },

  data () {
    return {
     
    }
  },
  methods: {
    
  }
})
</script>

<style>
  /* #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased ;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
  } */
</style>

