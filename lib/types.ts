// Tipos para la aplicación

// Producto
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category_id: number
  brand_id: number
  brand_name?: string
  stock: number
  created_at: string
  size?: string
  discount_percent?: number
}

// Categoría
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

// Subcategoría
export interface Subcategory {
  id: number
  name: string
  slug: string
  category_id: number
}

// Item del carrito
export interface CartItem {
  id: number
  product_id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

// Usuario
export interface User {
  id: number
  name: string
  email: string
}

// Dirección
export interface Address {
  phone: string
  last_name: string
  first_name: string
  address_line2?: string
  address_line1: string
  id: number
  user_id: number
  street: string
  apartment?: string
  city: string
  state: string
  postal_code: string
  country: string
  type: "shipping" | "billing" | "both"
  is_default: boolean
}

// Método de pago
export interface PaymentMethod {
  id: number;
  name: "visa" | "mastercard" | "paypal" | "transferencia" | "efectivo" | "debito" | "credito";
}

// Pedido
export interface Order {
  shipping_address: any
  created_at: string | number | Date
  id: number
  user_id: number
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  payment_method_id: number
  shipping_address_id: number
  billing_address_id?: number
  items: OrderItem[]
}

// Item de pedido
export interface OrderItem {
  price: number
  size: string
  name: string
  image: string
  id: number
  order_id: number
  product_id: number
  size_id: number
  quantity: number
  unit_price: number
  product_name?: string
  product_image?: string
}

// Talla
export interface Size {
  id: number
  name: string
}
