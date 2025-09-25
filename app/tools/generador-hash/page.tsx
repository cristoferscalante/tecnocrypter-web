'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Copy, FileUp, RefreshCw, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

// Implementación de MD5 para navegadores
function md5(input: string): string {
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }

  function md5blk(s: number[]) {
    const md5blks = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s[i] + (s[i + 1] << 8) + (s[i + 2] << 16) + (s[i + 3] << 24);
    }
    return md5blks;
  }

  function md5blk_array(a: Uint8Array) {
    const md5blks = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
    }
    return md5blks;
  }

  function md51(s: string) {
    const n = s.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(md5ToArrayBuffer(s.substring(i - 64, i))));
    }
    
    s = s.substring(i - 64);
    const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    }
    
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) tail[i] = 0;
    }
    
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }

  function md51_array(a: Uint8Array) {
    const n = a.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    
    for (i = 64; i <= a.length; i += 64) {
      md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
    }
    
    const tail = new Uint8Array(64);
    
    for (let i = 0; i < a.length % 64; i++) {
      tail[i] = a[a.length - a.length % 64 + i];
    }
    
    tail[a.length % 64] = 0x80;
    
    if (a.length % 64 > 55) {
      md5cycle(state, md5blk_array(tail));
      for (i = 0; i < 64; i++) tail[i] = 0;
    }
    
    // Beware that the final length might not fit in 32 bits so we take care of that
    for (i = 0; i < 8; i++) tail[56 + i] = ((n * 8) >> (i * 8)) & 0xff;
    
    md5cycle(state, md5blk_array(tail));
    return state;
  }

  function md5ToArrayBuffer(str: string): number[] {
    const buf = new Array(str.length);
    for (let i = 0; i < str.length; i++) {
      buf[i] = str.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  function add32(a: number, b: number) {
    return (a + b) & 0xFFFFFFFF;
  }

  function hex(x: number[]) {
    let result = '';
    for (let i = 0; i < x.length; i++) {
      const hex = x[i].toString(16);
      result += ('0'.repeat(8 - hex.length) + hex).match(/.{2}/g)?.reverse().join('');
    }
    return result;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return hex(md51_array(data));
}

export default function GeneradorHash() {
  const [activeTab, setActiveTab] = useState<string>('texto');
  const [texto, setTexto] = useState<string>('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [algoritmo, setAlgoritmo] = useState<string>('md5');
  const [hashHex, setHashHex] = useState<string>('');
  const [hashBase64, setHashBase64] = useState<string>('');
  const [hashComparar, setHashComparar] = useState<string>('');
  const [resultados, setResultados] = useState<{[key: string]: string | boolean | null}>({});
  const [procesando, setProcesando] = useState<boolean>(false);
  const [progreso, setProgreso] = useState<number>(0);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Función para generar hash de texto
  const generarHashTexto = async () => {
    if (!texto) {
      setError('Por favor, introduce un texto para generar el hash');
      return;
    }

    setError(null);
    setProcesando(true);
    setProgreso(0);
    
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(texto);
      
      // Simulamos progreso para textos pequeños
      setProgreso(30);
      
      let hashHex = '';
      let hashBuffer;
      
      if (algoritmo === 'md5') {
        // Usamos nuestra implementación de MD5
        hashHex = md5(texto);
        
        // Creamos un ArrayBuffer para la conversión a Base64
        const tempArray = new Uint8Array(16);
        for (let i = 0; i < 32; i += 2) {
          tempArray[i/2] = parseInt(hashHex.substr(i, 2), 16);
        }
        hashBuffer = tempArray.buffer;
      } else if (algoritmo === 'sha1') {
        hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } else if (algoritmo === 'sha256') {
        hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
      
      setProgreso(70);
      
      // Convertir a Base64
      const hashBase64 = algoritmo === 'md5' 
        ? btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
        : btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
      
      setProgreso(90);
      
      // Verificar si coincide con el hash proporcionado
      let coincide = null;
      if (hashComparar) {
        coincide = hashComparar.toLowerCase() === hashHex.toLowerCase() || 
                   hashComparar === hashBase64;
      }
      
      setResultados({
        [algoritmo]: hashHex,
        base64: hashBase64,
        coincide
      });
      
      setProgreso(100);
    } catch (error) {
      console.error('Error al generar hash:', error);
      setError('Error al generar el hash. Por favor, intenta de nuevo.');
    } finally {
      setProcesando(false);
    }
  };

  // Función para generar hash de archivo
  const generarHashArchivo = async () => {
    if (!archivo) {
      setError('Por favor, selecciona un archivo para generar el hash');
      return;
    }

    setError(null);
    setProcesando(true);
    setProgreso(0);
    
    try {
      const chunkSize = 2097152; // 2MB por chunk
      const fileSize = archivo.size;
      let offset = 0;
      
      // Para MD5 necesitamos un enfoque diferente
      if (algoritmo === 'md5') {
        // Leemos todo el archivo para MD5
        const fileData = await archivo.arrayBuffer();
        const fileBytes = new Uint8Array(fileData);
        const fileText = Array.from(fileBytes)
          .map(byte => String.fromCharCode(byte))
          .join('');
        
        // Actualizamos el progreso
        setProgreso(90);
        
        // Calculamos el hash MD5
        const hashHex = md5(fileText);
        
        // Creamos un ArrayBuffer para la conversión a Base64
        const tempArray = new Uint8Array(16);
        for (let i = 0; i < 32; i += 2) {
          tempArray[i/2] = parseInt(hashHex.substr(i, 2), 16);
        }
        const hashBuffer = tempArray.buffer;
        
        // Convertir a Base64
        const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
        
        // Verificar si coincide con el hash proporcionado
        let coincide = null;
        if (hashComparar) {
          coincide = hashComparar.toLowerCase() === hashHex.toLowerCase() || 
                     hashComparar === hashBase64;
        }
        
        setResultados({
          [algoritmo]: hashHex,
          base64: hashBase64,
          coincide
        });
        
        setProgreso(100);
      } else {
        // Para SHA-1 y SHA-256 usamos Web Crypto API
        let hashObj;
        
        if (algoritmo === 'sha1') {
          hashObj = await crypto.subtle.digest('SHA-1', new ArrayBuffer(0));
        } else if (algoritmo === 'sha256') {
          hashObj = await crypto.subtle.digest('SHA-256', new ArrayBuffer(0));
        }
        
        while (offset < fileSize) {
          const chunk = await readChunk(archivo, offset, chunkSize);
          offset += chunk.byteLength;
          
          // Actualizamos el hash con el nuevo chunk
          hashObj = await crypto.subtle.digest(algoritmo.toUpperCase(), chunk);
          
          // Actualizamos el progreso
          setProgreso(Math.floor((offset / fileSize) * 100));
          
          // Permitimos que la UI se actualice
          await new Promise(resolve => setTimeout(resolve, 0));
        }
        
        // Convertir a hexadecimal
        const hashArray = Array.from(new Uint8Array(hashObj));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Convertir a Base64
        const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashObj)));
        
        // Verificar si coincide con el hash proporcionado
        let coincide = null;
        if (hashComparar) {
          coincide = hashComparar.toLowerCase() === hashHex.toLowerCase() || 
                     hashComparar === hashBase64;
        }
        
        setResultados({
          [algoritmo]: hashHex,
          base64: hashBase64,
          coincide
        });
        
        setProgreso(100);
      }
    } catch (error) {
      console.error('Error al generar hash del archivo:', error);
      setError('Error al procesar el archivo. Por favor, intenta de nuevo.');
    } finally {
      setProcesando(false);
    }
  };

  // Función auxiliar para leer chunks de archivo
  const readChunk = (file: File, offset: number, size: number): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = reject;
      
      const slice = file.slice(offset, offset + size);
      reader.readAsArrayBuffer(slice);
    });
  };

  // Función para manejar el drag & drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setArchivo(e.dataTransfer.files[0]);
      setActiveTab('archivo');
    }
  }, []);

  // Función para manejar el drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Función para copiar al portapapeles
  const copiarAlPortapapeles = (texto: string, tipo: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(tipo);
    setTimeout(() => setCopiado(null), 2000);
  };

  // Función para limpiar los resultados
  const limpiarResultados = () => {
    setTexto('');
    setArchivo(null);
    setHashComparar('');
    setResultados({});
    setProgreso(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Generador de Hash</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Genera hashes MD5, SHA-1 y SHA-256 de texto o archivos. Útil para verificar la integridad de datos.
      </p>
      
      <Card className="w-full max-w-4xl mx-auto dark:border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle>Herramienta de Generación de Hash</CardTitle>
          <CardDescription>
            Selecciona si quieres generar un hash de texto o de un archivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
               <TabsTrigger 
                 value="texto"
               >
                 Texto
               </TabsTrigger>
               <TabsTrigger 
                 value="archivo"
               >
                 Archivo
               </TabsTrigger>
             </TabsList>
            
            <TabsContent value="texto" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="texto-hash">Texto a generar hash</Label>
                <Textarea 
                  id="texto-hash"
                  placeholder="Escribe aquí el texto para generar su hash..."
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  className="min-h-[150px]"
                  aria-label="Texto para generar hash"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="archivo" className="space-y-4">
              <div 
                ref={dropZoneRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-2">
                  Arrastra y suelta un archivo aquí, o haz clic para seleccionar
                </p>
                {archivo && (
                  <p className="text-sm font-medium">
                    Archivo seleccionado: {archivo.name} ({(archivo.size / 1024).toFixed(2)} KB)
                  </p>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden"
                  onChange={(e) => e.target.files && e.target.files.length > 0 && setArchivo(e.target.files[0])}
                  aria-label="Seleccionar archivo para generar hash"
                />
              </div>
            </TabsContent>
            
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Algoritmo de hash</Label>
                <RadioGroup 
                  value={algoritmo} 
                  onValueChange={setAlgoritmo}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="md5" id="md5" />
                    <Label htmlFor="md5">MD5</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sha1" id="sha1" />
                    <Label htmlFor="sha1">SHA-1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sha256" id="sha256" />
                    <Label htmlFor="sha256">SHA-256</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hash-comparar">Comparar con hash (opcional)</Label>
                <Input
                  id="hash-comparar"
                  placeholder="Pega aquí un hash para comparar con el resultado..."
                  value={hashComparar}
                  onChange={(e) => setHashComparar(e.target.value)}
                  aria-label="Hash para comparar"
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="default"
                  onClick={activeTab === 'texto' ? generarHashTexto : generarHashArchivo} 
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white"
                  disabled={procesando || (activeTab === 'texto' ? !texto : !archivo)}
                >
                  {procesando ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Generar Hash'
                  )}
                </Button>
              </div>
              
              {procesando && (
                <div className="space-y-2">
                  <Label>Progreso</Label>
                  <Progress value={progreso} className="h-2" />
                  <p className="text-xs text-right text-muted-foreground">{progreso}%</p>
                </div>
              )}
              
              {error && (
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {(resultados.md5 || resultados.sha1 || resultados.sha256) && (
                <div className="mt-6 space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Resultados</h3>
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={limpiarResultados}
                      aria-label="Limpiar resultados"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Limpiar
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Hash ({algoritmo.toUpperCase()}) - Hexadecimal</Label>
                        <Button
                          variant="outline"
                          size="sm" 
                          onClick={() => copiarAlPortapapeles(resultados[algoritmo as keyof typeof resultados] as string, 'hex')}
                          aria-label="Copiar hash hexadecimal"
                        >
                          {copiado === 'hex' ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          Copiar
                        </Button>
                      </div>
                      <div className="bg-muted p-2 rounded-md overflow-x-auto">
                        <code className="text-sm break-all">
                          {resultados[algoritmo as keyof typeof resultados]}
                        </code>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Hash ({algoritmo.toUpperCase()}) - Base64</Label>
                        <Button
                          variant="outline"
                          size="sm" 
                          onClick={() => copiarAlPortapapeles(resultados.base64 as string, 'base64')}
                          aria-label="Copiar hash base64"
                        >
                          {copiado === 'base64' ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          Copiar
                        </Button>
                      </div>
                      <div className="bg-muted p-2 rounded-md overflow-x-auto">
                        <code className="text-sm break-all">
                          {resultados.base64}
                        </code>
                      </div>
                    </div>
                    
                    {resultados.coincide !== null && (
                      <Alert variant={resultados.coincide ? "default" : "destructive"}>
                        {resultados.coincide ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <AlertTitle>
                          {resultados.coincide ? "Hash verificado" : "Hash no coincide"}
                        </AlertTitle>
                        <AlertDescription>
                          {resultados.coincide 
                            ? "El hash generado coincide con el hash proporcionado." 
                            : "El hash generado no coincide con el hash proporcionado."}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}