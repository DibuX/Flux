document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Animación simple para los productos
    const productos = document.querySelectorAll(".producto")
    productos.forEach((producto) => {
      producto.addEventListener("mouseenter", () => {
        producto.style.transform = "scale(1.05)"
      })
      producto.addEventListener("mouseleave", () => {
        producto.style.transform = "scale(1)"
      })
    })
  
    // Manejo del formulario de newsletter
    const form = document.getElementById("newsletter-form")
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      alert(`Gracias por suscribirte con el email: ${email}`)
      this.reset()
    })
  })
  
  