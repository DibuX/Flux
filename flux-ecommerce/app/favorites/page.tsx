"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useFavorites, useCart } from "@/app/providers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, isFavoritesLoading } = useFavorites()
  const { addToCart } = useCart()
  const [removingId, setRemovingId] = useState<number | null>(null)

  const handleRemoveFromFavorites = async (productId: number) => {
    setRemovingId(productId)
    await removeFromFavorites(productId)
    setRemovingId(null)
  }

  if (isFavoritesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <Heart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">No tienes favoritos</h2>
            <p className="text-gray-500 mb-8">Explora nuestra tienda y agrega productos a tus favoritos.</p>
            <Link
              href="/products"
              className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary-dark transition-colors"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {favorites.map((favorite) => (
                <motion.div
                  key={favorite.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <Link href={`/product/${favorite.product_id}`}>
                      <div className="relative h-64 w-full bg-gray-200">
                        <Image
                          src={favorite.product.image_url || "/placeholder.svg"}
                          alt={favorite.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <button
                      onClick={() => handleRemoveFromFavorites(favorite.product_id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      disabled={removingId === favorite.product_id}
                      aria-label="Remove from favorites"
                    >
                      {removingId === favorite.product_id ? (
                        <div className="h-5 w-5 border-t-2 border-red-500 rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 size={20} className="text-red-500" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <Link href={`/product/${favorite.product_id}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                        {favorite.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-2">{favorite.product.brand}</p>
                    <p className="text-lg font-bold mb-4">${favorite.product.price.toFixed(2)}</p>

                    <button
                      onClick={() => addToCart(favorite.product_id)}
                      className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Añadir al Carrito
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

