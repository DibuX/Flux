"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"
import { AnimatePresence } from "framer-motion"

// Auth Context
type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any; data: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Cart Context
type CartItem = {
  id: number
  product_id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image_url: string
    brand: string
  }
}

type CartContextType = {
  cartItems: CartItem[]
  isCartLoading: boolean
  addToCart: (productId: number, quantity?: number) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  updateCartItemQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Favorites Context
type FavoriteItem = {
  id: number
  product_id: number
  product: {
    id: number
    name: string
    price: number
    image_url: string
    brand: string
  }
}

type FavoritesContextType = {
  favorites: FavoriteItem[]
  isFavoritesLoading: boolean
  addToFavorites: (productId: number) => Promise<void>
  removeFromFavorites: (productId: number) => Promise<void>
  isFavorite: (productId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Toast Context
type ToastType = "success" | "error" | "info"

type Toast = {
  id: string
  message: string
  type: ToastType
}

type ToastContextType = {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  // Auth state
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartLoading, setIsCartLoading] = useState(true)
  const [cartId, setCartId] = useState<number | null>(null)

  // Favorites state
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true)

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([])

  // Auth functions
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (!error && data.user) {
      // Create profile
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
      })
    }

    return { data, error }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  // Cart functions
  useEffect(() => {
    async function fetchCart() {
      if (!user) {
        setCartItems([])
        setIsCartLoading(false)
        return
      }

      try {
        // Check if user has a cart
        const { data: carts } = await supabase.from("carts").select("id").eq("user_id", user.id).single()

        if (carts) {
          setCartId(carts.id)

          // Fetch cart items with product details
          const { data: items } = await supabase
            .from("cart_items")
            .select(`
              id,
              product_id,
              quantity,
              product:products(
                id,
                name,
                price,
                image_url,
                brand
              )
            `)
            .eq("cart_id", carts.id)

          setCartItems(items || [])
        } else {
          // Create a new cart for the user
          const { data: newCart } = await supabase.from("carts").insert({ user_id: user.id }).select("id").single()

          if (newCart) {
            setCartId(newCart.id)
          }

          setCartItems([])
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
      } finally {
        setIsCartLoading(false)
      }
    }

    fetchCart()
  }, [user])

  async function addToCart(productId: number, quantity = 1) {
    if (!user || !cartId) {
      showToast("Debes iniciar sesión para agregar productos al carrito", "error")
      return
    }

    try {
      // Check if product already in cart
      const existingItem = cartItems.find((item) => item.product_id === productId)

      if (existingItem) {
        // Update quantity
        await updateCartItemQuantity(productId, existingItem.quantity + quantity)
      } else {
        // Add new item
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            cart_id: cartId,
            product_id: productId,
            quantity,
          })
          .select(`
            id,
            product_id,
            quantity,
            product:products(
              id,
              name,
              price,
              image_url,
              brand
            )
          `)
          .single()

        if (error) throw error

        setCartItems([...cartItems, data])
        showToast("Producto agregado al carrito", "success")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      showToast("Error al agregar al carrito", "error")
    }
  }

  async function removeFromCart(productId: number) {
    if (!user || !cartId) return

    try {
      const itemToRemove = cartItems.find((item) => item.product_id === productId)
      if (!itemToRemove) return

      await supabase.from("cart_items").delete().eq("id", itemToRemove.id)

      setCartItems(cartItems.filter((item) => item.product_id !== productId))
      showToast("Producto eliminado del carrito", "info")
    } catch (error) {
      console.error("Error removing from cart:", error)
      showToast("Error al eliminar del carrito", "error")
    }
  }

  async function updateCartItemQuantity(productId: number, quantity: number) {
    if (!user || !cartId || quantity < 1) return

    try {
      const itemToUpdate = cartItems.find((item) => item.product_id === productId)
      if (!itemToUpdate) return

      await supabase.from("cart_items").update({ quantity }).eq("id", itemToUpdate.id)

      setCartItems(cartItems.map((item) => (item.product_id === productId ? { ...item, quantity } : item)))
    } catch (error) {
      console.error("Error updating cart:", error)
      showToast("Error al actualizar el carrito", "error")
    }
  }

  async function clearCart() {
    if (!user || !cartId) return

    try {
      await supabase.from("cart_items").delete().eq("cart_id", cartId)

      setCartItems([])
      showToast("Carrito vaciado", "info")
    } catch (error) {
      console.error("Error clearing cart:", error)
      showToast("Error al vaciar el carrito", "error")
    }
  }

  const cartTotal = cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  // Favorites functions
  useEffect(() => {
    async function fetchFavorites() {
      if (!user) {
        setFavorites([])
        setIsFavoritesLoading(false)
        return
      }

      try {
        const { data } = await supabase
          .from("favorites")
          .select(`
            id,
            product_id,
            product:products(
              id,
              name,
              price,
              image_url,
              brand
            )
          `)
          .eq("user_id", user.id)

        setFavorites(data || [])
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setIsFavoritesLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  async function addToFavorites(productId: number) {
    if (!user) {
      showToast("Debes iniciar sesión para agregar favoritos", "error")
      return
    }

    try {
      // Check if already in favorites
      if (favorites.some((fav) => fav.product_id === productId)) {
        return
      }

      const { data, error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          product_id: productId,
        })
        .select(`
          id,
          product_id,
          product:products(
            id,
            name,
            price,
            image_url,
            brand
          )
        `)
        .single()

      if (error) throw error

      setFavorites([...favorites, data])
      showToast("Producto agregado a favoritos", "success")
    } catch (error) {
      console.error("Error adding to favorites:", error)
      showToast("Error al agregar a favoritos", "error")
    }
  }

  async function removeFromFavorites(productId: number) {
    if (!user) return

    try {
      const itemToRemove = favorites.find((fav) => fav.product_id === productId)
      if (!itemToRemove) return

      await supabase.from("favorites").delete().eq("id", itemToRemove.id)

      setFavorites(favorites.filter((fav) => fav.product_id !== productId))
      showToast("Producto eliminado de favoritos", "info")
    } catch (error) {
      console.error("Error removing from favorites:", error)
      showToast("Error al eliminar de favoritos", "error")
    }
  }

  function isFavorite(productId: number) {
    return favorites.some((fav) => fav.product_id === productId)
  }

  // Toast functions
  function showToast(message: string, type: ToastType = "success") {
    const id = Date.now().toString()
    setToasts([...toasts, { id, message, type }])

    // Auto-remove after 3 seconds
    setTimeout(() => {
      hideToast(id)
    }, 3000)
  }

  function hideToast(id: string) {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      <CartContext.Provider
        value={{
          cartItems,
          isCartLoading,
          addToCart,
          removeFromCart,
          updateCartItemQuantity,
          clearCart,
          cartTotal,
          cartCount,
        }}
      >
        <FavoritesContext.Provider
          value={{
            favorites,
            isFavoritesLoading,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
          }}
        >
          <ToastContext.Provider
            value={{
              toasts,
              showToast,
              hideToast,
            }}
          >
            {children}
            <AnimatePresence>
              {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
              ))}
            </AnimatePresence>
          </ToastContext.Provider>
        </FavoritesContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

// Toast component
import { motion } from "framer-motion"

function Toast({
  toast,
  onClose,
}: {
  toast: { id: string; message: string; type: "success" | "error" | "info" }
  onClose: () => void
}) {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }

  const icon = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    info: "fa-info-circle",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg text-white flex items-center ${bgColor[toast.type]}`}
    >
      <i className={`fas ${icon[toast.type]} mr-3`}></i>
      <p>{toast.message}</p>
      <button onClick={onClose} className="ml-4 text-white">
        <i className="fas fa-times"></i>
      </button>
    </motion.div>
  )
}

// Custom hooks
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

