<template>
  <v-app >
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
  name: "App",

  components: {},

  setup() {
    const router = useRouter();
    // const envVariable = ref(process.env.VUE_APP_FIREBASE_API_KEY);

    // // You can access process.env variables directly
    // console.log(process.env.VUE_APP_FIREBASE_API_KEY);

    // // Use the imported process object
    // console.log(process);
    const drawer = ref<boolean>(false);
    const lists: Array<any> = [
      { icon: "mdi-view-dashboard", text: "Dashboard", route: "home" },
      { icon: "mdi-folder", text: "My Projects", route: "projects" },
      { icon: "mdi-account-circle-outline", text: "Team", route: "team" },
      { icon: "mdi-account-circle-outline", text: "Users", route: "users" },
    ];

    const goto = (name: string) => {
      router.push({
        name,
      });
    };



    return {
      goto,
      drawer,
      lists,
      // envVariable,
    };
  },
  methods: {},
});
</script>

<style>

</style>
