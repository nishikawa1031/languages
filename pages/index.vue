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
      <v-card class="mx-auto">
        <v-app-bar color="grey lighten-3">
          <v-tool-bar>
            <v-btn text color="light-blue darken-1" fab><v-icon @click="getData();">mdi-reorder-horizontal</v-icon></v-btn>
          </v-tool-bar>
          <v-tool-bar>
            {{ $t('navigate') }}
          </v-tool-bar>
          <v-toolbar-items>
            <v-btn
              v-for="(category, index) in $t('language.items')"
              :key="index"
              text
              color="light-blue darken-1"
              @click="getCategoryData(category);"
            >
              {{ category.name }}<br>({{getCategoryNumber(category)}})
            </v-btn>
          </v-toolbar-items>
        </v-app-bar>
      </v-card>
    </v-row>
    <br>
    <div
      v-for="(category, index) in $t('language.items')"
      :key="index"
    >
      <v-btn
        class="title"

        text
        color="light-blue darken-1"
        @click="getCategoryData(category);"
      >
        {{ category.name }}:({{getCategoryNumber(category)}})
      </v-btn>

    <v-row>
        <ul>
          <li v-for="user in display(category)" :key="user.id">
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-layout justify-center>
                  <v-avatar
                    tile
                    size="120"
                    color="grey"
                  >
                    <img :src="user.icon"/>
                  </v-avatar>
                </v-layout>
              <v-list-item>

                <v-list-item-content>
                  <div class="Subtitle 1 mb-4">
                      {{ user.count }}{{ $t('number_of_views') }}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ user.name }}
                  </v-list-item-title>

                  <v-list-item-subtitle>
                    <br>
                      {{displaylanguage(user.language)}}のレベル:{{displaylanguageLevel(user.languageLevel)}}
                    <br>
                      {{ $t('can_teach') }}：{{displaylanguage(user.category)}}
                    <br>
                      {{ $t('summary') }}：{{ user.summary }}
                    <br>
                    <br>
                      {{ $t('detail') }}：{{user.content}}
                    <br>
                      {{ $t('tool') }}：{{user.tool}}
                    <br>
                      {{ $t('condition') }}：{{user.condition}}

                  </v-list-item-subtitle>

                </v-list-item-content>


              </v-list-item>

              <v-card-actions>
                <v-layout justify-center>
                  <!-- <v-btn
                    color="primary"
                    dark
                    @click.stop="dialog = true"
                    @click="passID(user);"
                  >
                    {{ $t('details') }}
                  </v-btn> -->
                  <v-btn
                    color="primary"
                    dark
                    @click="message(user);"
                  >
                    {{ $t('message') }}
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    dark
                    @click.stop="dialog = true"
                    @click="passID(user);"
                  >
                    {{ $t('contract') }}
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </li>
        </ul>
    </v-row>
        <v-divider></v-divider>
          <v-pagination
            v-model="page"
            :length="length"
            @input = "pageChange"
          ></v-pagination>
      <v-row justify="center">
        <!-- <v-dialog
          v-model="dialog"
          max-width="400"
        >
          <v-card>
            <v-card-title class="title">{{selectedUser.name}}{{ $t('page') }}</v-card-title>

            <v-card-text>
              {{ $t('detail') }}：{{selectedUser.content}}
              <br>
              {{ $t('tool') }}：{{selectedUser.tool}}
              <br>
              {{ $t('condition') }}：{{selectedUser.condition}}
            </v-card-text>

            <v-card-actions>

              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                {{ $t('close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
        <!-- <div>{{ $i18n.locale }}</div> -->
        <!-- {{ $t('message') }} -->

      </v-row>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import firebase from '@/plugins/firebase'

// import { i18n } from ''



export default {
  data() {
    return {
      allUsers: [],
      // allUsersLength:'',
      selectedUser:'',
      displayUsers:[],
      pageSize: 6,
      length:0,
      page: 1,
      user: {
        name: '',
        email: '',
        summary: '',
        content:'',
        category:'',
        condition:'',
        tool:'',
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
    this.getData();
    this.display();
    this.sortUsers();
  },
  created(){
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
          // this.allUsersLength = this.allUsers.length

          this.displayUsers = this.allUsers.slice(0,this.pageSize)
          const c = this.displayUsers
          // console.log(this.displayUsers)

          for (const i in c) {
            // console.log(c[i])
            return c[i]
          }
        })
    },
    display(category){
      return this.allUsers.filter(e => e.category == category.val).slice(0,this.pageSize)
    },
    sortUsers(){
      const c = this.displayUsers
      for (const i in c) {
        // console.log(c[i].count)
        return c[i].count
      }
    },
    getCategoryNumber(category){
      return this.allUsers.filter(e => e.category == category.val).length
    },
    getCategoryData(category){
      this.displayUsers = this.allUsers.filter(e => e.category == category.val).slice(0,this.pageSize)
      this.categoryUsers = this.allUsers.filter(e => e.category == category.val)
      this.length = Math.ceil(this.categoryUsers.length/this.pageSize)
    },
    displaylanguage(languageNumber){
      this.selectedLanguage = this.$t('language.items').filter(i => i.val == languageNumber)
      return this.selectedLanguage[0].name
    },
    displaylanguageLevel(languageLevelNumber){
      this.selectedLanguage = this.$t('languageLevel.items').filter(i => i.val == languageLevelNumber)
      return this.selectedLanguage[0].name
    },
    message(user){
      // console.log(user.id)
      this.$router.push('/users/' + user.id)
    },
    passID(user){
      this.selectedUser = user
      this.selectedUser.count ++ ;

      const db = firebase.firestore()

      let thisID = String(this.selectedUser.id)

      const dbUser = db.collection('users').doc(thisID)
      dbUser
        .update({
          count: this.selectedUser.count,
        })
        .then((ref) => {
          // console.log(this.selectedUser.count)
          pageChange(pageNumber)
        })
    },
    pageChange(pageNumber){
      // console.log(pageNumber)
      this.displayUsers = this.allUsers.slice(this.pageSize*(pageNumber -1), this.pageSize*(pageNumber));
    }
  }
}
</script>
<style scoped>
  li {
    list-style: none;
    display: inline-block;
  }

  .title{
    display: block;
  }

</style>
