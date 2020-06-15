<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title>
        <v-layout>
          <v-flex lg12>
            <v-row>
              <!-- <v-col><Logo /></v-col> -->
              <v-col v-if="$vuetify.breakpoint.smAndUp"
                ><a href="/">Katekyo</a></v-col
              >
            </v-row>
          </v-flex>
        </v-layout>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text to="/inspire">Categories</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="!isAuthenticated && $vuetify.breakpoint.smAndUp"
          text
          to="/login"
          >Become a tutor</v-btn
        >
        <v-btn
          v-if="!isAuthenticated && $vuetify.breakpoint.smAndUp"
          text
          to="/"
          >Login</v-btn
        >
        <v-btn
          v-if="!isAuthenticated && $vuetify.breakpoint.smAndUp"
          text
          to="/"
          >Sign Up</v-btn
        >
        <v-btn v-if="isAuthenticated && $vuetify.breakpoint.smAndUp" text to="/"
          ><v-icon>mdi-account</v-icon></v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <v-row>
        <v-col lg="1">
          <v-row><v-btn text to="">About Us</v-btn></v-row>
          <v-row><v-btn text to="">News</v-btn></v-row>
          <v-row><v-btn text to="">Contact Us</v-btn></v-row>
        </v-col>
        <v-col lg="1"></v-col>
        <v-col lg="1">
          <v-row><v-btn text to="">Privacy Policy</v-btn></v-row>
          <v-row><v-btn text to="">Terms of Use</v-btn></v-row>
          <v-row><v-btn text to="">特定商取引法に基づく表記</v-btn></v-row>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  data() {
    return {
      fixed: false
    }
  }
}
</script>
