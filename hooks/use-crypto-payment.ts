"use client"

import { useState } from "react"
import type { CryptoPayment, Product } from "@/types"

export function useCryptoPayment() {
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<CryptoPayment["status"] | null>(null)

  const initializePayment = async (
    product: Product,
    currency: "BTC" | "ETH" | "USDT",
  ): Promise<CryptoPayment | null> => {
    try {
      setLoading(true)

      const amountByCurrency: Record<"BTC" | "ETH" | "USDT", number> = {
        BTC: product.crypto_price_btc,
        ETH: product.crypto_price_eth,
        USDT: product.crypto_price_usdt,
      }

      const response = await fetch("/api/payments/crypto/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          currency,
          amount: amountByCurrency[currency],
        }),
      })

      if (!response.ok) throw new Error("Error al inicializar pago")

      const payment = await response.json()
      setPaymentStatus("pending")
      return payment
    } catch (error) {
      console.error("Error en pago crypto:", error)
      setPaymentStatus("failed")
      return null
    } finally {
      setLoading(false)
    }
  }

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await fetch(`/api/payments/crypto/status/${orderId}`)
      if (!response.ok) throw new Error("Error al verificar pago")

      const { status } = await response.json()
      setPaymentStatus(status)
      return status
    } catch (error) {
      console.error("Error al verificar estado:", error)
      return "failed"
    }
  }

  return {
    loading,
    paymentStatus,
    initializePayment,
    checkPaymentStatus,
  }
}
