import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBJq7oA33bsLN9rQ9_rKizTRRHl0BPqUuE",
    authDomain: "katekyo-1f493.firebaseapp.com",
    databaseURL: "https://katekyo-1f493.firebaseio.com",
    projectId: "katekyo-1f493",
    storageBucket: "katekyo-1f493.appspot.com",
    messagingSenderId: "187464010652",
    appId: "1:187464010652:web:aa0145eccf3782989e9659",
    measurementId: "G-QQ0C1F4FEJ"
  })
}

export default firebase
