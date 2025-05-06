"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/hooks/use-cart"
import { useToast } from "@/components/hooks/use-toast"
import { formatPrice, getImageUrl } from "@/lib/utils"
import type { Product } from "@/lib/types"
import EmptyWishlist from "./empty-wishlist"

interface WishlistItemsProps {
  userId: string
}

export default function WishlistItems({ userId }: WishlistItemsProps) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Error al cargar la lista de favoritos")
        }

        const data = await response.json()
        setWishlistItems(data.items)
      } catch (error) {
        console.error("Error al cargar la lista de favoritos:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar tu lista de favoritos",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [userId, toast])

  const removeFromWishlist = async (productId: number) => {
    try {
      const response = await fetch(`/api/wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el producto de favoritos")
      }

      setWishlistItems((prev) => prev.filter((item) => item.id !== productId))

      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado de tu lista de favoritos",
      })
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto de tu lista de favoritos",
        variant: "destructive",
      })
    }
  }

  const addToCart = (product: Product) => {
    addItem({
      id: Date.now(),
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.size,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-2">Producto</th>
              <th className="text-left py-4 px-2">Precio</th>
              <th className="text-center py-4 px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product) => (
              <tr key={product.id} className="border-b border-border">
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={getImageUrl(product.image) || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="ml-4">
                      <Link href={`/productos/${product.id}`} className="font-medium hover:text-primary">
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{product.size && `Talla: ${product.size}`}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 font-medium">{formatPrice(product.price)}</td>
                <td className="py-4 px-2">
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="flex items-center"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      <span>Añadir</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
