// firebaseAuth.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

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

const logout = async () => {
  try {
    await signOut(auth);
    window.history.back(); 
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

const isUserLoggedIn = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true); // Utilisateur connecté
      } else {
        resolve(false); // Aucun utilisateur connecté
      }
    });
  });
};

export { auth, logout, isUserLoggedIn };

