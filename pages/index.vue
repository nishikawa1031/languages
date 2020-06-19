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
          <v-toolbar-items>
            <!-- 書き直す。 -->
            <v-btn
              v-for="(category, index) in categories"
              :key="index"
              text
              color="light-blue darken-1"
              @click="getCategoryData(category);"
            >
              {{ category.content }}<br>({{getCategoryNumber(category)}})
            </v-btn>
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
              <v-list-item>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <v-list-item-title class="headline mb-1">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                      指導科目：{{ user.category }}
                    <br>
                      自己PR等：{{ user.summary }}
                    <br>
                      閲覧数：{{ user.count }}
                  </v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                >
                <img :src="user.icon"/>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-layout justify-center>
                  <v-btn
                    color="primary"
                    dark
                    @click.stop="dialog = true"
                    @click="passID(user);"
                  >
                    詳細を見る
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
        <v-dialog
          v-model="dialog"
          max-width="400"
        >
          <v-card>
            <v-card-title class="title">{{selectedUser.name}}さんの詳細</v-card-title>

            <v-card-text>
              詳細：{{selectedUser.content}}
              <br>
              使用ツール：{{selectedUser.tool}}
              <br>
              希望条件：{{selectedUser.condition}}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                閉じる
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
      // allUsersLength:'',
      selectedUser:'',
      displayUsers:[],
      pageSize: 4,
      length:0,
      page: 1,
      categories:[
        { content: '英語', created: '2019-03-31 15:30' },
        { content: '国語', created: '2019-03-31 15:30' },
        { content: '数学', created: '2019-03-31 15:30' },
        { content: '理科', created: '2019-03-31 15:30' },
        { content: '社会', created: '2019-03-31 15:30' }
      ],
      user: {
        name: '',
        email: '',
        summary: '',
        category:'',
        count:'',
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

          this.length = Math.ceil(this.allUsers.length/this.pageSize)
          this.displayUsers = this.allUsers.slice(0,this.pageSize)
          const c = this.displayUsers
          console.log(this.displayUsers)

          for (const i in c) {
            console.log(c[i])
            return c[i]
          }
        })
    },
    sortUsers(){
      const c = this.displayUsers
      for (const i in c) {
        console.log(c[i].count)
        return c[i].count
      }
    },
    getCategoryNumber(category){
      return this.allUsers.filter(e => e.category == category.content).length
    },
    getCategoryData(category){
      this.displayUsers = this.allUsers.filter(e => e.category == category.content).slice(0,this.pageSize)
      this.categoryUsers = this.allUsers.filter(e => e.category == category.content)
      this.length = Math.ceil(this.categoryUsers.length/this.pageSize)
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
          console.log(this.selectedUser.count)
          pageChange(pageNumber)
        })
    },
    pageChange(pageNumber){
      console.log(pageNumber)
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

</style>
