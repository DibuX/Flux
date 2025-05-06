"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  isNew?: boolean
  isSale?: boolean
  isBestseller?: boolean
}

export default function ProductCard({
  product,
  isNew = false,
  isSale = false,
  isBestseller = false,
}: ProductCardProps) {
  if (!product || !product.id) {
    console.error("ProductCard recibió un producto inválido:", product)
    return null
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    })
  }

  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()

  const finalPrice = useMemo(() => {
    if (isSale) {
      const discount = 0.2 // 20% fijo para evitar Math.random()
      return product.price * (1 - discount)
    }
    return product.price
  }, [isSale, product.price])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: Date.now(),
      product_id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: 1,
      size: product.size,
    })
  }

  const imageUrl = product.image && product.image.startsWith("/")
    ? product.image
    : `/img/products/default-product.png`

  return (
    <div className="product-card">
      <div
        className="product-img-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/productos/${product.id}`}>
          <div style={{ position: "relative", width: "100%", height: "300px" }}>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="product-img"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>

        <div className="product-actions">
          <button className="action-btn">
            <Heart size={18} />
          </button>
          <button className="action-btn">
            <Eye size={18} />
          </button>
        </div>

        {isNew && <span className="product-tag tag-new">Nuevo</span>}
        {isBestseller && <span className="product-tag tag-bestseller">Top Ventas</span>}
      </div>

      <div className="product-info">
        <div className="product-brand">{product.brand_name || "Marca"}</div>
        <Link href={`/productos/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < 4 ? "filled" : ""} />
            ))}
          </div>
        </div>

        <div className="product-price">
          {isSale ? (
            <>
              <span className="original-price">{formatPrice(product.price)}</span>
              <span className="current-price">{formatPrice(finalPrice)}</span>
            </>
          ) : (
            <span className="current-price">{formatPrice(product.price)}</span>
          )}
        </div>

        <button onClick={handleAddToCart} className="add-to-cart">
          <ShoppingCart size={18} />
          <span>Añadir al Carrito</span>
        </button>
      </div>
    </div>
  )
}
