<template>
  <v-container class="pa-0">
    <v-toolbar dark color="red" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-navigation-drawer v-model="drawer" color="primary">
        <v-list>
          <v-list-item v-for="item in lists" :key="item.text" @click="goto(item.route)">
            <v-list-item-action>
              <v-icon class="white--text">
                {{ item.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-title class="white--text"> {{ item.text }} </v-list-item-title>
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
                        <v-row> </v-row>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-12">
                      <v-col cols="4" class="text-end">
                        <v-btn
                          icon="mdi-twitter"
                          color="blue-lighten-3"
                          variant="text"
                          @click="signInWithTwitter()"
                        />
                      </v-col>
                      <v-col cols="4" class="text-center">
                        <v-btn
                          icon="mdi-google-plus"
                          color="black"
                          variant="text"
                          @click="signInWithGoogle()"
                        />
                      </v-col>
                      <v-col cols="4" class="text-start">
                        <v-btn
                          icon="mdi-facebook"
                          color="blue-darken-3"
                          variant="text"
                          @click="signInWithFacebook()"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          text
                          class="mt-5"
                          color="green-lighten-1"
                          @click="resetForm()"
                        >
                          Cancel
                        </v-btn>
                      </v-col>
                      <v-col cols="9" class="text-end">
                        <v-btn class="mt-5"
                          color="green-lighten-1" 
                          @click="addNewUser()"
                           >
                            click 
                           </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
              <v-card class="text-center" color="blue" dark> users </v-card>
              <v-card>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-list-item v-for="item in items" :key="item.time">
                          {{ item.name }}
                          {{ item.password }}
                          {{ item.time }}
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card>
             
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {  ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AxiosManager from "../plugins/AxiosManeger";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../main";

export default defineComponent({
  name: "HelloWorld",
  

  setup() {
    const users: Array<any> = [];
    const newUser: Array<any> = [];
    const usersArr: Array<any> = [];
    const lists: Array<any> = [
      { icon: "mdi-view-dashboard", text: "Dashboard", route: "home" },
      { icon: "mdi-folder", text: "My Projects", route: "projects" },
      { icon: "mdi-account-circle-outline", text: "Team", route: "team" },
      { icon: "mdi-account-circle-outline", text: "Users", route: "users" },
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
    const sign_in = ref<boolean>(false);
    const router = useRouter();
    const axiosManager = new AxiosManager();
        
    const items = ref<Array<any>> ([]);
    const  items1 =  [
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          num: 1,
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          num: 2,
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          num: 3,
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          num: 4,
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          num: 5,
        },
      ];
      
      const deleteUser = async () => {
        await deleteDoc(doc(db, "users"));
      };
      
      const q = query(collection(db, "users"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
        let userChange = change.doc.data();
        userChange.id = change.doc.id;
        if (change.type === "added") {
          console.log("New user: ", userChange);
          
          usersArr.push(userChange);
        }
        if (change.type === "modified") {
          console.log("Modified user: ", userChange);
        }
        if (change.type === "removed") {
          console.log("Removed user: ", userChange);
          let index = users.findIndex((us) => us.id === userChange.id);
          users.splice(index, 1);
        }
      });
    });
    
    const unsubscribe1 = onSnapshot(q, (querySnapshot) => {
      const users: any = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data().name);
        users.push(doc.data().password);
        users.push(doc.data().time);
      });
      console.log("Current users in firebase: ", users.join(",\n"));
    });
    
    const login = (userName: string, password: string) => {
      for (const user of users) {
        if (user.userName === userName && user.password === password) {
          signInWithEmailAndPassword(getAuth(), userName, password)
          .then((data) => {
            console.log("good one");
            router.push("./projects");
          })
            .catch((error) => {
              console.log(error.code);
              alert(error.message);
            });
          return alert("success"), onSubmit();
        }
      }
      for (const a of usersArr) {
        if (a.name === userName && a.password === password) {
          signInWithEmailAndPassword(getAuth(), userName, password)
          .then((data) => {
            console.log("good one");
            router.push("./projects");
          })
          .catch((error) => {
            console.log(error.code);
              alert(error.message);
            });
            return alert("success"), onSubmit();
          }
        }
        return alert("Error");
      };
      
      const register = async () => {
        for (const user of users) {
        if (user.name === userName.value) {
          alert(`user name: ${userName.value} already exist`);
          return submit_registerFailed();
        }
      }
      
      users.push({
        name: userName.value,
        password: password.value,
        time: Date.now(),
      });

      let newUser = {
        name: userName.value,
        password: password.value,
        time: Date.now(),
      };

      const docRef = await addDoc(collection(db, "users"), newUser);
      console.log("Document written with ID: ", docRef.id);

      console.log(users);
      createUserWithEmailAndPassword(getAuth(), userName.value, password.value)
      .then((data) => {
        console.log("good one Successes");
        router.push("./");
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
      alert(`user name: ${userName.value} Successfully added`);
      submit_register();
    };
    const addNewUser = () => {
        items.value.push({
          name:userName.value,
          password:password.value,
          time: Date.now(),
        });
    };

    const nameRules = [
      (v: string) => !!v || "Name is required",
      (v: string) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ];

    const passwordRules = [
      (v: string) => !!v || "password is required",
      (v: string) =>
        (v && v.length <= 10) ||
        "Password must be contain at least 1 of below characters",
    ];

    const emilRules = [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    const resetForm = () => {
      form.value.reset();
    };

    const submit_register = () => {
      snackbar1.value = true;
      resetForm();
    };

    const submit_registerFailed = () => {
      snackbar2.value = true;
      resetForm();
    };

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("./projects");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const signInWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("./projects");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const signInWithTwitter = () => {
      const provider = new TwitterAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("./projects");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const goto = (name: string) => {
      router.push({
        name,
      });
    };

    const twitter = async () => {
      const res = await axiosManager.getData("/users");
      console.log("res", res.data);
      console.log("shlomy");
    };

    const onSubmit = () => {
      loading.value = true;
      setTimeout(() => (loading.value = false), 2000);
      resetForm();
    };

    
    
    
    
    
    return {
      form,
      loading,
      lists,
      usersArr,
      users,
      items,
      items1,
      //usersArr,
      snackbar1,
      snackbar2,
      valid,
      drawer,
      sign_in,
      eyeVisible,
      userName,
      password,
      login,
      addNewUser,
      register,
      //addUser,
      twitter,
      unsubscribe1,
      signInWithGoogle,
      signInWithFacebook,
      signInWithTwitter,
      resetForm,
      submit_register,
      submit_registerFailed,
      onSubmit,
      goto,
      nameRules,
      emilRules,
    };
  },
});
</script>
