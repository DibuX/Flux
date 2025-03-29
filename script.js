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
      // Eliminar clase Active de todos los botones
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Agregar clase Active al boton clickeado
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // 
      if (filter === 'all') {
        productItems.forEach(item => {
          item.style.display = 'block';
        });
      } else {
        // Acá en un futuro habria que cambiar el selector de los productos (que no sea mas random)
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
  
  // Funcionalidad del carrito
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const cartCount = document.querySelector('.cart-count');
  let count = 0;
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      count++;
      cartCount.textContent = count;
      
      // Mostrar Mensaje de añadido al carrito
      const card = this.closest('.card');
      const productName = card.querySelector('.card-title').textContent;
      
      // Crear toast notification
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
      
      // Mostrar toast
      setTimeout(() => {
        toast.classList.add('show');
      }, 100);
      
      // Eliminar toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
      
      // Cerrar toast on click
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      });
    });
  });
  
  // Agregar estilos de notificación a toast
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
  
  // Newsletter form Subscripcion
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email) {
        // En una aplicación real, enviar esto al servidor
        console.log('Subscribed email:', email);
        
        // Limpiar input
        emailInput.value = '';
        
        // Mostrar success message
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
        
        // Mostrar toast
        setTimeout(() => {
          toast.classList.add('show');
        }, 100);
        
        // Eliminar toast despues de 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
        
        // Cerrar toast on click
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