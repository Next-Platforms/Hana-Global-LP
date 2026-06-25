// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileMenu.classList.contains('translate-x-full');
      if (isOpen) {
        mobileMenu.classList.add('translate-x-full');
      } else {
        mobileMenu.classList.remove('translate-x-full');
      }
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('translate-x-full');
      }
    });
  }
});
