// login.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJET_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSENGER_ID,
  appId: import.meta.env.PUBLIC_API_ID,
  measurementId: import.meta.env.PUBLIC_MESURMENT_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if( userCredential.user ){
        localStorage.setItem('firebase',  userCredential.user.accessToken )
      }

      alert('Connexion réussie !');
      
    } catch (error) {

      console.error('Erreur de connexion:', error);

      alert('Erreur lors de la connexion.');

    }
  });
});
