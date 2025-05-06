document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm")
    const signupForm = document.getElementById("signupForm")
    const loginToggle = document.getElementById("loginToggle")
    const signupToggle = document.getElementById("signupToggle")
  
    loginToggle.addEventListener("click", () => {
      loginForm.classList.remove("hidden")
      signupForm.classList.add("hidden")
      loginToggle.classList.add("active")
      signupToggle.classList.remove("active")
    })
  
    signupToggle.addEventListener("click", () => {
      signupForm.classList.remove("hidden")
      loginForm.classList.add("hidden")
      signupToggle.classList.add("active")
      loginToggle.classList.remove("active")
    })
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Aquí iría la lógica de inicio de sesión
      console.log("Iniciar sesión")
    })
  
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Aquí iría la lógica de registro
      console.log("Registrarse")
    })
  })
  
  