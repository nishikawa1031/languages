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
                      {{user.language}}のレベル:{{user.languageLevel}}
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
                    @click="edit(user);"
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
                v-model="user.language"
                item-text="name"
                item-value="val"
                :rules="languageRules"
                :items="$t('language.items')"
                :label="$t('language.label')"
                dense
              ></v-select>
              <v-select
                v-model="user.languageLevel"
                item-text="name"
                item-value="val"
                :rules="languageLevelRules"
                :items="$t('languageLevel.items')"
                :label="$t('languageLevel.label')"
                dense
              ></v-select>

              <v-select
                v-model="user.category"
                item-text="name"
                item-value="val"
                :rules="categoryRules"
                :items="$t('language.items')"
                :label="$t('whatlanguageYotTeach')"
                dense
              ></v-select>
              <v-text-field
                v-model="user.summary"
                :rules="summaryRules"
                counter="30"
                :label="$t('summary')"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                :counter="10"
                :label="$t('name')"
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
                :label="$t('tool')"
                multiple
                dense
              ></v-select>
              <v-text-field
                v-model="user.condition"
                :rules="conditionRules"
                counter="30"
                :label="$t('condition')"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.content"
                :rules="contentRules"
                counter="200"
                :label="$t('detail')"
                outlined
              ></v-text-field>
              <label class="postImage-appendBtn">
                <input @change="upload" type="file" :data-label="$t('picture')">
              </label>
          </v-card-text>
        <v-card-actions>
          <v-btn @click="submit()">
            {{$t('submit')}}
          </v-btn>
        </v-card-actions>
      </v-card>
      <br>
        <v-dialog
          v-model="dialog"
        >
          <v-card>
            <v-card-title class="title">{{selectedUser.name}}{{ $t('editTitle') }}</v-card-title>
          <v-card-text>
              <v-select
                v-model="user.language"
                item-text="name"
                item-value="val"
                :rules="languageRules"
                :items="$t('language.items')"
                :label="$t('language.label')"
                dense
              ></v-select>
              <v-select
                v-model="user.languageLevel"
                item-text="name"
                item-value="val"
                :rules="languageLevelRules"
                :items="$t('languageLevel.items')"
                :label="$t('languageLevel.label')"
                dense
              ></v-select>

              <v-select
                v-model="user.category"
                item-text="name"
                item-value="val"
                :rules="categoryRules"
                :items="$t('language.items')"
                :label="$t('whatlanguageYotTeach')"
                dense
              ></v-select>
              <v-text-field
                v-model="user.summary"
                :rules="summaryRules"
                counter="30"
                :label="$t('summary')"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                :counter="10"
                :label="$t('name')"
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
                :label="$t('tool')"
                multiple
                dense
              ></v-select>
              <v-text-field
                v-model="user.condition"
                :rules="conditionRules"
                counter="30"
                :label="$t('condition')"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.content"
                :rules="contentRules"
                counter="200"
                :label="$t('detail')"
                outlined
              ></v-text-field>
              <label class="postImage-appendBtn">
                <input @change="upload" type="file" :data-label="$t('picture')">
              </label>
          </v-card-text>
        <v-card-actions>
          <v-btn @click="submit()">
            {{$t('submit')}}
          </v-btn>
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
        </v-dialog>

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
      selectedUser:'',
      file:{
        name:"",
      },
      user: {
        name: '',
        email: '',
        language:'',
        languageLevel:'',
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
      languageRules:[
        v => !!v || 'language is required',
      ],
      languageLevelRules:[
        v => !!v || 'language Level is required',
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
      tools:[
        {name:'zoom'},
        {name:'skype'},
        {name:'line'},
      ],
      dialog: false,
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
          language:this.user.language,
          languageLevel:this.user.languageLevel,
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
    },
    edit(user){
      this.selectedUser = user
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
