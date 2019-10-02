import * as Firebase from 'firebase/app'
import 'firebase/firestore'

const  firebaseConfig = {
  apiKey: "AIzaSyBfXzYv-T2dUpDDCWgpST_eF_MuQWYzZFc",
  authDomain: "vuexeasyfirestoretroubleshoot.firebaseapp.com",
  databaseURL: "https://vuexeasyfirestoretroubleshoot.firebaseio.com",
  projectId: "vuexeasyfirestoretroubleshoot",
  storageBucket: "vuexeasyfirestoretroubleshoot.appspot.com",
  messagingSenderId: "1028085654256",
  appId: "1:1028085654256:web:703890a57ebfa87d"
};

function initFirebase () {
  Firebase.initializeApp(firebaseConfig)
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

export { Firebase, initFirebase }