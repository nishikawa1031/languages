<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-card
        v-if="isWaiting"
        class="mx-auto"
        max-width="500"
        outlined
      >
        <p>読み込み中</p>
      </v-card>
      <div v-else>
      <v-card
        v-if="!isLogin"
        class="mx-auto"
        max-width="500"
        outlined
      >
              <v-btn @click="googleLogin">Googleアカウントでログイン</v-btn>
      </v-card>
      <v-card
        v-else
        class="mx-auto"
        max-width="500"
        outlined
      >
          <v-card-text>
              名前、メールアドレス、指導可能科目、経歴・自己PR等を入力してください。
            <v-text-field
              v-model="user.name"
              :rules="nameRules"
              :counter="10"
              label="お名前"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-select
              v-model="user.category"
              item-text="name"
              item-value="name"
              :rules="categoryRules"
              :items="categories"
              label="カテゴリー"
              dense
            ></v-select>
            <v-text-field
              v-model="user.summary"
              :rules="summaryRules"
              counter="30"
              label="略歴"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="user.content"
              :rules="contentRules"
              counter="200"
              label="経歴・自己PR等"
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
      <v-layout justify-center>
        <v-btn v-if="isLogin" @click="logOut">ログアウト</v-btn>

      </v-layout>
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
      file:{
        name:"",
      },
      user: {
        name: '',
        email: '',
        summary: '',
        content:'',
        category:'',
      },
      icon:'',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      summaryRules: [
        v => !!v || 'Summary is required',
      ],
      contentRules: [
        // v => !!v || 'Content is required',
      ],
      categoryRules:[
        v => !!v || 'Category is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      categories: [
        { code: '01', name: '英語' },
        { code: '02', name: '国語' },
        { code: '03', name: '数学' },
        { code: '04', name: '理科' },
        { code: '03', name: '社会' },
      ]
    }
  },
  mounted() {
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
          name: this.user.name,
          email: this.user.email,
          category: this.user.category,
          summary: this.user.summary,
          content: this.user.content,
          icon: this.icon,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((ref) => {
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
