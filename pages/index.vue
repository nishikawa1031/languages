<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
        <ul>
          <li v-for="user in allUsers" :key="user.id">
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <v-list-item-title class="headline mb-1">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.email }}
                  </v-list-item-subtitle>
                    <v-text>
                      指導科目：{{ user.category }}
                    </v-text>
                    <br>
                    <v-text>
                      経歴・自己PR等<br>{{ user.summary }}
                    </v-text>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <!-- <!-- <v-btn text>Button</v-btn> -->
                <v-layout justify-center>
                  <v-btn @click="submit()" color="blue darken-3" class="white--text">詳細</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </li>
        </ul>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import firebase from '@/plugins/firebase'


export default {
  data() {
    return {
      allUsers: [],
      user: {
        name: '',
        email: '',
        summary: '',
        category:'',
      },
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  created() {
    allusers: {
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
        })
    }
  }
}
</script>
<style scoped>
  li {
    list-style: none;
  }
</style>
