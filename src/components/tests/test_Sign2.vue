<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar rounded class="text-center" elevation="4" color="red">
          <v-app-bar-nav-icon />
          <v-divider class="mx-4" vertical></v-divider>
          <v-toolbar-title> System </v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-btn icon>
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="ma-5" cols="12">
        <v-card rounded class="mx-auto" width="400" elevation="6" color="blue">
          <v-card-title align="center"> welcome </v-card-title>
            <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row no-gutters class="ma-5" md="7">
                <v-col class="mx-auto" cols="12">
                  <v-text-field
                    v-model="userName"
                    :counter="10"
                    :rules="nameRules"
                    variant="outlined"
                    out
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="ma-5" md="7">
                <v-col class="ma-1 mx-auto" cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :append-inner-icon="eyeVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="eyeVisible ? 'text' : 'password'"
                    @click:append-inner="eyeVisible = !eyeVisible"
                    :counter="10"
                    variant="outlined"
                    label="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="ma-5" md="7">
                <v-col cols="6">
                  <v-btn block  :loading="loading" @click="login(userName, password)">
                    Sign in
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn block :disabled="!valid" @click="Register()"> Register </v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters class="ma-6">
                <v-col class="text-end" cols="4">
                  <v-btn rounded>
                    <v-icon color="blue lighten-1"> mdi-twitter </v-icon>
                  </v-btn>
                </v-col>
                <v-col class="text-center" cols="4">
                  <v-btn rounded>
                    <v-icon> mdi-google-plus </v-icon>
                  </v-btn>
                </v-col>
                <v-col class="text-start" cols="4">
                  <v-btn rounded>
                    <v-icon color="indigo darken-4 " class="align-right">
                      mdi-facebook
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-start ma-3" cols="12">
                  <v-btn @click="resetForm()"> Cancel </v-btn>
                </v-col>
              </v-row>
            </v-form>
            </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { analyze } from "eslint-scope";
import { computed, defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "HelloWorld",

  setup() {
    const users: Array<any> = [];
    const userName = ref<string>("");
    const password = ref<string>("");
    const eyeVisible = ref<Boolean>(false);
    const form = ref<any>();
    const valid = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const login = (userName: string, password: string) => {
      for (const user of users) {
        if (user.userName === userName && user.password === password) {
          return alert("success"),onSubmit();
        }
      }
      return alert("Error");
    };

    const Register = () => {
      for (const user of users) {
        if (user.userName === userName.value) {
          return alert(`user name: ${userName.value} already exist`);
        }
      }
      users.push({
        userName: userName.value,
        password: password.value,
      });
      console.log(users);
      alert(`user name: ${userName.value} Successfully added`),resetForm();
    };

    const deleteUser = () => {
        for (const user of users) {
            if (user.userName === userName.value) {
                return alert(`user name: ${userName.value} already exist`);
        }
      }
      
    }

    const resetForm = () => {
      form.value.reset();
    };

    const onSubmit = () =>  {
      loading.value = true;
      setTimeout(() => (loading.value = false), 2000)
      resetForm();
    };

    const nameRules = [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ];
    const passwordRules = [
      (v: string) => !!v || 'password is required',
      (v: string) => (v && v.length <= 10) || 'Password must be contain at least 1 of below characters',
    ];

    return {
      form,
      valid,
      loading,
      eyeVisible,
      userName,
      password,
      nameRules,
      passwordRules,
      Register,
      login,
      resetForm,
      onSubmit,
    };
  },
});
</script>
