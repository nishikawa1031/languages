<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-card>
        <v-row>
          <div v-if="isWaiting">
            <p>読み込み中</p>
          </div>
          <div v-else>
            <div v-if="!isLogin">
              <v-btn @click="googleLogin">ログイン</v-btn>
            </div>
            <div v-else>
              <!-- <v-row>
                <p>{{ user.email }}でログイン中</p>
              </v-row> -->
              <v-row>
                <v-btn @click="logOut">ログアウト</v-btn>
              </v-row>
              <v-row>
                名前、メールアドレス、指導可能科目、自己PRを入力してください。
              </v-row>
              <v-row>
                <label>
                  <span>
                    お名前:
                  </span>
                  <input v-model="user.name" type="text" />
                </label>
              </v-row>
              <v-row>
                <label>
                  <span>
                    email:
                  </span>
                  <input v-model="user.email" type="text" />
                </label>
              </v-row>
              <v-row>
                <v-select
                  v-model="user.category"
                  item-text="name"
                  item-value="code"
                  :items="categories"
                  label="カテゴリー"
                  dense
                ></v-select>
              </v-row>
              <v-row>
                <label>
                  <span>
                    自己PR:
                  </span>
                  <input v-model="user.summary" type="text" />
                </label>
              </v-row>
              <v-row>
                <v-btn @click="submit()">
                  Submit
                </v-btn>
              </v-row>
            </div>
          </div>
        </v-row>
      </v-card>
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
      user: {
        name: '',
        email: '',
        summary: ''
      },
      categories: [
        { code: '01', name: '英語' },
        { code: '02', name: '数学' },
        { code: '03', name: '理科' }
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
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((ref) => {
          alert('送信しました')
          //  console.log('Add ID: ', ref.id)
        })
    }
  }
}
</script>
