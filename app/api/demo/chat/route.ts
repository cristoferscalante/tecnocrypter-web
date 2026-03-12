import { NextResponse, type NextRequest } from "next/server"
import fs from "fs/promises"
import path from "path"
import { BlogService } from "@/services/blog-service"
import { ProductService } from "@/services/product-service"

type ChatRole = "user" | "assistant"

type IncomingMessage = {
  role?: ChatRole
  content?: string
}

type GeminiRole = "user" | "model"

type GeminiContent = {
  role: GeminiRole
  parts: Array<{ text: string }>
}

function normalizeBaseUrl(input: string) {
  return input.replace(/\/$/, "")
}

function getBaseUrlFromRequest(request: NextRequest) {
  const rawEnv = process.env.NEXT_PUBLIC_SITE_URL
  if (typeof rawEnv === "string" && rawEnv.trim()) return normalizeBaseUrl(rawEnv.trim())

  const proto = request.headers.get("x-forwarded-proto") ?? "http"
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "localhost:3000"
  return normalizeBaseUrl(`${proto}://${host}`)
}

function toAbsoluteUrl(baseUrl: string, urlOrPath: string) {
  const raw = urlOrPath.trim()
  if (!raw) return raw
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw
  const pathPart = raw.startsWith("/") ? raw : `/${raw}`
  return `${normalizeBaseUrl(baseUrl)}${pathPart}`
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

let cachedSystemPrompt: string | null = null
async function getSystemPrompt() {
  const isProd = process.env.NODE_ENV === "production"
  if (isProd && cachedSystemPrompt) return cachedSystemPrompt
  const promptPath = path.join(process.cwd(), "intrucciones.txt")
  const prompt = await fs.readFile(promptPath, "utf8")
  if (isProd) cachedSystemPrompt = prompt
  return prompt
}

async function callGemini(args: { contents: GeminiContent[] }) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null

  try {
    const models = [process.env.GEMINI_MODEL, "gemini-2.0-flash", "gemini-2.5-flash"].filter(
      (m): m is string => typeof m === "string" && m.trim().length > 0
    )
    const tried = new Set<string>()
    const orderedModels = models.filter((m) => (tried.has(m) ? false : (tried.add(m), true)))

    let lastError: string | null = null
    for (const model of orderedModels) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: args.contents,
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 650,
            },
          }),
        }
      )

      if (!res.ok) {
        const errorText = await res.text()
        lastError = `Error conectando a Gemini con el modelo "${model}" (HTTP ${res.status}). ${errorText.slice(0, 280)}`
        if (res.status === 404 || res.status === 400) continue
        return lastError
      }

      const data = (await res.json()) as {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: unknown }> }
        }>
      }

      const text = data?.candidates?.[0]?.content?.parts?.map((p) => p?.text).find((t) => typeof t === "string")
      return typeof text === "string" && text.trim() ? text.trim() : null
    }

    return lastError
  } catch {
    return null
  }
}

type SearchResult = {
  id: string
  title: string
  excerpt: string
  type: "blog" | "product" | "page"
  url: string
  category?: string
}

const staticPages: Array<Omit<SearchResult, "type">> = [
  {
    id: "home",
    title: "Inicio",
    excerpt: "Portada de TecnoCrypter: contenido y acceso a secciones principales.",
    url: "/",
    category: "general",
  },
  {
    id: "blog",
    title: "Blog",
    excerpt: "Artículos por categorías: seguridad, encriptación, criptomonedas y noticias.",
    url: "/blog",
    category: "contenido",
  },
  {
    id: "productos",
    title: "Productos y Servicios",
    excerpt: "Servicios profesionales: desarrollo web seguro, capacitaciones, ciberseguridad y respuesta a incidentes.",
    url: "/productos",
    category: "servicios",
  },
  {
    id: "tools",
    title: "Herramientas",
    excerpt: "Herramientas gratuitas de seguridad y privacidad (varias funcionan localmente en el navegador).",
    url: "/tools",
    category: "herramientas",
  },
  {
    id: "seguridad",
    title: "Seguridad Digital",
    excerpt: "Soluciones de seguridad personal y empresarial.",
    url: "/seguridad",
    category: "seguridad",
  },
  {
    id: "encriptacion",
    title: "Encriptación",
    excerpt: "Guías, técnicas y herramientas de encriptación para proteger información.",
    url: "/encriptacion",
    category: "encriptacion",
  },
  {
    id: "criptomonedas",
    title: "Criptomonedas",
    excerpt: "Noticias, análisis y educación sobre Bitcoin, Ethereum y blockchain.",
    url: "/criptomonedas",
    category: "criptomonedas",
  },
  {
    id: "noticias",
    title: "Noticias Tech",
    excerpt: "Actualidad tecnológica y ciberseguridad: IA, seguridad y tendencias.",
    url: "/noticias",
    category: "noticias",
  },
  {
    id: "privacidad",
    title: "Política de Privacidad",
    excerpt: "Modelo privacy-first con minimización de datos, anonimato y cifrado.",
    url: "/privacidad",
    category: "legal",
  },
  {
    id: "terminos",
    title: "Términos de Servicio",
    excerpt: "Uso permitido y prohibido, y reglas de uso de herramientas del sitio.",
    url: "/terminos",
    category: "legal",
  },
  {
    id: "cookies",
    title: "Política de Cookies",
    excerpt: "Cookies técnicas necesarias y cookies opcionales para analítica anónima (con consentimiento).",
    url: "/cookies",
    category: "legal",
  },
  {
    id: "contacto",
    title: "Contacto",
    excerpt: "Canales de contacto con el equipo.",
    url: "/contacto",
    category: "general",
  },
]

type SiteTool = {
  title: string
  description: string
  href: string
  category: string
  keywords: string[]
}

const tools: SiteTool[] = [
  {
    title: "Generador de Contraseñas",
    description: "Genera contraseñas seguras y personalizables con diferentes niveles de complejidad.",
    href: "/tools/generador-contrasenas",
    category: "Seguridad",
    keywords: ["contrasena", "contraseña", "password", "passwords", "clave", "passphrase", "segura"],
  },
  {
    title: "Generador de Credenciales Determinísticas",
    description: "Crea usuarios y contraseñas determinísticas desde una palabra clave maestra, todo en tu navegador.",
    href: "/tools/generador-credenciales",
    category: "Privacidad",
    keywords: ["credenciales", "usuario", "username", "deterministico", "determinística", "maestra", "master"],
  },
  {
    title: "Limpiador de Metadatos",
    description: "Elimina metadatos sensibles de tus archivos para proteger tu privacidad.",
    href: "/tools/limpia-metadatos",
    category: "Privacidad",
    keywords: ["metadatos", "metadata", "exif", "pdf", "docx", "imagen", "privacidad"],
  },
  {
    title: "Verificador de URL",
    description: "Analiza y verifica la seguridad de URLs y detecta posibles amenazas antes de visitarlas.",
    href: "/tools/verificador",
    category: "Análisis",
    keywords: ["url", "link", "enlace", "phishing", "verificar", "segura", "sospechosa", "virustotal"],
  },
  {
    title: "Generador de Hash",
    description: "Calcula hashes (MD5, SHA-1, SHA-256, etc.) de texto y archivos totalmente en tu navegador.",
    href: "/tools/generador-hash",
    category: "Seguridad",
    keywords: ["hash", "md5", "sha1", "sha-1", "sha256", "sha-256", "checksum", "integridad"],
  },
  {
    title: "Generador de Códigos QR",
    description: "Crea códigos QR personalizados para enlaces, textos y contactos con opciones de personalización.",
    href: "/tools/generador-qr",
    category: "Utilidades",
    keywords: ["qr", "codigo qr", "código qr", "codigo", "código"],
  },
  {
    title: "Cifrado Online",
    description: "Cifra y descifra mensajes con una clave compartida. Todo el proceso se realiza en tu navegador.",
    href: "/tools/cifrado-online",
    category: "Seguridad",
    keywords: ["cifrar", "descifrar", "encriptar", "encriptación", "encriptacion", "mensaje", "clave", "secreto"],
  },
  {
    title: "Codificador Base32",
    description: "Codifica y decodifica texto y archivos en Base32 con múltiples variantes y opciones avanzadas.",
    href: "/tools/codificador-base32",
    category: "Codificación",
    keywords: ["base32", "codificar", "decodificar", "encoding", "decoding"],
  },
  {
    title: "Comparador de Archivos y Texto (Diff Viewer)",
    description: "Compara líneas entre dos textos o archivos. Vista dividida, ignorar espacios y exportar patch.",
    href: "/tools/comparador-archivos",
    category: "Utilidades",
    keywords: ["diff", "comparar", "comparador", "archivos", "texto", "patch"],
  },
  {
    title: "Contador de Caracteres",
    description: "Cuenta caracteres, palabras y analiza tu texto en tiempo real. Perfecto para redes sociales y SEO.",
    href: "/tools/contador-caracteres",
    category: "Análisis",
    keywords: ["contador", "caracteres", "palabras", "seo", "texto"],
  },
]

function isUrlLike(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return false
  if (trimmed.includes("http://") || trimmed.includes("https://")) return true
  return /(^|\s)([a-z0-9-]+\.)+[a-z]{2,}([/\s]|$)/i.test(trimmed)
}

function containsAny(haystack: string, needles: string[]) {
  return needles.some((n) => haystack.includes(n))
}

function scoreToolMatch(q: string, tool: SiteTool) {
  const title = normalize(tool.title)
  const desc = normalize(tool.description)
  const keywords = tool.keywords.map(normalize)

  let score = 0
  if (q.includes(title)) score += 6
  if (keywords.some((k) => k && q.includes(k))) score += 3
  if (q.split(/\s+/).some((w) => w.length >= 4 && title.includes(w))) score += 2
  if (q.split(/\s+/).some((w) => w.length >= 4 && desc.includes(w))) score += 1
  return score
}

function formatSuggestionList(items: Array<{ title: string; url: string; extra?: string }>) {
  return items.map((i) => `- ${i.title}${i.extra ? ` — ${i.extra}` : ""}\n  ${i.url}`).join("\n")
}

function normalizeForCompare(text: string) {
  return normalize(text).replace(/\s+/g, " ").trim()
}

function isLowInfoFollowUp(text: string) {
  const q = normalizeForCompare(text)
  const lowInfo = [
    "ok",
    "vale",
    "listo",
    "bien",
    "perfecto",
    "dale",
    "si",
    "sí",
    "no",
    "eso",
    "y",
    "y?",
    "y eso",
    "y eso?",
    "y ahora",
    "y ahora?",
    "entonces",
    "entonces?",
  ]
  return q.length <= 8 || lowInfo.includes(q)
}

function isConfusionSignal(text: string) {
  const q = normalize(text)
  return (
    q.includes("no entiendo") ||
    q.includes("no me queda claro") ||
    q.includes("no se") ||
    q.includes("no sé") ||
    q.includes("confuso") ||
    q.includes("explica") ||
    q.includes("explicame") ||
    q.includes("explícame")
  )
}

function detectSensitive(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return null

  const lowered = normalize(trimmed)
  const hasPasswordSignals =
    lowered.includes("mi contraseña") ||
    lowered.includes("mi contrasena") ||
    lowered.includes("password") ||
    lowered.includes("clave es") ||
    lowered.includes("pass es") ||
    lowered.includes("usuario y contraseña") ||
    lowered.includes("user y password")

  const hasSeedSignals =
    lowered.includes("seed") ||
    lowered.includes("seed phrase") ||
    lowered.includes("frase semilla") ||
    lowered.includes("mnemonic") ||
    lowered.includes("mnemonica") ||
    lowered.includes("mnemonics") ||
    lowered.includes("12 palabras") ||
    lowered.includes("24 palabras")

  const looksLikeMnemonic =
    trimmed.split(/\s+/).length >= 12 &&
    trimmed.split(/\s+/).length <= 30 &&
    !trimmed.includes(".") &&
    !trimmed.includes(",") &&
    trimmed.split(/\s+/).every((w) => w.length >= 3 && /^[a-zA-Z]+$/.test(w))

  const looksLikePrivateKey =
    /-----BEGIN( RSA)? PRIVATE KEY-----/.test(trimmed) ||
    /^0x[a-fA-F0-9]{64}$/.test(trimmed) ||
    /^[A-Za-z0-9+/]{40,}={0,2}$/.test(trimmed)

  if (hasPasswordSignals) return "password"
  if (hasSeedSignals || looksLikeMnemonic) return "seed"
  if (looksLikePrivateKey) return "private_key"
  return null
}

function toolNextQuestion(href: string) {
  if (href === "/tools/verificador") return "¿Quieres que revisemos una URL específica o entender cómo interpretar el score?"
  if (href === "/tools/generador-hash") return "¿Vas a hashear texto o un archivo (y qué algoritmo: SHA-256, SHA-1, MD5)?"
  if (href === "/tools/cifrado-online") return "¿Quieres cifrar o descifrar, y es un texto corto o un mensaje largo?"
  if (href === "/tools/limpia-metadatos") return "¿Es una imagen, PDF o documento? Te digo qué metadatos suelen quedar."
  if (href === "/tools/generador-contrasenas") return "¿La contraseña es para un servicio personal o corporativo (longitud y restricciones)?"
  if (href === "/tools/generador-credenciales") return "¿Quieres usuario+contraseña determinísticos para cuántas cuentas?"
  if (href === "/tools/generador-qr") return "¿El QR es para URL, texto o contacto (vCard)?"
  if (href === "/tools/codificador-base32") return "¿Quieres codificar o decodificar, y es texto o archivo?"
  if (href === "/tools/comparador-archivos") return "¿Quieres comparar texto, archivos o generar un patch?"
  if (href === "/tools/contador-caracteres") return "¿Es para redes/SEO? Puedo ayudarte a ajustar el texto."
  return "¿Qué objetivo tienes exactamente y con qué tipo de dato estás trabajando (texto, archivo o URL)?"
}

function normalizeText(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function searchInText(searchTerm: string, text: string): boolean {
  const normalizedSearch = normalizeText(searchTerm)
  const normalizedText = normalizeText(text)
  return normalizedText.includes(normalizedSearch)
}

async function searchSite(query: string): Promise<SearchResult[]> {
  const searchTerm = query.trim()
  if (searchTerm.length < 2) return []

  const results: SearchResult[] = []

  try {
    const blogs = await BlogService.getAllPosts()
    const blogResults: SearchResult[] = blogs
      .filter(
        (blog) =>
          searchInText(searchTerm, blog.title) ||
          searchInText(searchTerm, blog.excerpt) ||
          searchInText(searchTerm, blog.category) ||
          blog.tags.some((tag) => searchInText(searchTerm, tag))
      )
      .slice(0, 6)
      .map((blog) => ({
        id: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        type: "blog" as const,
        url: `/blog/${blog.slug}`,
        category: blog.category,
      }))

    results.push(...blogResults)
  } catch {
  }

  try {
    const products = await ProductService.getAllProducts()
    const productResults: SearchResult[] = products
      .filter(
        (product) =>
          searchInText(searchTerm, product.name) ||
          searchInText(searchTerm, product.description) ||
          searchInText(searchTerm, product.category)
      )
      .slice(0, 6)
      .map((product) => ({
        id: String(product.id),
        title: product.name,
        excerpt: product.description,
        type: "product" as const,
        url: `/productos/${product.id}`,
        category: product.category,
      }))

    results.push(...productResults)
  } catch {
  }

  const pageResults: SearchResult[] = staticPages
    .filter(
      (page) =>
        searchInText(searchTerm, page.title) ||
        searchInText(searchTerm, page.excerpt) ||
        searchInText(searchTerm, page.category ?? "")
    )
    .slice(0, 6)
    .map((page) => ({ ...page, type: "page" as const }))

  results.push(...pageResults)

  const typeOrder = { page: 0, blog: 1, product: 2 } as const
  const sorted = results.sort((a, b) => {
    const aExactTitle = normalizeText(a.title).includes(normalizeText(searchTerm))
    const bExactTitle = normalizeText(b.title).includes(normalizeText(searchTerm))

    if (aExactTitle && !bExactTitle) return -1
    if (!aExactTitle && bExactTitle) return 1
    return typeOrder[a.type] - typeOrder[b.type]
  })

  const seen = new Set<string>()
  return sorted.filter((r) => (seen.has(r.url) ? false : (seen.add(r.url), true))).slice(0, 8)
}

function buildDenyReply() {
  return "Como asistente de TecnoCrypter, mi enfoque es la Defensa Digital (Blue Team). No proporciono soporte para actividades ofensivas o ilegales. Te invito a leer nuestras guías de seguridad para proteger tus propios sistemas."
}

function isClearlyMalicious(q: string) {
  const hardDeny = [
    "hackear",
    "hackear una cuenta",
    "robar",
    "phishing",
    "malware",
    "ransomware",
    "ddos",
    "botnet",
    "keylogger",
    "exploit",
    "explotar",
    "inyeccion",
    "sql injection",
    "xss",
    "csrf",
    "bypass",
    "crackear",
    "password cracking",
    "carding",
    "clonar tarjeta",
    "fraude",
  ]

  const defensive = ["prevenir", "proteger", "mitigar", "defender", "mejores practicas", "buenas practicas", "seguridad"]
  const asksHow = ["como ", "cómo ", "paso a paso", "script", "payload", "comando", "exploit", "metasploit"]

  const hasBad = containsAny(q, hardDeny)
  if (!hasBad) return false

  const isDefenseContext = containsAny(q, defensive) && !containsAny(q, asksHow)
  return !isDefenseContext
}

async function buildReply(args: { message: string; path?: string | null; history?: IncomingMessage[]; baseUrl: string }) {
  const raw = args.message.trim()
  const abs = (p: string) => toAbsoluteUrl(args.baseUrl, p)
  const history = Array.isArray(args.history) ? args.history : []
  const lastUser = [...history]
    .reverse()
    .find((m) => m?.role === "user" && typeof m.content === "string" && m.content.trim())?.content
  const lastAssistant = [...history]
    .reverse()
    .find((m) => m?.role === "assistant" && typeof m.content === "string" && m.content.trim())?.content
  const effectiveRaw = raw.length < 12 && lastUser && lastUser.trim() !== raw ? `${lastUser.trim()} ${raw}` : raw
  const q = normalize(effectiveRaw)
  const lastAssistantNorm = typeof lastAssistant === "string" ? normalizeForCompare(lastAssistant) : ""
  const finalize = (reply: string) => {
    if (!lastAssistantNorm) return reply
    return normalizeForCompare(reply) === lastAssistantNorm
      ? `${reply}\n\nSi esto no es lo que buscas, dime qué parte te interesa (herramienta, guía del blog o servicio) y tu objetivo.`
      : reply
  }

  const sensitive = detectSensitive(raw)
  if (sensitive) {
    return finalize(
      "🛑 **Alerta de privacidad**\n\n" +
        "No compartas contraseñas, seed phrases o claves privadas en hilos de IA.\n\n" +
        "🛡️ Si necesitas **enviar un secreto**, usa **Cifrado Online**:\n" +
        `- ${abs("/tools/cifrado-online")}\n` +
        "- Envía el texto cifrado por un canal y la clave por **otro canal**.\n\n" +
        "🔒 Recuerda: en TecnoCrypter las herramientas corren **client-side** en tu navegador. **Nada sube a la nube.**"
    )
  }

  if (isConfusionSignal(raw) && typeof lastAssistant === "string" && lastAssistant.trim()) {
    if (lastAssistant.includes("/tools/verificador")) {
      return finalize(
        "Perfecto, lo aclaro con el Verificador de URL:\n" +
          `1) Ve a ${abs("/tools/verificador")}\n` +
          "2) Pega la URL y ejecuta el análisis\n" +
          "3) Revisa `malicious`/`suspicious` y el score\n\n" +
          "Si me pegas el resultado (stats/score) o me dices qué tipo de enlace es, te digo qué significa y qué hacer."
      )
    }

    if (lastAssistant.includes("/tools/generador-hash")) {
      return finalize(
        "Sobre hashes: sirven para verificar integridad (que un archivo no cambió).\n" +
          `1) Ve a ${abs("/tools/generador-hash")}\n` +
          "2) Elige algoritmo (recomendado: SHA-256)\n" +
          "3) Pega texto o sube el archivo y compara el hash con el de referencia\n\n" +
          "Dime si es texto o archivo y cuál algoritmo necesitas."
      )
    }

    if (lastAssistant.includes("/tools/cifrado-online")) {
      return finalize(
        "Cifrado online:\n" +
          `1) Ve a ${abs("/tools/cifrado-online")}\n` +
          "2) Define si vas a cifrar o descifrar\n" +
          "3) Usa una clave compartida fuerte y no la envíes por el mismo canal que el mensaje\n\n" +
          "¿Quieres cifrar o descifrar, y es un texto corto o un mensaje largo?"
      )
    }

    return finalize(
      "Dime qué parte no te queda clara: ¿quieres encontrar una página del sitio, usar una herramienta o cotizar un servicio? " +
        "Si me copias tu pregunta exacta, lo enfoco mejor."
    )
  }

  if (isLowInfoFollowUp(raw)) {
    const menu =
      "⚙️ **¿Qué hacemos ahora?**\n\n" +
      `- 🧪 Usar una herramienta: ${abs("/tools")}\n` +
      `- 📚 Leer guías/noticias: ${abs("/blog")}\n` +
      `- 💻 Ver servicios/cotizar: ${abs("/productos")}\n\n` +
      "Dime cuál opción y tu objetivo."
    return finalize(menu)
  }

  if (q === "hola" || q.startsWith("hola ") || q === "buenas" || q.includes("buenos dias") || q.includes("buenas tardes") || q.includes("buenas noches")) {
    return finalize(
      "🚀 **TecnoBot online** — Voz oficial de **TecnoCrypter**\n\n" +
        "Puedo ayudarte con **ciberseguridad**, **criptografía** y **privacidad digital**.\n\n" +
        "Accesos rápidos:\n" +
        `- 🧪 Herramientas: ${abs("/tools")}\n` +
        `- 📚 Blog: ${abs("/blog")}\n` +
        `- 💻 Servicios: ${abs("/productos")}\n` +
        `- 🔒 Legal: ${abs("/privacidad")}, ${abs("/terminos")}, ${abs("/cookies")}`
    )
  }

  if (q === "gracias" || q.includes("muchas gracias") || q.includes("gracias!")) {
    return finalize("✅ Listo. Dime qué quieres hacer ahora: 🧪 herramienta, 📚 blog o 💻 servicio.")
  }

  if (isClearlyMalicious(q)) {
    return finalize(`🛡️ ${buildDenyReply()}\n\nPuedes explorar /seguridad y /blog para guías defensivas.`)
  }

  const asksToolsList =
    q.includes("/tools") ||
    q === "tools" ||
    ((q.includes("herramienta") || q.includes("herramientas")) &&
      (q.includes("que ") || q.includes("qué ") || q.includes("cuales") || q.includes("cuáles") || q.includes("hay") || q.includes("lista")))

  if (asksToolsList) {
    const list = formatSuggestionList(tools.map((t) => ({ title: t.title, url: abs(t.href), extra: t.description })))
    return finalize(
      "En `/tools` tienes estas herramientas:\n\n" +
        list +
        "\n\n🔒 Recuerda: funcionan **client-side** en tu navegador. **Nada sube a la nube.**\n\n" +
        "Dime tu objetivo (contraseñas, metadatos, URL sospechosa, cifrar, hashes, etc.) y te recomiendo la mejor."
    )
  }

  const matchedTools = tools
    .map((t) => ({ tool: t, score: scoreToolMatch(q, t) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (matchedTools.length > 0) {
    const primary = matchedTools[0]?.tool
    if (primary) {
      const more = matchedTools.slice(1).map((m) => m.tool)
      const suggestionItems = [
        { title: primary.title, url: abs(primary.href), extra: primary.description },
        ...more.map((t) => ({ title: t.title, url: abs(t.href), extra: t.description })),
      ]
      return finalize(
        `🧪 **Herramienta recomendada (Client-Side Execution)**\n\n${formatSuggestionList(suggestionItems)}\n\n` +
          "🔑 Recuerda: el procesamiento ocurre en **TU navegador**. **Nada sube a la nube.**\n\n" +
          `⚙️ ${toolNextQuestion(primary.href)}`
      )
    }
  }

  const systemPrompt = await getSystemPrompt()
  const contents: GeminiContent[] = history
    .map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: typeof m.content === "string" ? m.content : "" }],
    }))
    .filter((m) => m.parts[0]?.text.trim())

  const last = contents[contents.length - 1]
  const lastText = last?.parts?.[0]?.text ?? ""
  if (!last || last.role !== "user" || lastText.trim() !== raw) {
    contents.push({ role: "user", parts: [{ text: raw }] })
  }

  const contentsWithPrompt = [...contents]
  const firstUserIndex = contentsWithPrompt.findIndex((c) => c.role === "user" && (c.parts[0]?.text ?? "").trim())
  if (firstUserIndex === -1) {
    contentsWithPrompt.unshift({ role: "user", parts: [{ text: systemPrompt }] })
  } else {
    const first = contentsWithPrompt[firstUserIndex]
    const firstText = first?.parts?.[0]?.text ?? ""
    contentsWithPrompt[firstUserIndex] = {
      role: "user",
      parts: [{ text: `${systemPrompt}\n\n${firstText}` }],
    }
  }

  const llmReply = await callGemini({ contents: contentsWithPrompt })

  if (llmReply) return finalize(llmReply)

  if (q.includes("que es tecnocrypter") || q.includes("que es tecnocrypter?") || q.includes("quien es tecnocrypter") || q.includes("quienes son")) {
    return (
      "🛡️ **TecnoCrypter** es una plataforma de ciberseguridad y privacidad con enfoque **privacy-first**.\n\n" +
      "- 🧪 Herramientas **client-side**: se ejecutan en tu navegador. **Nada sube a la nube.**\n" +
      "- 📚 Centro de conocimiento: `/blog` (guías y tutoriales)\n" +
      "- 💻 Servicios: `/productos`\n\n" +
      "Dime tu objetivo y te guío."
    )
  }

  if (q.includes("privacidad") || q.includes("datos personales") || q.includes("ley 1581") || q.includes("tratamiento de datos")) {
    return (
      "🔒 **Procesamiento Local (Zero-Knowledge)**\n\n" +
      "1) Cargas el archivo o texto\n" +
      "2) El script (JS/TS) corre en tu navegador\n" +
      "3) Descargas el resultado localmente\n" +
      "4) *Nada sube a la nube.*\n\n" +
      "Detalles legales en `/privacidad`. ¿Tu duda es sobre datos recolectados, finalidades o derechos?"
    )
  }

  if (q.includes("terminos") || q.includes("términos") || q.includes("servicio") || q.includes("uso permitido") || q.includes("uso prohibido")) {
    return (
      "Los términos están en `/terminos`. En resumen: uso lícito, sin vulnerar seguridad o privacidad de terceros, " +
      "y prohibición de actividades como acceso no autorizado, phishing/malware, DDoS, scraping no autorizado o explotación de vulnerabilidades. " +
      "Si quieres, dime qué caso estás evaluando y te digo qué sección aplica."
    )
  }

  if (q.includes("cookies")) {
    return finalize(
      `La política de cookies está en ${abs("/cookies")}. En general: cookies técnicas necesarias y, si aceptas, cookies opcionales para analítica anónima.`
    )
  }

  if (q.includes("contacto") || q.includes("soporte") || q.includes("email") || q.includes("correo") || q.includes("telefono") || q.includes("tel")) {
    return finalize(`Contacto y soporte en ${abs("/contacto")}.`)
  }

  if (q.includes("vulnerabilidad") || q.includes("responsable") || q.includes("responsible disclosure") || q.includes("reportar")) {
    return finalize("Si detectas una vulnerabilidad, repórtala por divulgación responsable a `security@tecnocrypter.com` (ver `/terminos`).")
  }

  if (isUrlLike(raw) || q.includes("verificador") || q.includes("virustotal") || q.includes("url") || q.includes("enlace") || q.includes("link")) {
    return finalize(
      `Para evaluar un enlace sospechoso usa el Verificador de URL: ${abs("/tools/verificador")}. ` +
      "Si pegas la URL (o el dominio) y me dices qué te preocupa (phishing, suplantación, descargas), te explico cómo interpretar el resultado y qué señales revisar."
    )
  }

  if (q.includes("productos") || q.includes("comprar") || q.includes("tienda") || q.includes("cotizacion") || q.includes("cotización") || q.includes("plan")) {
    return (
      "Para servicios y cotizaciones, revisa `/productos`. Ofrece categorías como Desarrollo Web, Capacitaciones, IA Segura, " +
      "Ciberseguridad y Respuesta a Incidentes. Si me dices si es personal o empresarial y el objetivo, te recomiendo por dónde empezar."
    )
  }

  if (q.includes("blog") || q.includes("articulo") || q.includes("articulos") || q.includes("artículo") || q.includes("post") || q.includes("leer")) {
    return "El contenido editorial está en `/blog`. Puedes filtrar por categorías: `seguridad`, `encriptacion`, `criptomonedas`, `noticias`."
  }

  if (q.includes("encriptacion") || q.includes("encriptación") || q.includes("cifrado")) {
    return "Para guías y artículos de cifrado: `/encriptacion`. Para cifrar un mensaje rápido: `/tools/cifrado-online`."
  }

  if (q.includes("seguridad") || q.includes("ciberseguridad") || q.includes("phishing") || q.includes("ransomware")) {
    return (
      "Puedes empezar en `/seguridad` (soluciones personales y empresariales) y en `/blog` (guías y buenas prácticas). " +
      "Si tu caso es un correo/enlace sospechoso, usa `/tools/verificador`."
    )
  }

  if (q.includes("criptomonedas") || q.includes("crypto") || q.includes("bitcoin") || q.includes("ethereum") || q.includes("blockchain")) {
    return "Contenido cripto en `/criptomonedas` y actualidad en `/noticias`. Si me dices el tema (wallets, riesgos, trading, seguridad), te sugiero lecturas."
  }

  const results = await searchSite(effectiveRaw)
  if (results.length > 0) {
    const top = results.slice(0, 6).map((r) => ({
      title: r.title,
      url: r.url,
      extra: r.type === "blog" ? "Blog" : r.type === "product" ? "Producto/Servicio" : "Página",
    }))

    return finalize(
      `Encontré estas páginas relacionadas:\n${formatSuggestionList(top)}\n\n` +
        "¿Tu objetivo es aprender (blog), usar una herramienta (tools) o cotizar un servicio (productos)?"
    )
  }

  return finalize(
    "Puedo ayudarte con información y navegación dentro de TecnoCrypter. " +
    "Prueba con una de estas rutas: `/tools`, `/blog`, `/productos`, `/seguridad`, `/encriptacion`, `/criptomonedas`, `/privacidad`, `/terminos`, `/cookies`, `/contacto`."
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: string
      path?: string
      history?: IncomingMessage[]
    }

    const message = typeof body.message === "string" ? body.message.trim() : ""
    if (!message) {
      return NextResponse.json({ reply: "Escribe una pregunta para poder ayudarte." }, { status: 400 })
    }

    const baseUrl = getBaseUrlFromRequest(request)
    const reply = await buildReply({ message, path: body.path ?? null, history: body.history ?? [], baseUrl })
    return NextResponse.json({ reply, path: body.path ?? null })
  } catch {
    return NextResponse.json({ reply: "Error procesando la solicitud." }, { status: 400 })
  }
}
