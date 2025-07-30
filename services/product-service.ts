import { supabase } from '@/lib/supabase'
import type { Product, ProductImage } from '@/types'


export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            url,
            alt,
            display_order
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products:', error)
        throw new Error('Failed to fetch products')
      }

      // Transformar los datos para que coincidan con el tipo Product
      const transformedProducts: Product[] = products?.map(product => ({
        ...product,
        images: product.product_images || []
      })) || []

      return transformedProducts
    } catch (error) {
      console.error('Error in getAllProducts:', error)
      throw error
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            url,
            alt,
            display_order
          )
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null
        }
        console.error('Error fetching product:', error)
        throw new Error('Failed to fetch product')
      }

      if (!product) return null

      // Transformar los datos para que coincidan con el tipo Product
      const transformedProduct: Product = {
        ...product,
        images: product.product_images || []
      }

      return transformedProduct
    } catch (error) {
      console.error('Error in getProductById:', error)
      throw error
    }
  }

  static async getFeaturedProducts(limit: number = 3): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            url,
            alt,
            display_order
          )
        `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching featured products:', error)
        throw new Error('Failed to fetch featured products')
      }

      // Transformar los datos para que coincidan con el tipo Product
      const transformedProducts: Product[] = products?.map(product => ({
        ...product,
        images: product.product_images || []
      })) || []

      return transformedProducts
    } catch (error) {
      console.error('Error in getFeaturedProducts:', error)
      throw error
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            url,
            alt,
            display_order
          )
        `)
        .eq('is_active', true)
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products by category:', error)
        throw new Error('Failed to fetch products by category')
      }

      // Transformar los datos para que coincidan con el tipo Product
      const transformedProducts: Product[] = products?.map(product => ({
        ...product,
        images: product.product_images || []
      })) || []

      return transformedProducts
    } catch (error) {
      console.error('Error in getProductsByCategory:', error)
      throw error
    }
  }
}