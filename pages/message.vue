<template>
  <v-container fluid>
    <v-layout justify-center>
        <!-- <ul> -->
          <!-- <li v-for="user in displayUsers" :key="user.id"> -->
            <p>{{user.name}}</p>
          <!-- </li> -->
        <!-- </ul> -->
    </v-layout>
  </v-container>
</template>
<script>
import firebase from '@/plugins/firebase'

export default {
  asyncData() {
    return {
    //   allUsers: [],
    //   displayUsers:[],
    }
  },
  data() {
    return {
      user: {
        name: '',
      }
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    // getData(){
    //   this.allUsers = []
    //   firebase
    //     .firestore()
    //     .collection('users')
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.forEach((doc) => {
    //         this.allUsers.push(doc.data())
    //       })
    //       // this.allUsersLength = this.allUsers.length

    //       this.displayUsers = this.allUsers.filter(e => e.email == this.user.email)
    //       console.log(this.displayUsers)
    //     })
    // },
  }
}
</script>
