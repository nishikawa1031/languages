<template>
  <v-container fluid>
    <v-layout justify-center>
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
            <v-text-field
              v-model="user.name"
              :rules="nameRules"
              :counter="10"
              label="name"
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
              label="教えることのできる言語"
              dense
            ></v-select>
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
              v-model="user.summary"
              :rules="summaryRules"
              counter="30"
              label="自己PR等"
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
      <v-layout justify-center>
        <v-btn v-if="isLogin" @click="logOut">Logout</v-btn>

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
      categories: [
        { code: '01', name: '英語' },
        { code: '02', name: '日本語' },
        { code: '03', name: '韓国語' },
        { code: '04', name: '中国語' },
      ],
      tools:[
        {name:'zoom'},
        {name:'skype'},
        {name:'line'},
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
          id: "",
          name: this.user.name,
          email: this.user.email,
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
