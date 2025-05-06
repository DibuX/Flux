"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import { useCart, useFavorites, useToast } from "@/app/providers"
import { motion } from "framer-motion"

interface ProductProps {
  product: {
    id: number
    name: string
    brand: string
    price: number
    original_price?: number
    image_url: string
    rating: number
    review_count: number
    is_new?: boolean
    is_sale?: boolean
    discount_percentage?: number
    is_featured?: boolean
  }
}

export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { showToast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(isFavorite(product.id))

  const handleAddToCart = () => {
    addToCart(product.id)
    showToast(`${product.name} agregado al carrito`, "success")
  }

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(product.id)
      showToast(`${product.name} eliminado de favoritos`, "info")
    } else {
      addToFavorites(product.id)
      showToast(`${product.name} agregado a favoritos`, "success")
    }
    setIsFavorited(!isFavorited)
  }

  const handleQuickView = () => {
    // Implementar vista rápida del producto
    showToast("Vista rápida no implementada", "info")
  }

  // Renderizar estrellas basadas en la calificación
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half-star"
          className="w-4 h-4 text-primary"
          style={{
            mask: "linear-gradient(90deg, #000 50%, transparent 50%)",
            WebkitMask: "linear-gradient(90deg, #000 50%, transparent 50%)",
            fill: "currentColor",
          }}
        />,
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md">
        {/* Imagen y acciones */}
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <div className="w-full h-full relative">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
              />
            </div>
          </Link>

          {/* Etiquetas de producto */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_new && (
              <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">Nuevo</span>
            )}
            {product.is_sale && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                -{product.discount_percentage}%
              </span>
            )}
            {product.is_featured && (
              <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">Destacado</span>
            )}
          </div>

          {/* Botones de acción */}
          <div
            className={`absolute right-2 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleFavorite}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
              aria-label={isFavorited ? "Eliminar de favoritos" : "Agregar a favoritos"}
            >
              <Heart className={isFavorited ? "fill-red-500 text-red-500" : ""} size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
              aria-label="Vista rápida"
            >
              <Eye size={16} />
            </motion.button>
          </div>
        </div>

        {/* Información del producto */}
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-sm text-gray-500 mb-1">{product.brand}</span>
          <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
          </Link>

          <div className="flex items-center gap-1 mb-2">
            {renderStars()}
            <span className="text-xs text-gray-500 ml-1">({product.review_count})</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center mb-3">
              {product.original_price ? (
                <>
                  <span className="text-gray-400 line-through text-sm mr-2">${product.original_price.toFixed(2)}</span>
                  <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="w-full py-2 px-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart size={16} />
              <span>Añadir al Carrito</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}