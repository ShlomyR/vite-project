<template>
  <v-container class="pa-0">
    <v-toolbar
      dark
      color="red"
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon  @click="drawer = !drawer"/>
      <v-navigation-drawer v-model="drawer" color="primary" >
        <v-list>
          <v-list-item v-for="list in lists" :key="list.text">
            <v-list-item-action >
              <v-icon class="white--text">
                {{ list.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" >
                {{ list.text }}
              </v-list-item-title>
            </v-list-item-content>
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
          <v-row no-gutters justify="center" align="center">
            <v-col cols="4">
              <v-card max-height="500" class="mt-5" color="grey-lighten-3" dark>
                <v-card class="text-h4 text-center pa-5" color="blue" dark>
                  welcome
                </v-card>
                <v-card-text class="mt-5">
                  <v-snackbar v-model="snackbar1" absolute top right color="success">
                    <span>Registration successful!</span>
                    <v-icon dark class="ma-2"> mdi-checkbox-marked-circle </v-icon>
                  </v-snackbar>
                  <v-snackbar v-model="snackbar2" absolute top right color="error">
                    <span> Registration failed!</span>
                    <v-icon light class="ma-2"> mdi-alpha-x-circle-outline </v-icon>
                  </v-snackbar>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row justify="center">
                      <v-col cols="9">
                        <v-text-field
                          v-model="userName"
                          :readonly="loading"
                          :rules="nameRules"
                          label="User name"
                          variant="outlined"
                          required
                        />
                      </v-col>
                      <v-col cols="9">
                        <v-text-field
                          v-model="password"
                          :readonly="loading"
                          :rules="nameRules"
                          :append-inner-icon="eyeVisible ? 'mdi-eye-off' : 'mdi-eye'"
                          :type="eyeVisible ? 'text' : 'password'"
                          label="Enter your password"
                          variant="outlined"
                          @click:append-inner="eyeVisible = !eyeVisible"
                          required
                        />
                      </v-col>
                      <v-col cols="9">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5">
                            <v-btn
                              block
                              :loading="loading"
                              color="green-lighten-3"
                              @click="login(userName, password)"
                            >
                              Sign in
                            </v-btn>
                          </v-col>
                          <v-col cols="5">
                            <v-btn
                              block
                              :disabled="!valid"
                              color="green-lighten-3"
                              @click="register()"
                            >
                              Register
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-12">
                      <v-col cols="4" class="text-end">
                        <v-btn icon="mdi-twitter" color="blue-lighten-3" variant="text" />
                      </v-col>
                      <v-col cols="4" class="text-center">
                        <v-btn icon="mdi-google-plus" color="black" variant="text" />
                      </v-col>
                      <v-col cols="4" class="text-start">
                        <v-btn icon="mdi-facebook" color="blue-darken-3" variant="text" />
                      </v-col>
                      <v-col cols="3">
                        <v-btn text class="mt-5" color="green-lighten-1" @click="resetForm()" >
                            Cancel 
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { analyze } from "eslint-scope";
import { link } from "fs";
import { computed, defineComponent } from "vue";
import { ref} from "vue";

export default defineComponent({
  name: "HelloWorld",

  setup() {
    
    const users: Array<any> = [];
    const lists: Array<any> = [
      {icon: 'mdi-dashboard',text: 'Dashboard',route: '/'},
      {icon: 'mdi-folder',text: 'My Projects',route: '/projects'},
      {icon: 'mdi-person',text: 'Team',route: '/team'}
    ];
    const userName = ref<string>("");
    const password = ref<string>("");    
    const form = ref<any>();
    const eyeVisible = ref<boolean>(false);
    const snackbar1 = ref<boolean>(false);
    const snackbar2 = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const valid = ref<boolean>(false);
    const drawer = ref<boolean>(false);
    
      
      // const objA = {
        //     visible: false,
        //     userName,
        //     password,
    // };
    
    // const obj: any = {visible: false};
    
    // obj.userName = userName;
    
    // obj ['password'] = password;
    
    // const test = computed(() => {
      //   if(userName.value === 'shlomy')
      //   {
        //     return 'cool! ' + userName.value;
        //   }
        //   return 'huuum ' + userName.value;
        // })
        
        // const fullInput = computed(() => {
          //   if(userName.value === '')
          //   {
            //     return 'cool! ' + userName.value;
            //   }
            //   return 'huuum ' + userName.value;
            // })
    
    const login = (userName: string, password: string) => {
      for (const user of users) {
        if (user.userName === userName && user.password === password) {
          return alert("success") ,onSubmit();
        }
      }
      return alert("Error");
    };
        
    const register = () => {
      for (const user of users) {
        if (user.userName === userName.value) {
          alert(`user name: ${userName.value} already exist`);
          return submit_registerFailed();
          // return alert(`user name: ${userName.value} already exist`);
        }
      }
      users.push({
        userName: userName.value,
        password: password.value,
      });
      console.log(users);
      alert(`user name: ${userName.value} Successfully added`);
      submit_register();
    };
        

            
    const nameRules = [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ];

    const passwordRules = [
      (v: string) => !!v || 'password is required',
      (v: string) => (v && v.length <= 10) || 'Password must be contain at least 1 of below characters',
    ];

    const emilRules = [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];

    const resetForm = () =>  {
      form.value.reset();
    };

    const submit_register = () =>  {
      snackbar1.value = true;
      resetForm();
    };

    const submit_registerFailed = () =>  {
      snackbar2.value = true;
      resetForm();
    };

    const onSubmit = () =>  {
      loading.value = true;
      setTimeout(() => (loading.value = false), 2000)
      resetForm();
    };

    return {
      form,
      loading,
      lists,
      snackbar1,
      snackbar2,
      valid,
      drawer,
      eyeVisible,
      userName,
      password,
      login,
      register,
      resetForm,
      submit_register,
      submit_registerFailed,
      onSubmit,
      nameRules,
      emilRules,
      
      
    };
  }
});
</script>
