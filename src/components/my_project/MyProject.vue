<template>
  <v-container class="pa-0">
  <v-toolbar dark color="red" prominent >
      <v-app-bar-nav-icon  @click="drawer = !drawer"/>
      <v-navigation-drawer v-model="drawer" color="primary" >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmail.com"
            class="white--text"
          />
        </v-list>
        <v-list>
          <v-list-item v-for="item in lists" :key="item.text" @click="goto(item.route)">
            <!-- <v-list-item v-for="item in lists" :key="item.text" router :to="item.route"> -->
            <v-list-item-action >
              <v-icon class="white--text">
                {{ item.icon }}
              </v-icon>
            </v-list-item-action>
              <v-list-item-title class="white--text" > {{ item.text }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-divider class="mx-4" vertical />
      <v-toolbar-title class="text-center"> System </v-toolbar-title>
      <v-divider class="mx-4" vertical />
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row no-gutters>
      <v-col cols=" 12" class="h-100">
        <v-sheet color="grey-lighten-5" height="90vh">
          <v-col  cols="2">
            <v-btn @click="handleSignOut()" class="text-end" v-if="isLoggedIn" block>
            {{ massage }}
            </v-btn>
          </v-col>
          <p>
          hi there i'm my projects 
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

    import { analyze } from "eslint-scope";
    import { link } from "fs";
    import { computed, ref, defineComponent, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
    
    export default defineComponent({
        name: "MyProject",
    
      setup() {

        const lists: Array<any> = [
          
          {icon: 'mdi-folder',text: 'My Projects',route: 'projects'},
          {icon: 'mdi-account-circle-outline',text: 'Team',route: 'team'},
          { icon: "mdi-account-circle-outline", text: "Users", route: "users" },
        ];
      
        const drawer = ref<boolean>(true);
        const router = useRouter();
        const isLoggedIn = ref<boolean>(false);
        const massage = ref<string>();
        let auth:any;
      
        onMounted(() => {
          auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user) {
              massage.value = 'Sign out';
              isLoggedIn.value = true;
            } else {
              massage.value = 'Sign in';
              isLoggedIn.value = false;
            }
          })
        });

        const goto = (name:string) =>  {
          
          router.push({
            name,
          })
        };

        const handleSignOut = () =>  {
          signOut(auth).then(() => {
            router.push("/")
          })
          
        };
            
        return {
          
          drawer,
          lists,
          isLoggedIn,
          massage,
          goto,
          handleSignOut,
        };

      }
    });
    </script>