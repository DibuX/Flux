// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Product filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // For demo purposes, we're just showing/hiding items randomly
      // In a real application, you would filter based on product categories
      if (filter === 'all') {
        productItems.forEach(item => {
          item.style.display = 'block';
        });
      } else {
        // This is just for demo - in a real app you would check product categories
        productItems.forEach(item => {
          const random = Math.random();
          if (random > 0.5) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });
  
  // Add to cart functionality
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const cartCount = document.querySelector('.cart-count');
  let count = 0;
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      count++;
      cartCount.textContent = count;
      
      // Show added to cart message
      const card = this.closest('.card');
      const productName = card.querySelector('.card-title').textContent;
      
      // Create toast notification
      const toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.innerHTML = `
        <div class="toast-content">
          <i class="fa-solid fa-check-circle"></i>
          <div class="toast-message">
            <span>${productName}</span> añadido al carrito
          </div>
        </div>
        <i class="fa-solid fa-xmark toast-close"></i>
      `;
      
      document.body.appendChild(toast);
      
      // Show toast
      setTimeout(() => {
        toast.classList.add('show');
      }, 100);
      
      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
      
      // Close toast on click
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      });
    });
  });
  
  // Add toast notification styles
  const style = document.createElement('style');
  style.textContent = `
    .toast-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: white;
      color: #333;
      padding: 15px 20px;
      border-radius: 4px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 9999;
      min-width: 300px;
    }
    
    .toast-notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .toast-content {
      display: flex;
      align-items: center;
    }
    
    .toast-content i {
      color: #28a745;
      font-size: 20px;
      margin-right: 15px;
    }
    
    .toast-message span {
      font-weight: 600;
    }
    
    .toast-close {
      cursor: pointer;
      color: #6c757d;
    }
  `;
  document.head.appendChild(style);
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email) {
        // In a real application, you would send this to your server
        console.log('Subscribed email:', email);
        
        // Clear input
        emailInput.value = '';
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
          <div class="toast-content">
            <i class="fa-solid fa-check-circle"></i>
            <div class="toast-message">
              ¡Gracias por suscribirte a nuestro newsletter!
            </div>
          </div>
          <i class="fa-solid fa-xmark toast-close"></i>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
          toast.classList.add('show');
        }, 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
        
        // Close toast on click
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', function() {
          toast.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        });
      }
    });
  }
});
  
  