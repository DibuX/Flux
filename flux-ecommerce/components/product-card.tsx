"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import { useCart, useFavorites } from "@/app/providers"

type ProductCardProps = {
  product: {
    id: number
    name: string
    brand: string
    price: number
    original_price?: number | null
    image_url: string
    rating?: number | null
    review_count?: number
    is_new?: boolean
    is_sale?: boolean
    is_featured?: boolean
    discount_percentage?: number | null
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productIsFavorite = isFavorite(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product.id, 1)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (productIsFavorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  const getProductTag = () => {
    if (product.is_new) {
      return { class: "new-tag", text: "Nuevo" }
    } else if (product.is_sale) {
      return { class: "sale-tag", text: `-${product.discount_percentage}%` }
    } else if (product.is_featured) {
      return { class: "bestseller-tag", text: "Top Ventas" }
    }
    return null
  }

  const productTag = getProductTag()

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        className="product-card h-full"
        whileHover={{ y: -10 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-img-container">
          <div className="relative w-full h-56 bg-gray-200">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`card-img object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <motion.div
            className="card-actions"
            initial={{ x: 20, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={`action-btn ${productIsFavorite ? "bg-primary text-white" : ""}`}
              onClick={handleToggleFavorite}
              aria-label={productIsFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart size={16} fill={productIsFavorite ? "white" : "none"} />
            </button>
            <button className="action-btn" aria-label="Vista rápida">
              <Eye size={16} />
            </button>
          </motion.div>

          {productTag && <span className={`product-tag ${productTag.class}`}>{productTag.text}</span>}
        </div>

        <div className="card-body">
          <div className="product-brand">{product.brand}</div>
          <h3 className="card-title">{product.name}</h3>

          {product.rating && (
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                />
              ))}
              <span>({product.review_count || 0})</span>
            </div>
          )}

          <p className="card-price">
            {product.original_price && <span className="original-price">${product.original_price.toFixed(2)}</span>}$
            {product.price.toFixed(2)}
          </p>

          <motion.button className="add-to-cart-btn" whileTap={{ scale: 0.95 }} onClick={handleAddToCart}>
            <ShoppingCart size={16} className="inline-block mr-2" />
            Añadir al Carrito
          </motion.button>
        </div>
      </motion.div>
    </Link>
  )
}

