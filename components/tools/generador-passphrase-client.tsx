'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen, Copy, Check, RefreshCw, Dice5 } from 'lucide-react'
import { ToolSeoSection } from './tool-seo-section'

const WORDLIST_ES = [
  'águila','ancla','barco','brisa','campo','cielo','danza','delta','espada','fénix',
  'globo','hierro','isla','jaguar','karma','lanza','mango','nieve','océano','pluma',
  'queso','rayo','sable','tigre','uva','viento','yate','zafiro','alma','bronce',
  'cobre','dragón','eclipse','flecha','glaciar','huracán','índigo','jade','kiwi','lava',
  'magma','nube','ópalo','pirata','rubí','selva','tornado','umbral','volcán','zinc',
  'aura','bosque','coral','diamante','estrella','fuego','gema','hielo','iris','jungla',
  'koala','luna','mármol','nexo','oliva','prisma','quinteto','río','sol','trueno',
  'urdimbre','vapor','whisky','xenón','yoga','zorro','acero','bambú','cactus','delfín',
]

const WORDLIST_EN = [
  'apple','beach','cloud','dream','eagle','flame','grape','honey','ivory','jewel',
  'karma','lemon','maple','north','ocean','pearl','quest','river','stone','tiger',
  'ultra','violet','water','xenon','youth','zebra','arrow','blaze','crane','delta',
  'ember','frost','globe','haven','index','joker','knave','lotus','moose','noble',
  'orbit','pilot','quartz','raven','solar','thorn','unity','vivid','whale','zephyr',
  'amber','brave','cedar','drift','epoch','forge','ghost','haste','inbox','judge',
  'kneel','light','mirth','nerve','oxide','plume','quirk','reign','spire','tempo',
  'usher','vault','wrist','yacht','zenith','alloy','badge','charm','dwarf','exile',
]

function generatePassphrase(wordCount: number, separator: string, capitalize: boolean, addNumber: boolean, lang: 'es' | 'en'): string {
  const wordlist = lang === 'es' ? WORDLIST_ES : WORDLIST_EN
  const words: string[] = []
  const bytes = new Uint32Array(wordCount)
  crypto.getRandomValues(bytes)
  for (let i = 0; i < wordCount; i++) {
    let word = wordlist[bytes[i] % wordlist.length]
    if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1)
    words.push(word)
  }
  let result = words.join(separator)
  if (addNumber) {
    const numBytes = new Uint8Array(1)
    crypto.getRandomValues(numBytes)
    result += separator + (numBytes[0] % 100).toString().padStart(2, '0')
  }
  return result
}

function estimateEntropy(wordCount: number, poolSize: number, addNumber: boolean): number {
  let bits = wordCount * Math.log2(poolSize)
  if (addNumber) bits += Math.log2(100)
  return bits
}

export default function GeneradorPassphraseClient() {
  const [wordCount, setWordCount] = useState(5)
  const [separator, setSeparator] = useState('-')
  const [capitalize, setCapitalize] = useState(true)
  const [addNumber, setAddNumber] = useState(true)
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [passphrase, setPassphrase] = useState('')
  const [copied, setCopied] = useState(false)

  const poolSize = lang === 'es' ? WORDLIST_ES.length : WORDLIST_EN.length
  const entropy = estimateEntropy(wordCount, poolSize, addNumber)

  const generate = useCallback(() => {
    setPassphrase(generatePassphrase(wordCount, separator, capitalize, addNumber, lang))
  }, [wordCount, separator, capitalize, addNumber, lang])

  const copy = () => {
    navigator.clipboard.writeText(passphrase)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Generador de Passphrase</CardTitle>
            <CardDescription>Crea contraseñas memorables combinando palabras aleatorias al estilo Diceware.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Palabras</Label>
                <Input type="number" min={3} max={10} value={wordCount} onChange={(e) => setWordCount(Math.max(3, Math.min(10, parseInt(e.target.value) || 5)))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Separador</Label>
                <div className="flex gap-1">
                  {['-', '.', '_', ' '].map(s => (
                    <button key={s} onClick={() => setSeparator(s)}
                      className={`flex-1 p-2 rounded border text-sm font-mono ${separator === s ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      {s === ' ' ? '␣' : s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Idioma</Label>
                <div className="flex gap-1">
                  {[{ id: 'es' as const, label: '🇪🇸' }, { id: 'en' as const, label: '🇬🇧' }].map(l => (
                    <button key={l.id} onClick={() => setLang(l.id)}
                      className={`flex-1 p-2 rounded border text-lg ${lang === l.id ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Opciones</Label>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                    <input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} className="rounded" /> Mayúsculas
                  </label>
                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                    <input type="checkbox" checked={addNumber} onChange={(e) => setAddNumber(e.target.checked)} className="rounded" /> +Número
                  </label>
                </div>
              </div>
            </div>

            <Button onClick={generate} className="w-full"><Dice5 className="h-4 w-4 mr-2" /> Generar passphrase</Button>

            {passphrase && (
              <div className="text-center space-y-3">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-xl md:text-2xl font-mono font-bold text-primary break-all">{passphrase}</div>
                </div>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>Entropía: <strong className="text-foreground">{entropy.toFixed(1)} bits</strong></span>
                  <span>{passphrase.length} caracteres</span>
                  <Button variant="outline" size="sm" onClick={copy}>
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />} Copiar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolSeoSection
          title="Generador de Passphrase Diceware: Contraseñas Memorables y Seguras"
          paragraphs={[
            "Una passphrase es una contraseña formada por varias palabras aleatorias. Son más fáciles de recordar que contraseñas aleatorias de caracteres y, con suficientes palabras, igual de seguras o más.",
            "El método Diceware selecciona palabras al azar de una lista usando entropía criptográfica. Con 5 palabras de un diccionario de 80 términos, se obtienen ~32 bits de entropía por palabra, sumando ~160 bits total.",
            "Las passphrases son recomendadas por NIST SP 800-63B y expertos como Bruce Schneier. 'Águila-Selva-Prisma-Río-42' es mucho más fácil de recordar que 'xK9#mP2$vL' y significativamente más segura."
          ]}
          howTo={[
            { step: "Configura las opciones", description: "Elige número de palabras, separador, idioma y si añadir mayúsculas/números." },
            { step: "Genera la passphrase", description: "Se seleccionan palabras aleatorias con entropía criptográfica." },
            { step: "Memoriza y almacena", description: "Memoriza la passphrase y guárdala como respaldo en tu gestor de contraseñas." },
          ]}
          faqs={[
            { question: "¿Cuántas palabras necesito?", answer: "4 palabras (~25 bits) para cuentas básicas. 5-6 palabras (~32-38 bits) para email y redes. 7+ palabras para cuentas bancarias y claves maestras. Más palabras = más seguro." },
            { question: "¿Es mejor una passphrase que una contraseña aleatoria?", answer: "En seguridad por carácter, no. Pero en práctica, sí: las passphrases son más largas y memorables. Una passphrase de 5 palabras tiene ~30+ caracteres y alta entropía." },
            { question: "¿Por qué añadir un número?", answer: "Añade ~6.6 bits extra de entropía y cumple los requisitos de complejidad de sitios que exigen números. También protege contra ataques de diccionario puro." },
          ]}
          relatedTools={[
            { name: "Generador de Contraseñas", href: "/tools/generador-contrasenas" },
            { name: "Calculadora de Entropía", href: "/tools/calculadora-entropia" },
            { name: "Verificador de Contraseñas", href: "/tools/verificador-contrasenas" },
            { name: "Generador de Credenciales", href: "/tools/generador-credenciales" },
          ]}
        />
      </div>
    </div>
  )
}
