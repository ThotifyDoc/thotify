import { isUserLoggedIn, logout } from './src/scripts/firebase.js';
document.addEventListener('DOMContentLoaded', () => {

  isUserLoggedIn().then((isAuthenticated) => {

    if (isAuthenticated) {
      const sidebar = document.querySelector('.top-level');
      if (sidebar) {
        const protectedItems = `
          <li>
            <span style='color:white; font-weight:semi-bold; margin-left:0.9vw'>Admin</span>
            <ul style='list-style-type: none;'>
              <li>
                <a style='text-decoration:none;' href="/thotify/admin/grilles/intro">Grilles de correction</a>
              </li>
            </ul>
          </li>
          <li>
            <button id='logoutButton'>Déconnecter</button>
          </li>    
        `;
        sidebar.insertAdjacentHTML('beforeend', protectedItems);

        const logoutButton = document.querySelector('#logoutButton');
        if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logout();
            
        });
        }
      }

      
    }
  });
});
