"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Copy, Download, History, KeyRound, Mail, RefreshCcw } from "lucide-react";

function bytesToString(bytes: Uint8Array, charset: string, length: number) {
  const out: string[] = [];
  for (let i = 0; i < length; i++) {
    const idx = bytes[i % bytes.length] % charset.length;
    out.push(charset[idx]);
  }
  return out.join("");
}

async function sha256(text: string): Promise<Uint8Array> {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return new Uint8Array(hash);
}

function sanitizeService(service: string) {
  return service.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

const alphaLower = "abcdefghijklmnopqrstuvwxyz";
const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{};:,.?/";

export default function GeneradorCredencialesPage() {
  const [keyword, setKeyword] = useState("");
  const [service, setService] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [variant, setVariant] = useState(0); // determinístico por índice
  const [historyItems, setHistoryItems] = useState<{ keyword: string; service: string; ts: number }[]>([]);
  const [addTimestamp, setAddTimestamp] = useState(false);

  // Cargar historial local
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cred-gen-history");
      if (raw) setHistoryItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cred-gen-history", JSON.stringify(historyItems.slice(0, 50)));
    } catch {}
  }, [historyItems]);

  const result = useMemo(() => ({ username: "", password: "", email: "" }), []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const generate = async () => {
    if (!keyword || !service) {
      toast({ title: "Faltan datos", description: "Ingresa palabra clave y servicio." });
      return;
    }
    const srv = sanitizeService(service);
    const base = `${keyword}|${srv}|v${variant}` + (addTimestamp ? `|${new Date().toISOString().slice(0, 10)}` : "");
    const bytes = await sha256(base);

    // Username: <keyword>_<srv>_<sufijo>
    const unameSuffix = bytesToString(bytes, alphaLower + digits, 6);
    const uname = `${prefix ? prefix + "_" : ""}${sanitizeService(keyword)}_${srv}_${unameSuffix}${suffix ? "_" + sanitizeService(suffix) : ""}`;

    // Password: mezcla según opciones
    let charset = alphaLower;
    if (useUpper) charset += alphaUpper;
    if (useNumbers) charset += digits;
    if (useSymbols) charset += symbols;
    const pwd = bytesToString(bytes, charset, Math.min(Math.max(length, 8), 32));

    // Email temporal asociado (determinístico, sin servicio real)
    const emailLocal = `${sanitizeService(keyword)}.${srv}.${unameSuffix}@privado.local`;

    setUsername(uname);
    setPassword(pwd);
    setEmail(emailLocal);

    setHistoryItems((prev) => [{ keyword, service, ts: Date.now() }, ...prev.filter((h) => !(h.keyword === keyword && h.service === service))]);
  };

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `${label} copiado`, description: text });
    } catch {
      toast({ title: "No se pudo copiar", description: "Tu navegador bloqueó el portapapeles." });
    }
  };

  const exportJson = () => {
    const payload = {
      keyword,
      service,
      variant,
      config: { length, useUpper, useNumbers, useSymbols, prefix, suffix },
      credentials: { username, password, email },
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cred_${sanitizeService(service)}_${sanitizeService(keyword)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" /> Generador de Credenciales Determinísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Genera usuarios y contraseñas determinísticas a partir de una palabra clave maestra. Todo sucede en tu navegador (modo offline), no se envían datos al servidor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Palabra clave maestra</Label>
              <Input placeholder="ej. amor" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Servicio / Plataforma</Label>
              <Input placeholder="ej. Facebook" value={service} onChange={(e) => setService(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Prefijo de username (opcional)</Label>
              <Input placeholder="ej. user" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sufijo por servicio (opcional)</Label>
              <Input placeholder="ej. fb" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-2">
              <Label>Longitud de contraseña: {length} caracteres</Label>
              <Slider value={[length]} min={8} max={32} step={1} onValueChange={(v) => setLength(v[0])} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between"><Label>Mayúsculas</Label><Switch checked={useUpper} onCheckedChange={setUseUpper} /></div>
              <div className="flex items-center justify-between"><Label>Números</Label><Switch checked={useNumbers} onCheckedChange={setUseNumbers} /></div>
              <div className="flex items-center justify-between"><Label>Símbolos</Label><Switch checked={useSymbols} onCheckedChange={setUseSymbols} /></div>
              <div className="flex items-center justify-between"><Label>Agregar timestamp variante</Label><Switch checked={addTimestamp} onCheckedChange={setAddTimestamp} /></div>
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label>Variante (si el principal está ocupado)</Label>
                <Input type="number" min={0} max={999} value={variant} onChange={(e) => setVariant(parseInt(e.target.value || "0"))} />
              </div>
              <Button onClick={generate} className="md:col-span-2 flex items-center gap-2"><RefreshCcw className="h-4 w-4" /> Generar credenciales</Button>
            </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <div className="flex gap-2">
                <Input readOnly value={username} />
                <Button variant="secondary" onClick={() => copyText(username, "Username")}><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex gap-2">
                <Input readOnly value={password} />
                <Button variant="secondary" onClick={() => copyText(password, "Password")}><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email temporal (alias)</Label>
              <div className="flex gap-2">
                <Input readOnly value={email} />
                <Button variant="secondary" onClick={() => copyText(email, "Email") }><Mail className="h-4 w-4" /></Button>
              </div>
              <p className="text-xs text-muted-foreground">Alias determinístico para registros. No es un servicio de email real.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={exportJson} className="flex items-center gap-2"><Download className="h-4 w-4" /> Exportar credenciales (JSON)</Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium"><History className="h-4 w-4" /> Historial local</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {historyItems.length === 0 && <p className="text-sm text-muted-foreground">Aún no hay historial.</p>}
              {historyItems.map((h, idx) => (
                <Button key={idx} variant="outline" className="justify-between" onClick={() => { setKeyword(h.keyword); setService(h.service); }}>
                  <span>{h.keyword} · {h.service}</span>
                  <span className="text-xs text-muted-foreground">{new Date(h.ts).toLocaleString()}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}