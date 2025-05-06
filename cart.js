document.addEventListener("DOMContentLoaded", () => {
  // Get all quantity buttons and inputs
  const decreaseBtns = document.querySelectorAll(".quantity-btn.decrease")
  const increaseBtns = document.querySelectorAll(".quantity-btn.increase")
  const quantityInputs = document.querySelectorAll(".quantity-input")
  const removeItemBtns = document.querySelectorAll(".remove-item-btn")
  const cartItems = document.querySelectorAll(".cart-item")
  const emptyCartMessage = document.querySelector(".empty-cart-message")
  const cartItemsContainer = document.querySelector(".cart-items-container")
  const cartCount = document.querySelector(".cart-count")

  // Initialize cart count
  updateCartCount()

  // Agregar event listeners a los botones de disminuir
  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.nextElementSibling
      const value = Number.parseInt(input.value)
      if (value > 1) {
        input.value = value - 1
        updateItemTotal(input)
        updateOrderSummary()
      }
    })
  })

  // Agregar event listeners a los botones de aumentar
  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.previousElementSibling
      const value = Number.parseInt(input.value)
      if (value < 10) {
        input.value = value + 1
        updateItemTotal(input)
        updateOrderSummary()
      }
    })
  })

  // Agregar event listeners a los inputs de cantidad
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const value = Number.parseInt(this.value)
      if (isNaN(value) || value < 1) {
        this.value = 1
      } else if (value > 10) {
        this.value = 10
      }
      updateItemTotal(this)
      updateOrderSummary()
    })
  })

  // Agregar event listeners a los botones de eliminar
  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item")
      cartItem.classList.add("fade-out")

      setTimeout(() => {
        cartItem.remove()
        updateOrderSummary()
        updateCartCount()

        // Verificar si el carrito está vacío
        if (document.querySelectorAll(".cart-item").length === 0) {
          showEmptyCartMessage()
        }
      }, 300)
    })
  })

  // Función para actualizar el total del artículo
  function updateItemTotal(input) {
    const cartItem = input.closest(".cart-item")
    const priceElement = cartItem.querySelector(".cart-item-price p")
    const totalElement = cartItem.querySelector(".cart-item-total p")

    let price = priceElement.textContent
    // Manejar precios con descuento
    if (price.includes("$")) {
      price = price.split("$").pop()
    }

    const quantity = Number.parseInt(input.value)
    const itemPrice = Number.parseFloat(price)
    const total = (quantity * itemPrice).toFixed(2)

    totalElement.textContent = `$${total}`
  }

  // Función para actualizar el resumen del pedido
  function updateOrderSummary() {
    let subtotal = 0
    const cartItems = document.querySelectorAll(".cart-item")

    cartItems.forEach((item) => {
      const totalText = item.querySelector(".cart-item-total p").textContent
      const total = Number.parseFloat(totalText.replace("$", ""))
      subtotal += total
    })

    // Descuento fijo para demostración
    const taxes = (subtotal * 0.1).toFixed(2) // 10% tax for demo
    const total = (subtotal - discount + Number.parseFloat(taxes)).toFixed(2)

    // Update summary values
    document.querySelector(".summary-item:nth-child(1) span:last-child").textContent = `$${subtotal.toFixed(2)}`
    document.querySelector(".summary-item:nth-child(3) span:last-child").textContent =
      subtotal >= 99 ? "Gratis" : "$9.99"
    document.querySelector(".summary-item:nth-child(4) span:last-child").textContent = `$${taxes}`
    document.querySelector(".summary-total span:last-child").textContent = `$${total}`
  }

  // Función para mostrar el mensaje de carrito vacío
  function showEmptyCartMessage() {
    emptyCartMessage.style.display = "block"
  }

  // Función para actualizar el conteo del carrito
  function updateCartCount() {
    const count = document.querySelectorAll(".cart-item").length
    cartCount.textContent = count

    // Si el carrito está vacío, mostrar mensaje de carrito vacío
    if (count === 0) {
      showEmptyCartMessage()
    }
  }

  // Back to top button funcionalidad
  const backToTopBtn = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
})

