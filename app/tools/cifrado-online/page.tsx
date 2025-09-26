'use client';

import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertCircle, Copy, Download, Eye, EyeOff, Trash2, CheckCircle, XCircle, Lock, Unlock, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function CifradoOnline() {
  const [activeTab, setActiveTab] = useState('cifrar');
  const [mensaje, setMensaje] = useState('');
  const [clave, setClave] = useState('');
  const [resultado, setResultado] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [opcionesAvanzadas, setOpcionesAvanzadas] = useState(false);
  const [iteraciones, setIteraciones] = useState(10000);
  const [formatoSalida, setFormatoSalida] = useState('base64');
  const [estado, setEstado] = useState('listo'); // listo, cifrado, error-clave, error-datos
  const [copiado, setCopiado] = useState(false);
  const resultadoRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  // Función para cifrar el mensaje
  const cifrarMensaje = async () => {
    if (!mensaje || !clave) {
      setEstado('error-clave');
      return;
    }

    try {
      setEstado('procesando');
      
      // Convertir mensaje y clave a formato ArrayBuffer
      const encoder = new TextEncoder();
      const mensajeBytes = encoder.encode(mensaje);
      
      // Derivar clave usando PBKDF2
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(clave),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: iteraciones,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );
      
      // Generar IV para AES-GCM
      const iv = crypto.getRandomValues(new Uint8Array(12));
      
      // Cifrar el mensaje
      const encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv
        },
        derivedKey,
        mensajeBytes
      );
      
      // Combinar salt + iv + datos cifrados
      const resultado = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      resultado.set(salt, 0);
      resultado.set(iv, salt.length);
      resultado.set(new Uint8Array(encrypted), salt.length + iv.length);
      
      // Convertir a Base64 o Base64URL según la opción seleccionada
      let resultadoString;
      if (formatoSalida === 'base64') {
        resultadoString = btoa(String.fromCharCode(...resultado));
      } else {
        resultadoString = btoa(String.fromCharCode(...resultado))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }
      
      setResultado(resultadoString);
      setEstado('cifrado');
      
      // Actualizar URL con fragmento si está habilitado
      if (opcionesAvanzadas && window) {
        const params = new URLSearchParams();
        params.set('data', resultadoString);
        window.location.hash = params.toString();
      }
    } catch (error) {
      console.error('Error al cifrar:', error);
      setEstado('error-datos');
    }
  };
  
  // Función para descifrar el mensaje
  const descifrarMensaje = async () => {
    if (!mensaje || !clave) {
      setEstado('error-clave');
      return;
    }
    
    try {
      setEstado('procesando');
      
      // Decodificar Base64/Base64URL
      let mensajeDecodificado;
      try {
        if (formatoSalida === 'base64') {
          mensajeDecodificado = atob(mensaje);
        } else {
          // Convertir Base64URL a Base64 estándar
          const base64 = mensaje
            .replace(/-/g, '+')
            .replace(/_/g, '/');
          mensajeDecodificado = atob(base64);
        }
      } catch (e) {
        setEstado('error-datos');
        return;
      }
      
      // Convertir a Uint8Array
      const mensajeBytes = new Uint8Array(mensajeDecodificado.length);
      for (let i = 0; i < mensajeDecodificado.length; i++) {
        mensajeBytes[i] = mensajeDecodificado.charCodeAt(i);
      }
      
      // Extraer salt, iv y datos cifrados
      const salt = mensajeBytes.slice(0, 16);
      const iv = mensajeBytes.slice(16, 28);
      const datosCifrados = mensajeBytes.slice(28);
      
      // Derivar clave usando PBKDF2
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(clave),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: iteraciones,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      
      // Descifrar
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv
        },
        derivedKey,
        datosCifrados
      );
      
      // Convertir a texto
      const decoder = new TextDecoder();
      const mensajeDescifrado = decoder.decode(decrypted);
      
      setResultado(mensajeDescifrado);
      setEstado('cifrado');
    } catch (error) {
      console.error('Error al descifrar:', error);
      setEstado('error-clave');
    }
  };
  
  // Función para copiar el resultado al portapapeles
  const copiarResultado = () => {
    if (resultado) {
      navigator.clipboard.writeText(resultado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };
  
  // Función para descargar el resultado como archivo .txt
  const descargarResultado = () => {
    if (resultado) {
      const element = document.createElement('a');
      const file = new Blob([resultado], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${activeTab === 'cifrar' ? 'mensaje_cifrado' : 'mensaje_descifrado'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };
  
  // Función para limpiar todos los campos
  const limpiarCampos = () => {
    setMensaje('');
    setClave('');
    setResultado('');
    setEstado('listo');
  };
  
  // Función para limpiar solo el resultado
  const limpiarResultado = () => {
    setResultado('');
    setEstado('listo');
  };
  
  // Verificar si hay datos en el fragmento de URL al cargar
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const data = params.get('data');
        if (data) {
          setMensaje(data);
          setActiveTab('descifrar');
        }
      } catch (e) {
        console.error('Error al procesar fragmento de URL:', e);
      }
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Cifrar Online</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Cifra y descifra mensajes con una clave compartida. Todo el proceso se realiza en tu navegador, nada se envía a servidores externos.
      </p>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Herramienta de Cifrado</CardTitle>
          <CardDescription>
            Selecciona si quieres cifrar o descifrar un mensaje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="cifrar">Cifrar</TabsTrigger>
              <TabsTrigger value="descifrar">Descifrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cifrar" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mensaje-cifrar">Mensaje a cifrar</Label>
                <Textarea 
                  id="mensaje-cifrar"
                  placeholder="Escribe aquí el mensaje que quieres cifrar..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="min-h-[200px]"
                  aria-label="Mensaje a cifrar"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="clave-cifrar">Clave de cifrado</Label>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMostrarClave(!mostrarClave)}
                    aria-label={mostrarClave ? "Ocultar clave" : "Mostrar clave"}
                  >
                    {mostrarClave ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="clave-cifrar"
                    type={mostrarClave ? "text" : "password"}
                    placeholder="Introduce una clave segura..."
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    aria-label="Clave de cifrado"
                  />
                </div>
              </div>
              
              <Collapsible 
                open={opcionesAvanzadas} 
                onOpenChange={setOpcionesAvanzadas}
                className="border rounded-md p-2"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between cursor-pointer p-2">
                    <Label className="cursor-pointer">Opciones avanzadas</Label>
                    <Button variant="ghost" size="sm">
                      {opcionesAvanzadas ? "Ocultar" : "Mostrar"}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="iteraciones">Iteraciones KDF</Label>
                    <Input
                      id="iteraciones"
                      type="number"
                      min="1000"
                      max="100000"
                      value={iteraciones}
                      onChange={(e) => setIteraciones(parseInt(e.target.value))}
                      className="w-32"
                      aria-label="Número de iteraciones para la función de derivación de clave"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="formato-salida">Formato de salida</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="base64" className="cursor-pointer">Base64</Label>
                      <input
                        id="base64"
                        type="radio"
                        name="formato"
                        value="base64"
                        checked={formatoSalida === 'base64'}
                        onChange={() => setFormatoSalida('base64')}
                        className="cursor-pointer"
                        aria-label="Formato Base64"
                      />
                      <Label htmlFor="base64url" className="cursor-pointer">Base64URL</Label>
                      <input
                        id="base64url"
                        type="radio"
                        name="formato"
                        value="base64url"
                        checked={formatoSalida === 'base64url'}
                        onChange={() => setFormatoSalida('base64url')}
                        className="cursor-pointer"
                        aria-label="Formato Base64URL"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="link-compartible">Generar link compartible</Label>
                    <Switch
                      id="link-compartible"
                      checked={opcionesAvanzadas}
                      onCheckedChange={setOpcionesAvanzadas}
                      aria-label="Generar link compartible con el mensaje cifrado"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="pt-4">
                <Button 
                  variant="default"
                  onClick={cifrarMensaje} 
                  className="w-full"
                  disabled={!mensaje || !clave || estado === 'procesando'}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Cifrar
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="descifrar" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mensaje-descifrar">Mensaje cifrado (Base64/Base64URL)</Label>
                <Textarea 
                  id="mensaje-descifrar"
                  placeholder="Pega aquí el mensaje cifrado en formato Base64 o Base64URL..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="min-h-[200px]"
                  aria-label="Mensaje cifrado a descifrar"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="clave-descifrar">Clave de descifrado</Label>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMostrarClave(!mostrarClave)}
                    aria-label={mostrarClave ? "Ocultar clave" : "Mostrar clave"}
                  >
                    {mostrarClave ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="clave-descifrar"
                    type={mostrarClave ? "text" : "password"}
                    placeholder="Introduce la clave de descifrado..."
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    aria-label="Clave de descifrado"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="default"
                  onClick={descifrarMensaje} 
                  className="w-full"
                  disabled={!mensaje || !clave || estado === 'procesando'}
                >
                  <Unlock className="mr-2 h-4 w-4" />
                  Descifrar
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {resultado && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Resultado</h3>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copiarResultado}
                    aria-label="Copiar resultado"
                  >
                    {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiado ? "Copiado" : "Copiar"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={descargarResultado}
                    aria-label="Descargar resultado"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={limpiarResultado}
                    aria-label="Limpiar resultado"
                  >
                    <Trash2 className="h-4 w-4" />
                    Limpiar
                  </Button>
                </div>
              </div>
              
              <Textarea 
                ref={resultadoRef}
                value={resultado}
                readOnly
                className="min-h-[150px]"
                aria-label="Resultado del proceso de cifrado o descifrado"
              />
              
              {estado === 'cifrado' && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Cifrado completado</AlertTitle>
                  <AlertDescription>
                    El mensaje ha sido cifrado correctamente. Comparte el texto cifrado y la clave por canales separados para mayor seguridad.
                  </AlertDescription>
                </Alert>
              )}
              
              {estado === 'descifrado' && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Descifrado completado</AlertTitle>
                  <AlertDescription>
                    El mensaje ha sido descifrado correctamente.
                  </AlertDescription>
                </Alert>
              )}
              
              {estado === 'error-clave' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error de clave</AlertTitle>
                  <AlertDescription>
                    La clave proporcionada no es correcta o el mensaje ha sido modificado.
                  </AlertDescription>
                </Alert>
              )}
              
              {estado === 'error-datos' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error de formato</AlertTitle>
                  <AlertDescription>
                    El formato del mensaje cifrado no es válido. Asegúrate de que es un texto en formato Base64 o Base64URL correcto.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}