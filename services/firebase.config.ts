// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Firestore, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyD0EVvAWyBPvN4zmjwiZdhCKlxARV00VnY',
   authDomain: 'game-list-4b592.firebaseapp.com',
   projectId: 'game-list-4b592',
   storageBucket: 'game-list-4b592.appspot.com',
   messagingSenderId: '537999302384',
   appId: '1:537999302384:web:bca18f2778e9e072446c35',
   measurementId: 'G-W4MM4PBVD3',
};

let firestore: Firestore;
let analytics: Analytics;

// Initialize Firebase
if (firebaseConfig) {
   const app = initializeApp(firebaseConfig);

   if (app.name && typeof window !== 'undefined') {
      analytics = getAnalytics(app);
   }

   firestore = getFirestore(app);
}

export { firestore, analytics };
