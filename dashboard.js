// ✅ Fully Static Dashboard
document.addEventListener('DOMContentLoaded', function () {

  // --- Default static user info ---
  const user = { 
    name: 'Faculty User',
    department: 'IT Department'
  };

  // --- Display user info ---
  const userName = document.getElementById('userName');
  const greeting = document.getElementById('greeting');
  const userRole = document.querySelector('.user-role');

  if (userName) userName.textContent = user.name;
  if (greeting) greeting.textContent = `Hi, ${user.name}!`;
  if (userRole) userRole.textContent = user.department;

  // --- Show static local avatar image ---
  const avatar = document.querySelector('.avatar');
  if (avatar) {
    avatar.src = 'images/user.png';  // ✅ Use your actual image path
    avatar.alt = 'User Avatar';
  }

  // --- Display current date ---
  const dateElem = document.getElementById('currentDate');
  if (dateElem) {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    });
    dateElem.textContent = currentDate;
  }

  // --- Logout button (just a static redirect) ---
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../auth/login.html';
      }
    });
  }

  // --- Notification button (optional) ---
  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', function () {
      window.location.href = 'notifications.html';
    });
  }

  // --- Simple Search Logging (optional) ---
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      console.log('Searching for:', searchTerm);
    });
  }
});
