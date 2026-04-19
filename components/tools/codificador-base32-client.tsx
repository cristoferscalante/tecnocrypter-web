'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Copy, FileUp, RefreshCw, X, Download, Info } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

// Tipos para las variantes de Base32
type Base32Variant = 'rfc4648' | 'base32hex' | 'zbase32' | 'crockford' | 'custom';

// Alfabetos para cada variante
const BASE32_ALPHABETS = {
  rfc4648: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  base32hex: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  zbase32: 'ybndrfg8ejkmcpqxot1uwisza345h769',
  crockford: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
  custom: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567' // Default, será personalizable
};

export default function CodificadorBase32() {
  const [activeTab, setActiveTab] = useState<string>('codificar');
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [variant, setVariant] = useState<Base32Variant>('rfc4648');
  const [customAlphabet, setCustomAlphabet] = useState<string>(BASE32_ALPHABETS.custom);
  const [customPadding, setCustomPadding] = useState<string>('=');
  const [usePadding, setUsePadding] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [groupChars, setGroupChars] = useState<boolean>(false);
  const [procesando, setProcesando] = useState<boolean>(false);
  const [copiado, setCopiado] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<string | null>(null);
  const [isValidUtf8, setIsValidUtf8] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Función para obtener el alfabeto actual
  const getCurrentAlphabet = (): string => {
    return variant === 'custom' ? customAlphabet : BASE32_ALPHABETS[variant];
  };

  // Función para obtener el carácter de padding actual
  const getCurrentPadding = (): string => {
    return variant === 'custom' ? customPadding : '=';
  };

  // Función para codificar en Base32
  const encodeBase32 = (data: Uint8Array): string => {
    const alphabet = getCurrentAlphabet();
    const padding = getCurrentPadding();
    let result = '';
    let buffer = 0;
    let bitsLeft = 0;

    for (let i = 0; i < data.length; i++) {
      buffer = (buffer << 8) | data[i];
      bitsLeft += 8;

      while (bitsLeft >= 5) {
        result += alphabet[(buffer >> (bitsLeft - 5)) & 31];
        bitsLeft -= 5;
      }
    }

    if (bitsLeft > 0) {
      result += alphabet[(buffer << (5 - bitsLeft)) & 31];
    }

    // Agregar padding si está habilitado
    if (usePadding) {
      while (result.length % 8 !== 0) {
        result += padding;
      }
    }

    // Aplicar mayúsculas/minúsculas
    result = useUppercase ? result.toUpperCase() : result.toLowerCase();

    // Agrupar caracteres si está habilitado
    if (groupChars) {
      result = result.match(/.{1,8}/g)?.join(' ') || result;
    }

    return result;
  };

  // Función para decodificar Base32
  const decodeBase32 = (encoded: string): Uint8Array => {
    const alphabet = getCurrentAlphabet();
    const padding = getCurrentPadding();
    
    // Limpiar el string de entrada
    let cleanInput = encoded.replace(/\s/g, ''); // Remover espacios
    cleanInput = cleanInput.replace(new RegExp(`\\${padding}+$`), ''); // Remover padding
    
    // Crear mapa de decodificación
    const decodeMap: { [key: string]: number } = {};
    for (let i = 0; i < alphabet.length; i++) {
      decodeMap[alphabet[i].toUpperCase()] = i;
      decodeMap[alphabet[i].toLowerCase()] = i;
    }

    const result: number[] = [];
    let buffer = 0;
    let bitsLeft = 0;

    for (let i = 0; i < cleanInput.length; i++) {
      const char = cleanInput[i];
      if (!(char.toUpperCase() in decodeMap)) {
        throw new Error(`Carácter inválido en la entrada: ${char}`);
      }

      buffer = (buffer << 5) | decodeMap[char.toUpperCase()];
      bitsLeft += 5;

      if (bitsLeft >= 8) {
        result.push((buffer >> (bitsLeft - 8)) & 255);
        bitsLeft -= 8;
      }
    }

    return new Uint8Array(result);
  };

  // Función para verificar si los datos son UTF-8 válido
  const isValidUtf8Data = (data: Uint8Array): boolean => {
    try {
      new TextDecoder('utf-8', { fatal: true }).decode(data);
      return true;
    } catch {
      return false;
    }
  };

  // Función para crear hexdump
  const createHexdump = (data: Uint8Array, maxBytes: number = 64): string => {
    const lines: string[] = [];
    const bytesToShow = Math.min(data.length, maxBytes);
    
    for (let i = 0; i < bytesToShow; i += 16) {
      const chunk = data.slice(i, i + 16);
      const hex = Array.from(chunk)
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');
      const ascii = Array.from(chunk)
        .map(b => (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.')
        .join('');
      
      lines.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47)} |${ascii}|`);
    }
    
    if (data.length > maxBytes) {
      lines.push(`... (${data.length - maxBytes} bytes más)`);
    }
    
    return lines.join('\n');
  };

  // Función para procesar codificación
  const procesarCodificacion = async () => {
    if (!inputText && !archivo) {
      setError('Por favor, introduce texto o selecciona un archivo para codificar');
      return;
    }

    setError(null);
    setProcesando(true);
    
    try {
      let data: Uint8Array;
      
      if (activeTab === 'codificar') {
        // Codificar texto
        if (archivo) {
          const arrayBuffer = await archivo.arrayBuffer();
          data = new Uint8Array(arrayBuffer);
        } else {
          const encoder = new TextEncoder();
          data = encoder.encode(inputText);
        }
        
        const encoded = encodeBase32(data);
        setOutputText(encoded);
        
        // Mostrar información adicional
        const charCount = encoded.replace(/\s/g, '').length;
        setPreviewData(`Caracteres codificados: ${charCount}`);
        
      } else {
        // Decodificar
        const decoded = decodeBase32(inputText);
        const isUtf8 = isValidUtf8Data(decoded);
        setIsValidUtf8(isUtf8);
        
        if (isUtf8) {
          const decodedText = new TextDecoder('utf-8').decode(decoded);
          setOutputText(decodedText);
          setPreviewData(`Texto decodificado (${decoded.length} bytes)`);
        } else {
          const hexdump = createHexdump(decoded);
          setOutputText(hexdump);
          setPreviewData(`Datos binarios (${decoded.length} bytes) - Vista hexadecimal:`);
        }
      }
      
    } catch (error) {
      console.error('Error al procesar:', error);
      setError(error instanceof Error ? error.message : 'Error al procesar los datos');
    } finally {
      setProcesando(false);
    }
  };

  // Función para manejar el drag & drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setArchivo(e.dataTransfer.files[0]);
    }
  }, []);

  // Función para manejar el drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Función para copiar al portapapeles
  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(outputText);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Función para limpiar
  const limpiar = () => {
    setInputText('');
    setOutputText('');
    setArchivo(null);
    setError(null);
    setPreviewData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Función para descargar resultado
  const descargarResultado = () => {
    const blob = activeTab === 'codificar' 
      ? new Blob([outputText], { type: 'text/plain' })
      : isValidUtf8 
        ? new Blob([outputText], { type: 'text/plain' })
        : new Blob([new TextEncoder().encode(outputText)], { type: 'application/octet-stream' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab === 'codificar' 
      ? 'encoded_base32.txt' 
      : isValidUtf8 
        ? 'decoded_text.txt' 
        : 'decoded_data.bin';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Codificador/Decodificador Base32</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Herramienta profesional para codificar y decodificar texto y archivos en Base32 con múltiples variantes
      </p>
      
      <Card className="w-full max-w-6xl mx-auto dark:border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle>Herramienta Base32</CardTitle>
          <CardDescription>
            Codifica y decodifica datos usando diferentes variantes de Base32
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="codificar">
                Codificar
              </TabsTrigger>
              <TabsTrigger value="decodificar">
                Decodificar
              </TabsTrigger>
            </TabsList>
            
            {/* Configuración de variante y opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 border rounded-lg bg-muted/50">
              <div className="space-y-2">
                <Label htmlFor="variant">Variante Base32</Label>
                <Select value={variant} onValueChange={(value: Base32Variant) => setVariant(value)}>
                  <SelectTrigger id="variant">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rfc4648">Base32 (RFC 4648)</SelectItem>
                    <SelectItem value="base32hex">Base32hex (RFC 4648)</SelectItem>
                    <SelectItem value="zbase32">z-base-32</SelectItem>
                    <SelectItem value="crockford">Crockford</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {variant === 'custom' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="custom-alphabet">Alfabeto personalizado</Label>
                    <Input
                      id="custom-alphabet"
                      value={customAlphabet}
                      onChange={(e) => setCustomAlphabet(e.target.value)}
                      placeholder="32 caracteres únicos"
                      maxLength={32}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-padding">Carácter de padding</Label>
                    <Input
                      id="custom-padding"
                      value={customPadding}
                      onChange={(e) => setCustomPadding(e.target.value)}
                      placeholder="="
                      maxLength={1}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-padding"
                    checked={usePadding}
                    onCheckedChange={setUsePadding}
                  />
                  <Label htmlFor="use-padding">Usar padding</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-uppercase"
                    checked={useUppercase}
                    onCheckedChange={setUseUppercase}
                  />
                  <Label htmlFor="use-uppercase">Mayúsculas</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="group-chars"
                    checked={groupChars}
                    onCheckedChange={setGroupChars}
                  />
                  <Label htmlFor="group-chars">Agrupar cada 8 chars</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Panel de entrada */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {activeTab === 'codificar' ? 'Entrada (texto/archivo)' : 'Entrada (Base32)'}
                </h3>
                
                <TabsContent value="codificar" className="mt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="input-text">Texto a codificar</Label>
                      <Textarea 
                        id="input-text"
                        placeholder="Escribe el texto que quieres codificar en Base32..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="min-h-[150px] font-mono text-sm"
                        aria-label="Texto para codificar"
                      />
                    </div>
                    
                    <div className="text-center text-muted-foreground">o</div>
                    
                    <div 
                      ref={dropZoneRef}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground mb-2">
                        Arrastra un archivo aquí o haz clic para seleccionar
                      </p>
                      {archivo && (
                        <p className="text-sm font-medium">
                          {archivo.name} ({(archivo.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden"
                        onChange={(e) => e.target.files && e.target.files.length > 0 && setArchivo(e.target.files[0])}
                        aria-label="Seleccionar archivo"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="decodificar" className="mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="decode-input">Texto Base32 a decodificar</Label>
                    <Textarea 
                      id="decode-input"
                      placeholder="Pega aquí el texto codificado en Base32..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                      aria-label="Texto Base32 para decodificar"
                    />
                  </div>
                </TabsContent>
                
                <Button 
                  onClick={procesarCodificacion}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white"
                  disabled={procesando || (!inputText && !archivo)}
                >
                  {procesando ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    activeTab === 'codificar' ? 'Codificar' : 'Decodificar'
                  )}
                </Button>
              </div>
              
              {/* Panel de salida */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {activeTab === 'codificar' ? 'Resultado (Base32)' : 'Resultado decodificado'}
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copiarAlPortapapeles}
                      disabled={!outputText}
                      aria-label="Copiar resultado"
                    >
                      {copiado ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copiar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={descargarResultado}
                      disabled={!outputText}
                      aria-label="Descargar resultado"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={limpiar}
                      aria-label="Limpiar todo"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Limpiar
                    </Button>
                  </div>
                </div>
                
                {previewData && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>{previewData}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Textarea 
                    value={outputText}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-muted"
                    placeholder={`El resultado ${activeTab === 'codificar' ? 'codificado' : 'decodificado'} aparecerá aquí...`}
                  />
                </div>
                
                {activeTab === 'decodificar' && outputText && !isValidUtf8 && (
                  <Alert variant="default">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Datos binarios detectados</AlertTitle>
                    <AlertDescription>
                      Los datos decodificados no son texto UTF-8 válido. Se muestra una vista hexadecimal.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <X className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}