

document.addEventListener('DOMContentLoaded', () => {

  const isAuthenticated = localStorage.getItem('firebase') ? true : false;
  

  if (isAuthenticated) {
    
      const sidebar = document.querySelector('.top-level');
      if (sidebar) {
        
          const protectedItems = `
            <li>
                <span style='color:white; font-aweight:semi-bold; margin-left:0.9vw'>Admin</span>
                <ul style='list-style-type: none;'>
                    <li>
                        <a  style='text-decoration:none;' href="/thotify/admin/grilles/intro">Grilles de correction</a>
                    </li>
                </ul>
            </li>
          `;
          sidebar.insertAdjacentHTML('beforeend', protectedItems);
      }
  }
});
