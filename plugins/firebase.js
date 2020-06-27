import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDJIqFooelZUSuuWrs5DrkNo4Q4PJFk0MM",
    authDomain: "langages-2d6f1.firebaseapp.com",
    databaseURL: "https://langages-2d6f1.firebaseio.com",
    projectId: "langages-2d6f1",
    storageBucket: "langages-2d6f1.appspot.com",
    messagingSenderId: "987364514834",
    appId: "1:987364514834:web:0d0ed6c771907d8af84ccb",
    measurementId: "G-VD9F1NWP0R"
  })
}

export default firebase
