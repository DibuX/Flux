import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="footer-about">
              <Link href="/" className="footer-logo">
                <span className="logo-text text-white">FLUX</span>
                <span className="logo-dot">.</span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                Somos una tienda de moda comprometida con la calidad y el estilo. Ofrecemos las mejores marcas a precios
                competitivos, con un servicio al cliente excepcional.
              </p>
              <div className="social-links flex gap-3 mt-6">
                <a href="#" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="Youtube">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h5 className="footer-title">Comprar</h5>
            <ul className="footer-links">
              <li>
                <Link href="/products?category=hombres">Hombres</Link>
              </li>
              <li>
                <Link href="/products?category=mujeres">Mujeres</Link>
              </li>
              <li>
                <Link href="/products?category=ninos">Niños</Link>
              </li>
              <li>
                <Link href="/products?category=accesorios">Accesorios</Link>
              </li>
              <li>
                <Link href="/products?new=true">Nuevas Llegadas</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="footer-title">Información</h5>
            <ul className="footer-links">
              <li>
                <Link href="/about">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/contact">Contacto</Link>
              </li>
              <li>
                <Link href="/terms">Términos y Condiciones</Link>
              </li>
              <li>
                <Link href="/privacy">Política de Privacidad</Link>
              </li>
              <li>
                <Link href="/faq">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="footer-title">Mi Cuenta</h5>
            <ul className="footer-links">
              <li>
                <Link href="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link href="/cart">Ver Carrito</Link>
              </li>
              <li>
                <Link href="/favorites">Lista de Deseos</Link>
              </li>
              <li>
                <Link href="/orders">Seguir Pedido</Link>
              </li>
              <li>
                <Link href="/help">Ayuda</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Nicolás Roggiano. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="American Express" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

