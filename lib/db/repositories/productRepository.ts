import { executeQuery } from "../mysql"
import type { Product } from "../../types"
import { cache } from "react"

// Repositorio para productos
export const productRepository = {
  // Obtener todos los productos
  getAllProducts: cache(async (): Promise<Product[]> => {
    return executeQuery<Product>(`
      SELECT p.id_producto as id, p.nombre as name, p.descripcion as description, 
             p.precio as price, p.img_principal as image, p.id_categoria as category_id, 
             p.id_marca as brand_id, p.stock, p.fecha_alta as created_at, 
             COALESCE(t.nombre, 'Único') as size,
             m.nombre as brand_name
      FROM productos p
      LEFT JOIN talles t ON t.id_tallas = 1
      LEFT JOIN marcas m ON m.id_marca = p.id_marca
      ORDER BY p.fecha_alta DESC
    `)
  }),

  // Obtener un producto por ID
  getProductById: cache(async (id: number): Promise<Product | null> => {
    const products = await executeQuery<Product>(
      `SELECT p.id_producto as id, p.nombre as name, p.descripcion as description, 
              p.precio as price, p.img_principal as image, p.id_categoria as category_id, 
              p.id_marca as brand_id, p.stock, p.fecha_alta as created_at,
              COALESCE(t.nombre, 'Único') as size,
              m.nombre as brand_name
       FROM productos p
       LEFT JOIN talles t ON t.id_tallas = 1
       LEFT JOIN marcas m ON m.id_marca = p.id_marca
       WHERE p.id_producto = ?`,
      [id],
    )

    return products.length > 0 ? products[0] : null
  }),

  // Obtener productos por categoría
  getProductsByCategory: cache(async (categoryId: number): Promise<Product[]> => {
    return executeQuery<Product>(
      `SELECT p.id_producto as id, p.nombre as name, p.descripcion as description, 
              p.precio as price, p.img_principal as image, p.id_categoria as category_id, 
              p.id_marca as brand_id, p.stock, p.fecha_alta as created_at,
              COALESCE(t.nombre, 'Único') as size,
              m.nombre as brand_name
       FROM productos p
       LEFT JOIN talles t ON t.id_tallas = 1
       LEFT JOIN marcas m ON m.id_marca = p.id_marca
       WHERE p.id_categoria = ?
       ORDER BY p.fecha_alta DESC`,
      [categoryId],
    )
  }),

  // Obtener productos destacados
  getFeaturedProducts: cache(async (limit = 8): Promise<Product[]> => {
    try {
      const products = await executeQuery<Product>(
        `SELECT p.id_producto as id, p.nombre as name, p.descripcion as description, 
                p.precio as price, p.img_principal as image, p.id_categoria as category_id, 
                p.id_marca as brand_id, p.stock, p.fecha_alta as created_at,
                COALESCE(t.nombre, 'Único') as size,
                m.nombre as brand_name
         FROM productos p
         LEFT JOIN talles t ON t.id_tallas = 1
         LEFT JOIN marcas m ON m.id_marca = p.id_marca
         ORDER BY RAND()
         LIMIT 8`
      )

      console.log(`Productos obtenidos: ${products.length}`)
      return products
    } catch (error) {
      console.error("Error al obtener productos destacados:", error)
      return []
    }
  }),

  // Buscar productos
  searchProducts: cache(async (query: string): Promise<Product[]> => {
    const searchTerm = `%${query}%`
    return executeQuery<Product>(
      `SELECT p.id_producto as id, p.nombre as name, p.descripcion as description, 
              p.precio as price, p.img_principal as image, p.id_categoria as category_id, 
              p.id_marca as brand_id, p.stock, p.fecha_alta as created_at,
              COALESCE(t.nombre, 'Único') as size,
              m.nombre as brand_name
       FROM productos p
       LEFT JOIN talles t ON t.id_tallas = 1
       LEFT JOIN marcas m ON m.id_marca = p.id_marca
       WHERE p.nombre LIKE ? OR p.descripcion LIKE ?
       ORDER BY p.nombre ASC`,
      [searchTerm, searchTerm],
    )
  }),
}
