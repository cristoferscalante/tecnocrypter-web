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
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  cryptoPrice: {
    btc: number
    eth: number
    usdt: number
  }
  category: string
  vendor: string
  features: string[]
  images: string[]
  downloadUrl?: string
}

export interface CryptoPayment {
  orderId: string
  productId: string
  amount: number
  currency: "BTC" | "ETH" | "USDT"
  walletAddress: string
  status: "pending" | "confirmed" | "failed"
}
