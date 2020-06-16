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
    <v-row>
      <v-card>
        <v-app-bar color="grey lighten-3">
          <v-tool-bar>
            <v-btn text color="light-blue darken-1" fab><v-icon @click="getData();">mdi-reorder-horizontal</v-icon></v-btn>
          </v-tool-bar>
          <v-toolbar-items>
            <!-- 汚すぎるから時間あるときに書き直す。 -->
            <v-btn text color="light-blue darken-1" fab @click="englishUsers();">英語</v-btn>
            <v-btn text color="light-blue darken-1" fab @click="mathUsers();">数学</v-btn>
            <v-btn text color="light-blue darken-1" fab @click="scienceUsers();">理科</v-btn>
            <v-btn text color="light-blue darken-1" fab @click="socialUsers();">社会</v-btn>
            <v-btn text color="light-blue darken-1" fab @click="japaneseUsers();">国語</v-btn>
          </v-toolbar-items>
        </v-app-bar>
      </v-card>
    </v-row>
    <br>
    <v-row>
        <ul>
          <li v-for="user in displayUsers" :key="user.id">
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
                      略歴：{{ user.summary }}
                    </v-text>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-layout justify-center>
                  <v-btn
                    color="primary"
                    dark
                    @click.stop="dialog = true"
                  >
                    Open Dialog
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </li>
        </ul>
    </v-row>
        <v-divider></v-divider>
          <!-- <v-pagination
            v-model="page"
            :length="length"
            @input = "pageChange"
          ></v-pagination> -->
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">Use Google's location service?</v-card-title>

            <v-card-text>
              Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Disagree
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
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
      displayUsers:[],
      pageSize: 10,
      length:0,
      page: 1,
      user: {
        name: '',
        email: '',
        summary: '',
        category:'',
      },
      name:'',
      email:'',
      summary:'',
      isAcitve01: false,
      dialog: false,
    }
  },
  components: {
    Logo,
    VuetifyLogo,
  },
  mounted(){
    // this.pageChange(pageNumber);
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          this.displayUsers = this.allUsers
          console.log(this.displayUsers)
        })
    },
    englishUsers(){
      // 汚すぎるから時間あるときに書き直す。
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          this.displayUsers = this.allUsers.filter(e => e.category == "英語")
        })
    },
    mathUsers(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          this.displayUsers = this.allUsers.filter(e => e.category == "数学")
        })
    },
    scienceUsers(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          this.displayUsers = this.allUsers.filter(e => e.category == "理科")
        })
    },
    socialUsers(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          this.displayUsers = this.allUsers.filter(e => e.category == "社会")
        })
    },
    japaneseUsers(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          this.displayUsers = this.allUsers.filter(e => e.category == "国語")
        })
    },
    // pageChange(pageNumber){
    //   console.log(pageNumber)
      // let displayUsers = this.allUsers
      // this.allUsers.slice(this.pageSize*(pageNumber -1), this.pageSize*(pageNumber));
    // }
  }
}
</script>
<style scoped>
  li {
    list-style: none;
  }
</style>
