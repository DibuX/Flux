"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, ChevronRight, Truck, Shield } from "lucide-react"
import { useCart, useToast } from "@/app/providers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart, cartTotal, isCartLoading } = useCart()
  const { showToast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Checkout form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      showToast("¡Pedido realizado con éxito!", "success")
      clearCart()
      setIsCheckingOut(false)
      setIsProcessing(false)
    }, 2000)
  }

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  if (isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20 mb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-2">Tu Carrito</h1>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-primary font-medium">Carrito</span>
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <ShoppingBag size={80} className="text-gray-300" />
            </motion.div>
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Tu carrito está vacío
            </motion.h2>
            <motion.p
              className="text-gray-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Parece que aún no has añadido productos a tu carrito.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link
                href="/products"
                className="bg-primary text-white py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center"
              >
                Explorar Productos
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <motion.div className="lg:w-2/3" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div className="bg-white rounded-lg shadow-md overflow-hidden" variants={itemVariants}>
                <div className="p-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-xl font-semibold">Productos ({cartItems.length})</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 flex items-center text-sm group"
                    >
                      <Trash2 size={16} className="mr-1 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">Vaciar Carrito</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: { duration: 0.3 },
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row items-center py-6 border-b"
                        layout
                      >
                        <div className="sm:w-24 w-full h-24 relative mb-4 sm:mb-0 overflow-hidden rounded-md">
                          <Image
                            src={item.product.image_url || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="sm:ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium hover:text-primary transition-colors">
                                <Link href={`/product/${item.product_id}`}>{item.product.name}</Link>
                              </h3>
                              <p className="text-gray-500 text-sm">{item.product.brand}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              <p className="text-lg font-semibold text-primary">${item.product.price.toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateCartItemQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </motion.button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateCartItemQuantity(item.product_id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </motion.button>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.product_id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div className="mt-6" variants={itemVariants}>
                <Link href="/products" className="flex items-center text-primary hover:underline group">
                  <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span>Continuar Comprando</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:w-1/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Resumen del Pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <motion.span
                      key={cartTotal}
                      initial={{ scale: 1.2, color: "#ff5722" }}
                      animate={{ scale: 1, color: "#000000" }}
                      transition={{ duration: 0.3 }}
                    >
                      ${cartTotal.toFixed(2)}
                    </motion.span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <motion.span
                        key={cartTotal + "-total"}
                        initial={{ scale: 1.2, color: "#ff5722" }}
                        animate={{ scale: 1, color: "#000000" }}
                        transition={{ duration: 0.3 }}
                        className="text-primary"
                      >
                        ${cartTotal.toFixed(2)}
                      </motion.span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Impuestos incluidos</p>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition-all duration-300 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
                  >
                    <CreditCard size={18} className="mr-2" />
                    Proceder al Pago
                  </button>
                </motion.div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck size={16} className="mr-2 text-primary" />
                    <span>Envío gratis en pedidos superiores a $99</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield size={16} className="mr-2 text-primary" />
                    <span>Pago 100% seguro y garantizado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">Finalizar Compra</h2>
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Checkout Steps */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                      >
                        1
                      </div>
                      <span className="text-sm mt-1">Información</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                      >
                        2
                      </div>
                      <span className="text-sm mt-1">Pago</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                      >
                        3
                      </div>
                      <span className="text-sm mt-1">Confirmación</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCheckout}>
                  {/* Step 1: Personal Information */}
                  {activeStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Información Personal y de Envío</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre completo
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Correo electrónico
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              Ciudad
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Código Postal
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              País
                            </label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
                        >
                          Continuar al Pago
                          <ChevronRight size={18} className="ml-2" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Payment Information */}
                  {activeStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Información de Pago</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Tarjeta
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre en la Tarjeta
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha de Expiración
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/AA"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <ArrowLeft size={18} className="mr-2" />
                          Volver
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
                        >
                          Revisar Pedido
                          <ChevronRight size={18} className="ml-2" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Order Review */}
                  {activeStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Revisar y Confirmar Pedido</h3>

                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-medium mb-3 text-gray-800">Resumen del Pedido</h4>

                        <div className="space-y-3 mb-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-10 h-10 relative rounded overflow-hidden mr-3">
                                  <Image
                                    src={item.product.image_url || "/placeholder.svg"}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{item.product.name}</p>
                                  <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex justify-between mb-1">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Envío</span>
                            <span className="text-green-600">Gratis</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span className="text-primary">${cartTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2 text-gray-800">Información de Envío</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p>
                              <span className="font-medium">Nombre:</span> {formData.fullName}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span> {formData.email}
                            </p>
                            <p>
                              <span className="font-medium">Dirección:</span> {formData.address}
                            </p>
                            <p>
                              <span className="font-medium">Ciudad:</span> {formData.city}
                            </p>
                            <p>
                              <span className="font-medium">Código Postal:</span> {formData.postalCode}
                            </p>
                            <p>
                              <span className="font-medium">País:</span> {formData.country}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-gray-800">Información de Pago</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p>
                              <span className="font-medium">Tarjeta:</span> **** **** ****{" "}
                              {formData.cardNumber.slice(-4)}
                            </p>
                            <p>
                              <span className="font-medium">Titular:</span> {formData.cardName}
                            </p>
                            <p>
                              <span className="font-medium">Expiración:</span> {formData.expiryDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <ArrowLeft size={18} className="mr-2" />
                          Volver
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={isProcessing}
                          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
                        >
                          {isProcessing ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              />
                              Procesando...
                            </>
                          ) : (
                            <>
                              Completar Compra
                              <CreditCard size={18} className="ml-2" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}

