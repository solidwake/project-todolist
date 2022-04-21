const firebaseConfig = {
    apiKey: "AIzaSyARJOzWUYWy85e66wHYCpDE8gy-MD8tbCw",
    authDomain: "to-do-app-94eb5.firebaseapp.com",
    projectId: "to-do-app-94eb5",
    storageBucket: "to-do-app-94eb5.appspot.com",
    messagingSenderId: "464573827596",
    appId: "1:464573827596:web:d4c740d213da104a783c29",
    measurementId: "G-1SWDSLECC3"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();