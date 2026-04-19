'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, Plus, Trash2, Download, Copy, Check } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

export default function GeneradorCsvClient() {
  const [headers, setHeaders] = useState<string[]>(['Nombre', 'Email', 'Teléfono'])
  const [rows, setRows] = useState<string[][]>([['', '', '']])
  const [separator, setSeparator] = useState(',')
  const [copied, setCopied] = useState(false)

  const addColumn = () => {
    setHeaders([...headers, `Columna ${headers.length + 1}`])
    setRows(rows.map(r => [...r, '']))
  }

  const removeColumn = (idx: number) => {
    if (headers.length <= 1) return
    setHeaders(headers.filter((_, i) => i !== idx))
    setRows(rows.map(r => r.filter((_, i) => i !== idx)))
  }

  const addRow = () => setRows([...rows, Array(headers.length).fill('')])

  const removeRow = (idx: number) => {
    if (rows.length <= 1) return
    setRows(rows.filter((_, i) => i !== idx))
  }

  const updateHeader = (idx: number, value: string) => {
    const h = [...headers]; h[idx] = value; setHeaders(h)
  }

  const updateCell = (row: number, col: number, value: string) => {
    const r = [...rows]; r[row] = [...r[row]]; r[row][col] = value; setRows(r)
  }

  const escapeField = (field: string) => {
    if (field.includes(separator) || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`
    }
    return field
  }

  const generateCSV = () => {
    const lines = [headers.map(escapeField).join(separator)]
    rows.forEach(r => lines.push(r.map(escapeField).join(separator)))
    return lines.join('\n')
  }

  const csv = generateCSV()

  const copyCSV = () => {
    navigator.clipboard.writeText(csv)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'datos.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const addSampleData = () => {
    setHeaders(['Nombre', 'Email', 'Ciudad', 'Edad'])
    setRows([
      ['Ana García', 'ana@ejemplo.com', 'Madrid', '28'],
      ['Carlos López', 'carlos@ejemplo.com', 'Barcelona', '35'],
      ['María Ruiz', 'maria@ejemplo.com', 'Valencia', '42'],
      ['Pedro Martín', 'pedro@ejemplo.com', 'Sevilla', '31'],
    ])
  }

  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Table className="h-5 w-5 text-primary" /> Generador de Tablas CSV</CardTitle>
            <CardDescription>Crea tablas de datos y expórtalas como CSV. Edita celdas directamente en el navegador.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Label className="text-xs">Separador:</Label>
                {[{ id: ',', label: 'Coma' }, { id: ';', label: 'P. y coma' }, { id: '\t', label: 'Tab' }].map(s => (
                  <button key={s.id} onClick={() => setSeparator(s.id)}
                    className={`text-xs px-2 py-1 rounded border ${separator === s.id ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addSampleData}>Datos de ejemplo</Button>
              <Button variant="outline" size="sm" onClick={addColumn}><Plus className="h-3 w-3 mr-1" /> Columna</Button>
              <Button variant="outline" size="sm" onClick={addRow}><Plus className="h-3 w-3 mr-1" /> Fila</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="p-1 w-8"></th>
                    {headers.map((h, i) => (
                      <th key={i} className="p-1">
                        <div className="flex gap-1">
                          <Input value={h} onChange={(e) => updateHeader(i, e.target.value)} className="h-8 text-xs font-bold" spellCheck={false} />
                          {headers.length > 1 && (
                            <button onClick={() => removeColumn(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri}>
                      <td className="p-1 text-center">
                        {rows.length > 1 && (
                          <button onClick={() => removeRow(ri)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
                        )}
                      </td>
                      {row.map((cell, ci) => (
                        <td key={ci} className="p-1">
                          <Input value={cell} onChange={(e) => updateCell(ri, ci, e.target.value)} className="h-8 text-xs font-mono" spellCheck={false} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2">
              <Button onClick={downloadCSV}><Download className="h-4 w-4 mr-1" /> Descargar CSV</Button>
              <Button variant="outline" onClick={copyCSV}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />} Copiar
              </Button>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Vista previa</Label>
              <div className="p-3 rounded-lg bg-muted/50 overflow-x-auto">
                <pre className="text-xs font-mono whitespace-pre">{csv}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de Tablas CSV Online: Crea y Exporta Datos"
          paragraphs={[
            "CSV (Comma-Separated Values) es el formato universal para intercambiar datos tabulares entre aplicaciones. Nuestro generador te permite crear tablas visualmente y exportar CSV perfecto.",
            "Edita cabeceras y celdas directamente, añade o elimina filas y columnas, y elige el separador (coma, punto y coma o tabulador). Los campos con caracteres especiales se escapan automáticamente.",
            "Ideal para crear datos de prueba, preparar importaciones a Excel/Google Sheets/bases de datos, o generar datasets de ejemplo para desarrollo y testing."
          ]}
          howTo={[
            { step: "Define las columnas", description: "Edita los nombres de las cabeceras o usa los datos de ejemplo." },
            { step: "Rellena las celdas", description: "Introduce los datos directamente en la tabla visual." },
            { step: "Exporta el CSV", description: "Descarga el archivo o copia el contenido CSV al portapapeles." },
          ]}
          faqs={[
            { question: "¿Qué separador debo usar?", answer: "Coma (,) es el estándar internacional. En España, Excel usa punto y coma (;) porque la coma es separador decimal. Tabulador es útil para pegado directo en hojas de cálculo." },
            { question: "¿Se manejan correctamente los campos con comas?", answer: "Sí. Si un campo contiene el separador, comillas o saltos de línea, se envuelve automáticamente entre comillas dobles según el RFC 4180." },
            { question: "¿Puedo importar un CSV existente?", answer: "Esta herramienta está diseñada para crear CSVs desde cero. Para editar CSVs existentes, ábrelos directamente en Excel o Google Sheets." },
          ]}
          relatedTools={[
            { name: "Contador de Caracteres", href: "/tools/contador-caracteres" },
            { name: "Conversor Markdown", href: "/tools/conversor-markdown" },
            { name: "Calculadora de Porcentajes", href: "/tools/calculadora-porcentajes" },
            { name: "Validador JSON", href: "/tools/validador-json" },
          ]}
        />
      </div>
    </div>
  )
}
