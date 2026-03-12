"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type ChatRole = "user" | "assistant"

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function renderWithLinks(text: string) {
  const pattern = /https?:\/\/[^\s]+/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    const start = match.index
    const rawUrl = match[0] ?? ""
    const end = start + rawUrl.length

    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))

    let url = rawUrl
    let trailing = ""
    while (url.length > 0) {
      const last = url.slice(-1)
      if (last === "." || last === "," || last === ")" || last === "]" || last === "!" || last === "?") {
        trailing = `${last}${trailing}`
        url = url.slice(0, -1)
        continue
      }
      break
    }

    if (url) {
      nodes.push(
        <a
          key={`url-${start}`}
          href={url}
          className="underline underline-offset-2"
          rel="noreferrer"
        >
          {url}
        </a>
      )
    } else {
      nodes.push(rawUrl)
    }

    if (trailing) nodes.push(trailing)

    lastIndex = end
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export function DemoChatClient() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      role: "assistant",
      content:
        "Hola. Soy el asistente de TecnoCrypter. Puedo ayudarte a navegar y responder preguntas sobre los contenidos del sitio (seguridad, encriptación, criptomonedas, herramientas y políticas). ¿Qué necesitas?",
      createdAt: Date.now(),
    },
  ])

  const listRef = useRef<HTMLDivElement | null>(null)
  const trimmedInput = input.trim()

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages.length, isSending])

  async function send() {
    if (!trimmedInput || isSending) return
    setIsSending(true)

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmedInput,
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const history = [...messages, userMessage].map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedInput,
          path: pathname,
          history,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { reply?: string }
      const reply = typeof data.reply === "string" && data.reply.trim() ? data.reply : "No tengo una respuesta para eso."

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: reply,
          createdAt: Date.now(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content:
            "Ahora mismo no puedo responder. Intenta de nuevo en unos segundos. Si prefieres, dime qué sección quieres visitar (Blog, Productos, Tools, Privacidad, Términos, Contacto).",
          createdAt: Date.now(),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[min(92vw,380px)] bg-background/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-1 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Image
                    src="/images/bot.png"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  Demo interna — Chat IA
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Responde solo sobre TecnoCrypter. Si no hay info, sugiere navegación.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              ref={listRef}
              className="h-[360px] overflow-y-auto rounded-md border border-border bg-background/30 p-3"
            >
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {renderWithLinks(m.content)}
                    </div>
                  </div>
                ))}
                {isSending ? (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                      Escribiendo…
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                className="min-h-[44px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    void send()
                  }
                }}
                disabled={isSending}
              />
              <Button
                type="button"
                onClick={() => void send()}
                disabled={!trimmedInput || isSending}
                className="h-[44px] px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-28 w-28 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent"
          onClick={() => setIsOpen(true)}
        >
          <Image src="/images/bot.png" alt="Abrir chat" width={112} height={112} className="h-28 w-28 object-contain" />
        </Button>
      )}
    </div>
  )
}
