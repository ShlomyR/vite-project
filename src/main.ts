import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA4v3NARN4bIE-j9txDwa9CEnU2fWs41vI",
  authDomain: "vue-aut0-test.firebaseapp.com",
  projectId: "vue-aut0-test",
  storageBucket: "vue-aut0-test.appspot.com",
  messagingSenderId: "903249571629",
  appId: "1:903249571629:web:243fd83c561f51b0122da4",
  measurementId: "G-C4TW73MH0M"
};


const app = initializeApp(firebaseConfig);
let db = getFirestore(app);


loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')

export default db;