import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCENQxKUF8r4B_H7-rbGQk3QUXgl-7vXp0",
  authDomain: "coderpadclone.firebaseapp.com",
  databaseURL: "https://coderpadclone.firebaseio.com",
  projectId: "coderpadclone",
  storageBucket: "coderpadclone.appspot.com",
  messagingSenderId: "323783964629"
};
const fire = firebase.initializeApp(config);
export default fire;
