import { auth } from '../../src/scripts/firebase.js';

import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#loginForm');

  if (form) {

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.history.back();
        
      } catch (error) {
        alert('Erreur lors de la connexion.');
      }
    });

  } 
});
