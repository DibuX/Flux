export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          brand: string
          description: string | null
          price: number
          original_price: number | null
          image_url: string
          category: string
          subcategory: string | null
          tags: string[] | null
          rating: number | null
          review_count: number
          stock: number
          is_featured: boolean
          is_new: boolean
          is_sale: boolean
          discount_percentage: number | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          brand: string
          description?: string | null
          price: number
          original_price?: number | null
          image_url: string
          category: string
          subcategory?: string | null
          tags?: string[] | null
          rating?: number | null
          review_count?: number
          stock?: number
          is_featured?: boolean
          is_new?: boolean
          is_sale?: boolean
          discount_percentage?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          brand?: string
          description?: string | null
          price?: number
          original_price?: number | null
          image_url?: string
          category?: string
          subcategory?: string | null
          tags?: string[] | null
          rating?: number | null
          review_count?: number
          stock?: number
          is_featured?: boolean
          is_new?: boolean
          is_sale?: boolean
          discount_percentage?: number | null
          created_at?: string
        }
      }
      carts: {
        Row: {
          id: number
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: number
          cart_id: number
          product_id: number
          quantity: number
          created_at: string
        }
        Insert: {
          id?: number
          cart_id: number
          product_id: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: number
          cart_id?: number
          product_id?: number
          quantity?: number
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: number
          user_id: string
          product_id: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          product_id: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          product_id?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          address: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          address?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          address?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string | null
          status: string
          total: number
          shipping_address: string
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          status?: string
          total: number
          shipping_address: string
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          status?: string
          total?: number
          shipping_address?: string
          payment_method?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number | null
          product_name: string
          product_price: number
          quantity: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id?: number | null
          product_name: string
          product_price: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number | null
          product_name?: string
          product_price?: number
          quantity?: number
          created_at?: string
        }
      }
    }
  }
}

