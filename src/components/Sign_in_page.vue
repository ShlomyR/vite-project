<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet color="red">
          <v-row no-gutters>
            <v-col cols="2">
              <v-btn icon="mdi-exit-to-app" color="black" variant="text" />
            </v-col>
            <v-col cols="8">
              <p class="text-h4 text-center h-100">
                System
              </p>
            </v-col>
            <v-col cols="2" class="text-end">
              <v-btn icon="mdi-menu" color="black" variant="text" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters >
      <v-col cols=" 12" class="h-100">
      <v-sheet color="grey-lighten-5" height="90vh" >
        <v-row no-gutters justify="center" align="center">
          <v-col cols="4">
            <v-card max-height="500" class="mt-12">
              <v-card-title class="text-h4 text-center">
                welcom
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-row justify="center">
                    <v-col cols="9">
                      <v-text-field label="User name" variant="outlined" />
                    </v-col>
                    <v-col cols="9">
                      <v-text-field label="password" variant="outlined" type="password" icon append-inner-icon="mdi-eye"
                        hint="At least 8 characters" />
                    </v-col>
                    <v-col cols="9">
                      <v-row no-gutters justify="space-between">
                        <v-col cols="5">
                          <v-btn block>
                            Sign in
                          </v-btn>
                        </v-col>
                        <v-col cols="5">
                          <v-btn block>
                            Register
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row no-gutters class="mt-12">
                    <v-col cols="4" class="text-end">
                      <v-btn icon="mdi-twitter" color="black" variant="text" />
                    </v-col>
                    <v-col cols="4" class="text-center">
                      <v-btn icon="mdi-google-plus" color="black" variant="text" />
                    </v-col>
                    <v-col cols="4" class="text-start">
                      <v-btn icon="mdi-facebook" color="black" variant="text" />
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

<script lang='ts'>
import { defineComponent } from 'vue'

// Logo
import logo from '../assets/logo.svg'

export default defineComponent({
  name: 'HelloWorld',

  data() {
    return {
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      logo,
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Roadmap',
          href: 'https://vuetifyjs.com/en/introduction/roadmap/',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }
  },
})
</script>
