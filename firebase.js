
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARJOzWUYWy85e66wHYCpDE8gy-MD8tbCw",
    authDomain: "to-do-app-94eb5.firebaseapp.com",
    projectId: "to-do-app-94eb5",
    storageBucket: "to-do-app-94eb5.appspot.com",
    messagingSenderId: "464573827596",
    appId: "1:464573827596:web:d4c740d213da104a783c29",
    measurementId: "G-Y72VFNG4WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
        