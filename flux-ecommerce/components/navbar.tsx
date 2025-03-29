"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth, useCart } from "@/app/providers"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react"

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { cartCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <header>
      <nav className={`navbar fixed top-0 left-0 w-full z-50 ${isScrolled ? "scrolled" : ""}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="logo-text">FLUX</span>
            <span className="logo-dot">.</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-800 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-1">
              <li className="relative group">
                <Link href="/products?category=hombres" className="nav-link">
                  Hombres
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link
                      href="/products?category=hombres&subcategory=zapatillas"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Zapatillas
                    </Link>
                    <Link
                      href="/products?category=hombres&subcategory=ropa"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ropa
                    </Link>
                    <Link
                      href="/products?category=hombres&subcategory=accesorios"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accesorios
                    </Link>
                    <hr className="my-1" />
                    <Link
                      href="/products?category=hombres"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ver Todo
                    </Link>
                  </div>
                </div>
              </li>
              <li className="relative group">
                <Link href="/products?category=mujeres" className="nav-link">
                  Mujeres
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link
                      href="/products?category=mujeres&subcategory=zapatillas"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Zapatillas
                    </Link>
                    <Link
                      href="/products?category=mujeres&subcategory=ropa"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ropa
                    </Link>
                    <Link
                      href="/products?category=mujeres&subcategory=accesorios"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accesorios
                    </Link>
                    <hr className="my-1" />
                    <Link
                      href="/products?category=mujeres"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ver Todo
                    </Link>
                  </div>
                </div>
              </li>
              <li className="relative group">
                <Link href="/products?category=ninos" className="nav-link">
                  Niños
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link
                      href="/products?category=ninos&subcategory=zapatillas"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Zapatillas
                    </Link>
                    <Link
                      href="/products?category=ninos&subcategory=ropa"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ropa
                    </Link>
                    <Link
                      href="/products?category=ninos&subcategory=accesorios"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accesorios
                    </Link>
                    <hr className="my-1" />
                    <Link
                      href="/products?category=ninos"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ver Todo
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/products?sale=true" className="nav-link">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/products?new=true" className="nav-link new-arrivals">
                  Nuevas Llegadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Search and Icons */}
          <div className="hidden lg:flex items-center">
            <form onSubmit={handleSearch} className="search-container">
              <input
                type="search"
                placeholder="Buscar..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <Search size={18} />
              </button>
            </form>
            <div className="nav-icons">
              <div className="relative">
                <button onClick={toggleUserMenu} className="nav-icon">
                  <User size={20} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {user ? (
                        <>
                          <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Mi Cuenta
                          </Link>
                          <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Mis Pedidos
                          </Link>
                          <button
                            onClick={() => signOut()}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Cerrar Sesión
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Iniciar Sesión
                          </Link>
                          <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Registrarse
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/favorites" className="nav-icon">
                <Heart size={20} />
              </Link>
              <Link href="/cart" className="nav-icon cart-icon">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="cart-count">
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white"
            >
              <div className="container mx-auto px-4 py-3">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Buscar..."
                      className="w-full bg-gray-100 rounded-full py-2 px-4 pr-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Search size={18} />
                    </button>
                  </div>
                </form>
                <ul className="space-y-3">
                  <li>
                    <Link href="/products?category=hombres" className="block py-2 text-gray-800 font-medium">
                      Hombres
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=mujeres" className="block py-2 text-gray-800 font-medium">
                      Mujeres
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=ninos" className="block py-2 text-gray-800 font-medium">
                      Niños
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?sale=true" className="block py-2 text-gray-800 font-medium">
                      Ofertas
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?new=true" className="block py-2 text-gray-800 font-medium">
                      Nuevas Llegadas
                    </Link>
                  </li>
                </ul>
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <Link href="/favorites" className="flex items-center text-gray-800">
                    <Heart size={20} className="mr-2" />
                    <span>Favoritos</span>
                  </Link>
                  <Link href="/cart" className="flex items-center text-gray-800">
                    <ShoppingCart size={20} className="mr-2" />
                    <span>Carrito</span>
                    {cartCount > 0 && (
                      <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link href={user ? "/account" : "/login"} className="flex items-center text-gray-800">
                    <User size={20} className="mr-2" />
                    <span>{user ? "Cuenta" : "Ingresar"}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

