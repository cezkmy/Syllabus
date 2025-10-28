document.addEventListener('DOMContentLoaded', function () {
  console.log("📢 Static notifications page loaded");

  // --- Mark All as Read ---
  const markAllBtn = document.getElementById('markAllRead');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', function () {
      const unreadCards = document.querySelectorAll('.notification-card.unread');
      unreadCards.forEach(card => {
        card.classList.remove('unread');
      });

      // Update badge
      const badge = document.getElementById('notifBadge');
      if (badge) {
        badge.textContent = '0';
        badge.style.display = 'none';
      }

      // Hide the button after all are marked read
      this.style.display = 'none';

      console.log("✅ All notifications marked as read");
    });
  }

  // --- Individual Notification Click ---
  const notifCards = document.querySelectorAll('.notification-card');
  notifCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // Skip if user clicked an action link
      if (e.target.classList.contains('notif-action')) return;

      // Mark as read
      this.classList.remove('unread');

      // Update badge count
      updateBadgeCount();
    });
  });

  // --- Initialize badge count ---
  updateBadgeCount();
});


// ✅ Helper: Update the unread badge
function updateBadgeCount() {
  const unreadCount = document.querySelectorAll('.notification-card.unread').length;
  const badge = document.getElementById('notifBadge');
  const markAllBtn = document.getElementById('markAllRead');

  // Update badge
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'block' : 'none';
  }

  // Show/hide “Mark All as Read” button
  if (markAllBtn) {
    markAllBtn.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  console.log(`🔔 Unread count: ${unreadCount}`);
}
