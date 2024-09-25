// checkAuth.js
import { isUserLoggedIn } from './firebase.js';

isUserLoggedIn().then((isLoggedIn) => {
    
    const contentContainer = document.getElementById('content-container');
    const loading = document.getElementById('loading');

    if (!isLoggedIn) {
        loading.innerHTML = '<p>Content protected...</p>';
        window.history.back();
    } else {
        loading.style.display = 'none';
        contentContainer.style.display = 'block';
    }
});
