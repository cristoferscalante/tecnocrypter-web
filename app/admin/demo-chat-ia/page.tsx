import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DemoChatClient } from "./demo-chat-client"

export const metadata: Metadata = {
  title: "Demo - Chat IA",
  robots: {
    index: false,
    follow: false,
  },
}

type SearchParams = Record<string, string | string[] | undefined>

export default async function DemoChatIAPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>
}) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const key = typeof resolvedSearchParams.key === "string" ? resolvedSearchParams.key : ""
  const isDev = process.env.NODE_ENV !== "production"
  const requiredKey = process.env.DEMO_CHAT_KEY

  if (!isDev) {
    if (!requiredKey || key !== requiredKey) notFound()
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <DemoChatClient />
      </div>
    </div>
  )
}
