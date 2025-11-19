export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: "seguridad" | "encriptacion" | "criptomonedas" | "noticias"
  tags: string[]
  readTime: number
  featured?: boolean
  image?: string | null
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  crypto_price_btc: number
  crypto_price_eth: number
  crypto_price_usdt: number
  category: string
  vendor: string
  features: string[]
  images: ProductImage[]
  download_url?: string
  created_at?: string
  updated_at?: string
  is_active: boolean
  is_featured: boolean
}

export interface ProductImage {
  id: number
  product_id: number
  url: string
  alt: string
  display_order: number
}

export interface CryptoPayment {
  orderId: string
  productId: string
  amount: number
  currency: "BTC" | "ETH" | "USDT"
  walletAddress: string
  status: "pending" | "confirmed" | "failed"
}
