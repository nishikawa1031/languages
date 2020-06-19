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
                    <v-text>
                      閲覧数：{{ user.count }}
                    </v-text>
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
            <v-card-title class="title">{{selectedUser.name}}さんの自己PR</v-card-title>

            <v-card-text>
              {{selectedUser.content}}
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
      englishUsers:'',
      englishUsersLength:'',
      mathUsersLength:'',
      scienceUsersLength:'',
      socialUsersLength:'',
      japaneseUsersLength:'',
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
        })
    },
    getCategoryNumber(category){
      if (category.content == "英語"){
        return this.allUsers.filter(e => e.category == "英語").length
        // this.category.length = this.allUsers.filter(e => e.category == "英語").length
      }else if(category.content == "数学"){
        return this.allUsers.filter(e => e.category == "数学").length

      }else if(category.content == "理科"){
        return this.allUsers.filter(e => e.category == "理科").length

      }else if(category.content == "社会"){
        return this.allUsers.filter(e => e.category == "社会").length

      }else if(category.content == "国語"){
        return this.allUsers.filter(e => e.category == "国語").length

      }
    },
    getCategoryData(category){
      if (category.content == "英語"){
        console.log(category.content)
        this.displayUsers = this.allUsers.filter(e => e.category == "英語").slice(0,this.pageSize)
        // this.category.length = this.allUsers.filter(e => e.category == "英語").length
      }else if(category.content == "数学"){
        this.displayUsers = this.allUsers.filter(e => e.category == "数学").slice(0,this.pageSize)
        this.length = Math.ceil(this.displayUsers.length/this.pageSize)
      }else if(category.content == "理科"){
        this.displayUsers = this.allUsers.filter(e => e.category == "理科").slice(0,this.pageSize)
        this.length = Math.ceil(this.displayUsers.length/this.pageSize)
      }else if(category.content == "社会"){
        this.displayUsers = this.allUsers.filter(e => e.category == "社会").slice(0,this.pageSize)
        this.length = Math.ceil(this.displayUsers.length/this.pageSize)
      }else if(category.content == "国語"){
        this.displayUsers = this.allUsers.filter(e => e.category == "国語").slice(0,this.pageSize)
        this.length = Math.ceil(this.displayUsers.length/this.pageSize)
      }
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
