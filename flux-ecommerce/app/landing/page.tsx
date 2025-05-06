"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronRight, Star, ShoppingCart, Heart, ArrowRight, Check } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image src="/img/hero1.jpeg" alt="Hero Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        </div>

        <motion.div className="container mx-auto px-4 relative z-10 text-center text-white" style={{ opacity, y }}>
          <AnimatePresence>
            {isVisible && (
              <>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Descubre tu estilo con <span className="text-primary">Flux</span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Ropa urbana para los que marcan tendencia. Encuentra las mejores marcas y los diseños más exclusivos.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link
                    href="/products"
                    className="bg-primary text-white border-none py-3 px-8 text-base font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
                  >
                    Ver Colección
                    <ChevronRight size={18} className="ml-2" />
                  </Link>

                  <Link
                    href="/about"
                    className="bg-transparent text-white border-2 border-white py-3 px-8 text-base font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
                  >
                    Conoce Más
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/img/nike-logo.png" alt="Nike" width={100} height={40} />
            </motion.div>
            <motion.div variants={fadeIn} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/img/adidas-logo.png" alt="Adidas" width={100} height={40} />
            </motion.div>
            <motion.div variants={fadeIn} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/img/puma-logo.png" alt="Puma" width={100} height={40} />
            </motion.div>
            <motion.div variants={fadeIn} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/img/reebok-logo.png" alt="Reebok" width={100} height={40} />
            </motion.div>
            <motion.div variants={fadeIn} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/img/new-balance-logo.png" alt="New Balance" width={100} height={40} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="section-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Productos Destacados</h2>
            <p>Descubre nuestras piezas más populares</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/img/AIR+FORCE+1+_07 moño.png"
                  alt="Air Force 1 07"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-500 text-sm ml-1">(42)</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  Air Force 1 07´
                </h3>
                <p className="text-gray-500 text-sm mb-2">Nike</p>
                <p className="text-primary font-bold text-lg">$104.99</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/img/AIR+FORCE+1+LOW+RETRO+QS.png"
                  alt="Air Force 1 Low Retro"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} className="text-gray-300" />
                  <span className="text-gray-500 text-sm ml-1">(28)</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  Air Force 1 Low Retro
                </h3>
                <p className="text-gray-500 text-sm mb-2">Nike</p>
                <p className="text-primary font-bold text-lg">$119.99</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/img/Gazelle_Bold_x_Liberty_London_Shoes_Black_JI2572_01_00_standard.avif"
                  alt="Gazelle Bold Liberty"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-500 text-sm ml-1">(56)</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  Gazelle Bold Liberty
                </h3>
                <p className="text-gray-500 text-sm mb-2">Adidas</p>
                <p className="text-primary font-bold text-lg">$104.99</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/img/adidas_x_MOON_BOOT_Ultraboot_Shoes_Beige_IH2490_01_standard.avif"
                  alt="Adidas UltraBoot"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">-15%</span>
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} className="text-gray-300" />
                  <span className="text-gray-500 text-sm ml-1">(34)</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  Adidas UltraBoot
                </h3>
                <p className="text-gray-500 text-sm mb-2">Adidas</p>
                <p className="text-primary font-bold text-lg">
                  <span className="line-through text-gray-400 text-sm mr-2">$139.99</span>
                  $119.99
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/products"
              className="bg-transparent text-gray-800 border-2 border-gray-800 py-3 px-8 font-semibold rounded-full transition-all duration-300 hover:bg-gray-800 hover:text-white inline-flex items-center"
            >
              Ver Todos los Productos
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/img/about-image.jpg" alt="About Flux" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Nuestra Historia</h3>
                  <p className="text-white/80">Desde 2015 marcando tendencia</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                Sobre Flux
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-primary"></span>
              </h2>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Flux es más que una marca, es un estilo de vida. Fusionamos prendas para aquellos que se atreven a ser
                diferentes y expresar su individualidad a través de la moda urbana.
              </p>

              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Nos adaptamos a tiempos de cambios, a las nuevas generaciones, y por eso te traemos los más exclusivos
                productos de las mejores marcas para que crees tu propio estilo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Calidad Premium</h4>
                    <p className="text-gray-600 text-sm">Materiales de la más alta calidad</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Diseño Exclusivo</h4>
                    <p className="text-gray-600 text-sm">Piezas únicas y limitadas</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Envío Rápido</h4>
                    <p className="text-gray-600 text-sm">A todo el país en 24-48h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Atención Personalizada</h4>
                    <p className="text-gray-600 text-sm">Servicio al cliente 24/7</p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary-dark transition-all duration-300 inline-flex items-center"
              >
                Conoce Más Sobre Nosotros
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="section-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Lo Que Dicen Nuestros Clientes</h2>
            <p>Experiencias reales de compradores satisfechos</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Increíble calidad en todos los productos que he comprado. El servicio al cliente es excepcional y los
                envíos siempre llegan antes de lo esperado."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/img/testimonial-1.jpg"
                    alt="Cliente"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">María García</h4>
                  <p className="text-gray-500 text-sm">Cliente desde 2020</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Las zapatillas que compré son exactamente como se veían en la web. Muy cómodas y de excelente calidad.
                Definitivamente volveré a comprar."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/img/testimonial-2.jpg"
                    alt="Cliente"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Juan Pérez</h4>
                  <p className="text-gray-500 text-sm">Cliente desde 2021</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} className="text-gray-300" />
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Me encanta la variedad de productos y las últimas tendencias que siempre tienen disponibles. La ropa es
                de excelente calidad y el proceso de compra es muy sencillo."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/img/testimonial-3.jpg"
                    alt="Cliente"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Laura Rodríguez</h4>
                  <p className="text-gray-500 text-sm">Cliente desde 2019</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contacto" className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Mantente Conectado</h2>
            <p className="mb-8">
              Suscríbete a nuestro newsletter para recibir las últimas novedades, tendencias y ofertas exclusivas.
            </p>

            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow py-3 px-4 rounded-l-full focus:outline-none text-gray-800"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gray-900 text-white py-3 px-6 rounded-r-full hover:bg-gray-800 transition-colors sm:w-auto w-full"
              >
                Suscribirse
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">¿Listo para renovar tu estilo?</h2>
              <p className="text-gray-300 mb-6">
                Explora nuestra colección y encuentra las prendas que mejor expresan tu personalidad.
              </p>
              <Link
                href="/products"
                className="bg-primary text-white py-3 px-8 rounded-full hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center"
              >
                Comprar Ahora
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>

            <motion.div
              className="md:w-1/3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Ventajas Flux</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-primary/20 p-1 rounded-full mr-3">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>Envío gratuito en pedidos +$99</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/20 p-1 rounded-full mr-3">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>Devoluciones sin costo por 30 días</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/20 p-1 rounded-full mr-3">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>Atención al cliente 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/20 p-1 rounded-full mr-3">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>Descuentos exclusivos para suscriptores</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

