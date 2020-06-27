<template>
  <v-container fluid>
    <v-layout justify-center>
    <v-row>
      <v-btn v-if="isLogin" @click="logOut">Logout</v-btn>
    </v-row>
    <v-row>
        <ul>
          <li v-for="user in displayUsers" :key="user.id">
            <v-card
              v-if="isLogin"
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
                      {{user.langage}}のレベル:{{user.langageLevel}}
                    <br>
                      {{ $t('can_teach') }}：{{ user.category }}
                    <br>
                      {{ $t('summary') }}：{{ user.summary }}
                    <br>
                      <!-- {{ $t('number_of_views') }}：{{ user.count }} -->
                    <br>
                      {{ $t('detail') }}：{{user.content}}
                    <br>
                      {{ $t('tool') }}：{{user.tool}}
                    <br>
                      {{ $t('condition') }}：{{user.condition}}

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
                    {{ $t('edit') }}
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </li>
        </ul>
    </v-row>
      <v-card
        v-if="isWaiting"
        class="mx-auto"
        max-width="500"
        outlined
      >
        <p>{{ $t('loading') }}</p>
      </v-card>
      <div v-else>
      <v-card
        v-if="!isLogin"
        class="mx-auto"
        max-width="500"
        outlined
      >
        <v-btn @click="googleLogin">{{ $t('googlelogin') }}</v-btn>
      </v-card>
      <v-card
        v-else
        class="mx-auto"
        max-width="500"
        outlined
      >
      <v-card-title>
        {{ $t('sing_up') }}
      </v-card-title>
          <v-card-text>
                <v-card-subtitle>{{ $t('example') }}</v-card-subtitle>
              <v-select
                v-model="user.langage"
                item-text="name"
                item-value="val"
                :rules="langageRules"
                :items="langages"
                label="このページを何語で入力しますか？"
                dense
              ></v-select>
              <v-select
                v-model="user.langageLevel"
                item-text="name"
                item-value="val"
                :rules="langageLevelRules"
                :items="langagesLevel"
                label="その言語レベル"
                dense
              ></v-select>

              <v-select
                v-model="user.category"
                item-text="name"
                item-value="val"
                :rules="categoryRules"
                :items="categories"
                label="何語を教えますか？"
                dense
              ></v-select>
              <v-text-field
                v-model="user.summary"
                :rules="summaryRules"
                counter="30"
                label="自己PR等"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                :counter="10"
                label="name"
                required
              ></v-text-field>
              <!-- <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field> -->
              <v-select
                v-model="user.tool"
                item-text="name"
                item-value="name"
                :rules="toolRules"
                :items="tools"
                label="tool"
                multiple
                dense
              ></v-select>
              <v-text-field
                v-model="user.condition"
                :rules="conditionRules"
                counter="30"
                label="希望条件"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.content"
                :rules="contentRules"
                counter="200"
                label="詳細"
                outlined
              ></v-text-field>
              <label class="postImage-appendBtn">
                <input @change="upload" type="file" data-label="画像の添付">
              </label>
          </v-card-text>
        <v-card-actions>
          <v-btn @click="submit()">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      <br>


      </div>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  data() {
    return {
      allUsers: [],
      displayUsers:[],
      file:{
        name:"",
      },
      user: {
        name: '',
        email: '',
        langage:'',
        langageLevel:'',
        summary: '',
        content:'',
        category:'',
        condition:'',
        tool:'',
      },
      icon:'',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      summaryRules: [
        v => !!v || 'Summary is required',
      ],
      contentRules: [
      ],
      langageRules:[
        v => !!v || 'Langage is required',
      ],
      langageLevelRules:[
        v => !!v || 'Langage Level is required',
      ],
      categoryRules:[
        v => !!v || 'Category is required',
      ],
      conditionRules:[
      ],
      toolRules:[
        v => !!v || 'Tool is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      langages: [
        { val: 0, name: '英語' },
        { val: 1, name: '日本語' },
        { val: 2, name: '韓国語' },
        { val: 3, name: '中国語' },
      ],
      langagesLevel: [
        {val:0, name: 'ほとんどわかりません。'},
        {val:1, name: '簡単な挨拶ができるぐらいです'},
        {val:2, name: '簡単なコミュニケーションならとれます'},
        {val:3, name: 'ある程度の日常会話ができます'},
        {val:4, name: 'ほとんど問題なくコミュニケーションが取れます'},
      ],
      categories: [
        { val: 0, name: '英語' },
        { val: 1, name: '日本語' },
        { val: 2, name: '韓国語' },
        { val: 3, name: '中国語' },
      ],
      tools:[
        {name:'zoom'},
        {name:'skype'},
        {name:'line'},
      ]
    }
  },
  mounted() {
    this.getData();

    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
    })
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

          this.displayUsers = this.allUsers.filter(e => e.email == this.user.email)
        })
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      firebase.auth().signOut()
    },
    submit() {
      const db = firebase.firestore()
      const dbUsers = db.collection('users')
      dbUsers
        .add({
          id: "",
          name: this.user.name,
          email: this.user.email,
          langage:this.user.langage,
          langageLevel:this.user.langageLevel,
          category: this.user.category,
          tool: this.user.tool,
          summary: this.user.summary,
          content: this.user.content,
          condition: this.user.condition,
          icon: this.icon,
          count: 0,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          dbUsers.doc(docRef.id).update({
            id: docRef.id
          }).then(() => {
              // success
          }).catch(error => {
          // error
          })
          alert('送信しました')
           this.$router.push({path:'/'})
        })
    },
    upload (p) {
        const file = p.target.files[0]
        const storageRef = firebase.storage().ref('users/' + file.name)
        // 画像をStorageにアップロード
        storageRef.put(file).then(() => {
            // アップロードした画像のURLを取得
            firebase.storage().ref('users/' + file.name).getDownloadURL().then((url) => {
                // アップロードした画像のURLと画像名をDBに保存
                this.icon = url
                console.log(this.icon)
            }).catch((error) => {
                console.log(error)
            })
        })
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
