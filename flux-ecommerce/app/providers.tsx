"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { AnimatePresence } from "framer-motion"

// Auth Context
type AuthContextType = {
  user: string | null // Cambia esto según los datos de tu base de datos
  isLoading: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async (username: string, password: string) => {
    setIsLoading(true)
    // Aquí puedes agregar la lógica para autenticarte con tu base de datos
    // Ejemplo: consulta SQL para verificar usuario y contraseña
    setUser(username) // Simula que el usuario ha iniciado sesión
    setIsLoading(false)
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      <AnimatePresence>{children}</AnimatePresence>
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}

// Toast Context
type ToastType = "success" | "error" | "warning" | "info"

type Toast = {
  id: string
  message: string
  type: ToastType
}

type ToastContextType = {
  toasts: Toast[]
  showToast: (message: string, type: ToastType) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      dismissToast(id)
    }, 3000)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-md flex items-center justify-between min-w-[300px] ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                  ? "bg-red-500"
                  : toast.type === "warning"
                    ? "bg-amber-500"
                    : "bg-blue-500"
            } text-white`}
          >
            <p>{toast.message}</p>
            <button onClick={() => dismissToast(toast.id)} className="ml-2 text-white">
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider")
  }
  return context
}

// Cart Context
type CartItem = {
  id: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (productId: number, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (productId: number, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId)
      if (existingItem) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        return [...prev, { id: productId, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}

// Favorites Context
type FavoritesContextType = {
  favorites: number[]
  addToFavorites: (productId: number) => void
  removeFromFavorites: (productId: number) => void
  isFavorite: (productId: number) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([])

  const addToFavorites = (productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev
      }
      return [...prev, productId]
    })
  }

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  const isFavorite = (productId: number) => {
    return favorites.includes(productId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider")
  }
  return context
}

// Combine all providers
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <ToastProvider>{children}</ToastProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}
