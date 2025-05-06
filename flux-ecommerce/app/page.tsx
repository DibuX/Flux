import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import Image from "next/image"
import { Truck, RotateCcw, Shield, Headphones } from "lucide-react"

// Datos de ejemplo para la página principal
const featuredProducts = [
  {
    id: 1,
    name: "4DFWD Shoes",
    brand: "Adidas",
    price: 129.99,
    image_url: "/img/4DFWD_4_Shoes_Black_JI1452_01_00_standard.avif",
    rating: 4.0,
    review_count: 24,
    is_new: true,
  },
  {
    id: 2,
    name: "Adiclog Shoes",
    brand: "Adidas",
    price: 99.99,
    image_url: "/img/Adiclog_Shoes_Black_JH5498_01_00_standard.avif",
    rating: 4.5,
    review_count: 42,
  },
  {
    id: 3,
    name: "Essentials Joggers",
    brand: "Adidas",
    price: 59.99,
    original_price: 74.99,
    image_url: "/img/Essentials_Fleece_Loose_Joggers_Green_JC8991_21_model.avif",
    rating: 5.0,
    review_count: 18,
    is_sale: true,
    discount_percentage: 20,
  },
  {
    id: 4,
    name: "Gazelle Shoes",
    brand: "Adidas",
    price: 99.99,
    image_url: "/img/Gazelle_Bold_x_Liberty_London_Shoes_Black_JI2572_01_00_standard.avif",
    rating: 3.0,
    review_count: 7,
  },
  {
    id: 5,
    name: "Air Force 1 07",
    brand: "Nike",
    price: 109.99,
    image_url: "/img/AIR+FORCE+1+_07.png",
    rating: 5.0,
    review_count: 126,
    is_featured: true,
  },
  {
    id: 6,
    name: "Custom Air Force 1 Low",
    brand: "Nike",
    price: 249.99,
    image_url: "/img/custom-nike-air-force-1-low-by-you-shoes.png",
    rating: 4.5,
    review_count: 84,
    is_featured: true,
  },
  {
    id: 7,
    name: "TLRD Impact Training Bra",
    brand: "Adidas",
    price: 79.99,
    image_url: "/img/TLRD_Impact_Training_High_Support_Bra_Pink_JI8039_21_model.avif",
    rating: 4.0,
    review_count: 31,
  },
  {
    id: 8,
    name: "Adidas Minnie Crew Set",
    brand: "Adidas",
    price: 169.99,
    image_url: "/img/adidas_Disney_Minnie_Mouse_Crew_Set_Black_JD0583_01_laydown.avif",
    rating: 5.0,
    review_count: 47,
    is_new: true,
  },
]

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="/img/publicidad-zapas.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">NUEVA COLECCIÓN</h1>
            <p className="text-xl md:text-2xl mb-8">Descubre lo último en moda y estilo</p>
            <Link href="/products" className="hero-btn inline-block">
              Comprar Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2>Categorías Destacadas</h2>
            <p>Explora nuestras colecciones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="category-card">
              <Image
                src="/img/Adicolor_Classics_SST_Track_Jacket_Brown_JP2519_21_model.avif"
                alt="Ropa"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="category-overlay">
                <h3>Ropa</h3>
                <Link href="/products?category=ropa" className="btn category-btn">
                  Ver Colección
                </Link>
              </div>
            </div>

            <div className="category-card">
              <Image
                src="/img/Gazelle_Indoor_Shoes_Blue_IF9643_01_standard.avif"
                alt="Calzado"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="category-overlay">
                <h3>Calzado</h3>
                <Link href="/products?category=calzado" className="btn category-btn">
                  Ver Colección
                </Link>
              </div>
            </div>

            <div className="category-card">
              <Image
                src="/img/adidas_Disney_Minnie_Mouse_Crew_Set_Black_JD0583_01_laydown.avif"
                alt="Niños"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="category-overlay">
                <h3>Niños</h3>
                <Link href="/products?category=ninos" className="btn category-btn">
                  Ver Colección
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2>Productos Destacados</h2>
            <p>Lo más vendido esta temporada</p>

            <div className="filter-tabs mt-8">
              <button className="filter-btn active" data-filter="all">
                Todos
              </button>
              <button className="filter-btn" data-filter="hombres">
                Hombres
              </button>
              <button className="filter-btn" data-filter="mujeres">
                Mujeres
              </button>
              <button className="filter-btn" data-filter="ninos">
                Niños
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="view-all-btn inline-block">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-item">
              <Truck size={40} className="mx-auto mb-4 text-primary" />
              <h4>Envío Gratis</h4>
              <p>En pedidos superiores a $99</p>
            </div>

            <div className="feature-item">
              <RotateCcw size={40} className="mx-auto mb-4 text-primary" />
              <h4>Devoluciones</h4>
              <p>30 días para cambios</p>
            </div>

            <div className="feature-item">
              <Shield size={40} className="mx-auto mb-4 text-primary" />
              <h4>Pago Seguro</h4>
              <p>Transacciones protegidas</p>
            </div>

            <div className="feature-item">
              <Headphones size={40} className="mx-auto mb-4 text-primary" />
              <h4>Soporte 24/7</h4>
              <p>Atención al cliente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-3xl font-bold mb-4">Suscríbete a nuestro Newsletter</h3>
              <p className="text-gray-300">
                Recibe las últimas novedades y ofertas exclusivas directamente en tu correo.
              </p>
            </div>

            <div className="md:w-1/2">
              <form className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-grow py-3 px-4 rounded-l-full focus:outline-none text-gray-800"
                  required
                />
                <button type="submit" className="newsletter-btn mt-3 sm:mt-0">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to Top Button */}
      <a href="#" className="back-to-top" id="backToTop">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </main>
  )
}

