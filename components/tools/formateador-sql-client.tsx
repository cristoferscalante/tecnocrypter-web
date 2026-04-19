'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Database, Copy, Check, Eraser } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const KEYWORDS = new Set([
  'SELECT','FROM','WHERE','AND','OR','NOT','INSERT','INTO','VALUES','UPDATE','SET',
  'DELETE','CREATE','TABLE','ALTER','DROP','INDEX','VIEW','JOIN','INNER','LEFT','RIGHT',
  'OUTER','FULL','CROSS','ON','AS','IN','BETWEEN','LIKE','IS','NULL','ORDER','BY',
  'GROUP','HAVING','LIMIT','OFFSET','UNION','ALL','DISTINCT','EXISTS','CASE','WHEN',
  'THEN','ELSE','END','COUNT','SUM','AVG','MIN','MAX','IF','PRIMARY','KEY','FOREIGN',
  'REFERENCES','CONSTRAINT','DEFAULT','CHECK','UNIQUE','AUTO_INCREMENT','CASCADE','TRIGGER',
  'PROCEDURE','FUNCTION','BEGIN','COMMIT','ROLLBACK','GRANT','REVOKE','WITH','RECURSIVE',
])

function formatSQL(sql: string): string {
  if (!sql.trim()) return ''

  let result = sql.trim()

  // Normalize whitespace
  result = result.replace(/\s+/g, ' ')

  // Major clause keywords on new line
  const majorKeywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY',
    'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'INNER JOIN', 'LEFT JOIN',
    'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'JOIN', 'ON', 'SET',
    'VALUES', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'CREATE TABLE',
    'ALTER TABLE', 'DROP TABLE',
  ]

  // Sort by length descending to match longer keywords first
  const sortedKw = [...majorKeywords].sort((a, b) => b.length - a.length)

  for (const kw of sortedKw) {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi')
    result = result.replace(regex, `\n${kw.toUpperCase()}`)
  }

  // Indent sub-clauses
  const lines = result.split('\n').filter(l => l.trim())
  const formatted: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    const upper = trimmed.toUpperCase()

    if (['AND', 'OR'].some(k => upper.startsWith(k + ' '))) {
      formatted.push('  ' + trimmed)
    } else if (['ON'].some(k => upper.startsWith(k + ' '))) {
      formatted.push('    ' + trimmed)
    } else {
      formatted.push(trimmed)
    }
  }

  // Add semicolon if missing
  let final = formatted.join('\n')
  if (!final.trimEnd().endsWith(';')) final += ';'

  return final
}

function minifySQL(sql: string): string {
  return sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
}

function highlightSQL(sql: string): string {
  return sql.replace(/\b([A-Z_]+)\b/g, (match) => {
    if (KEYWORDS.has(match)) return `<span class="text-primary font-bold">${match}</span>`
    return match
  })
}

export default function FormateadorSqlClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => setOutput(formatSQL(input))
  const minify = () => setOutput(minifySQL(input))

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> Formateador de SQL</CardTitle>
            <CardDescription>Formatea, indenta y embellece tus consultas SQL para mejor legibilidad.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>SQL de entrada</Label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="SELECT u.name, u.email, COUNT(o.id) as total_orders FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = 1 AND o.created_at > '2024-01-01' GROUP BY u.id ORDER BY total_orders DESC LIMIT 10"
                className="w-full h-40 p-3 text-sm font-mono rounded-md border bg-background resize-y"
                spellCheck={false}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={format} disabled={!input.trim()}>Formatear</Button>
              <Button variant="outline" onClick={minify} disabled={!input.trim()}>Minificar</Button>
              <Button variant="ghost" onClick={() => { setInput(''); setOutput('') }}><Eraser className="h-4 w-4 mr-1" /> Limpiar</Button>
            </div>

            {output && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Resultado</Label>
                  <Button variant="outline" size="sm" onClick={copy}>
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />} Copiar
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre" dangerouslySetInnerHTML={{ __html: highlightSQL(output) }} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Formateador de SQL Online: Embellece y Organiza Tus Consultas"
          paragraphs={[
            "Las consultas SQL complejas son difíciles de leer en una sola línea. Nuestro formateador organiza automáticamente tus queries con indentación correcta, separando cláusulas y subqueries.",
            "Soporta SELECT, INSERT, UPDATE, DELETE, JOINs, subconsultas, funciones de agregación y más. También incluye minificación para reducir el tamaño de queries en producción.",
            "Un SQL bien formateado es más fácil de depurar, revisar en code review y mantener. Sigue las convenciones estándar con keywords en mayúsculas y cláusulas en líneas separadas."
          ]}
          howTo={[
            { step: "Pega tu SQL", description: "Introduce la consulta SQL que quieres formatear." },
            { step: "Elige la acción", description: "Haz clic en Formatear para embellecer o Minificar para comprimir." },
            { step: "Copia el resultado", description: "El SQL formateado se resalta con colores por sintaxis." },
          ]}
          faqs={[
            { question: "¿Soporta todos los dialectos SQL?", answer: "Soporta la sintaxis SQL estándar (ANSI SQL) compatible con MySQL, PostgreSQL, SQLite, SQL Server y Oracle. Las extensiones específicas de cada motor se mantienen sin modificar." },
            { question: "¿Se envía mi SQL a algún servidor?", answer: "No. Todo el formateo se ejecuta en tu navegador. Tu SQL nunca sale de tu dispositivo." },
            { question: "¿Puedo formatear múltiples queries?", answer: "Sí. Puedes pegar varias consultas separadas por punto y coma y se formatearán individualmente." },
          ]}
          relatedTools={[
            { name: "Validador JSON", href: "/tools/validador-json" },
            { name: "Codificador Base64", href: "/tools/codificador-base64" },
            { name: "Minificador CSS/JS", href: "/tools/minificador-css" },
            { name: "Regex Tester", href: "/tools/regex-tester" },
          ]}
        />
      </div>
    </div>
  )
}
