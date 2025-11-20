"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { GitCompare, Upload, Copy, FileDown, History } from "lucide-react";

type DiffOp = { type: "equal" | "add" | "remove"; left?: string; right?: string };

function preprocess(text: string, ignoreWs: boolean, ignoreCase: boolean) {
  let t = text;
  if (ignoreCase) t = t.toLowerCase();
  if (ignoreWs) t = t.replace(/[ \t]+/g, "");
  return t;
}

// LCS-based simple diff for lines
function computeDiff(a: string, b: string, opts: { ignoreWs: boolean; ignoreCase: boolean }): DiffOp[] {
  const aLines = a.split(/\r?\n/);
  const bLines = b.split(/\r?\n/);
  const aComp = aLines.map((l) => preprocess(l, opts.ignoreWs, opts.ignoreCase));
  const bComp = bLines.map((l) => preprocess(l, opts.ignoreWs, opts.ignoreCase));

  const n = aComp.length;
  const m = bComp.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = aComp[i] === bComp[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (aComp[i] === bComp[j]) {
      ops.push({ type: "equal", left: aLines[i], right: bLines[j] });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: "remove", left: aLines[i], right: "" });
      i++;
    } else {
      ops.push({ type: "add", left: "", right: bLines[j] });
      j++;
    }
  }
  while (i < n) { ops.push({ type: "remove", left: aLines[i++], right: "" }); }
  while (j < m) { ops.push({ type: "add", left: "", right: bLines[j++] }); }
  return ops;
}

function exportUnifiedPatch(ops: DiffOp[], nameA: string, nameB: string) {
  const out: string[] = [];
  out.push(`--- ${nameA}`);
  out.push(`+++ ${nameB}`);
  out.push(`@@`);
  for (const op of ops) {
    if (op.type === "equal") out.push(` ${op.right}`);
    else if (op.type === "add") out.push(`+${op.right}`);
    else if (op.type === "remove") out.push(`-${op.left}`);
  }
  return out.join("\n");
}

export default function ComparadorArchivosPage() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [nameA, setNameA] = useState("archivoA.txt");
  const [nameB, setNameB] = useState("archivoB.txt");
  const [ignoreWs, setIgnoreWs] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [splitView, setSplitView] = useState(true);
  const [history, setHistory] = useState<{ a: string; b: string; ts: number }[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("diff-viewer-history");
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("diff-viewer-history", JSON.stringify(history.slice(0, 20)));
    } catch {}
  }, [history]);

  const ops = useMemo(() => computeDiff(textA, textB, { ignoreWs, ignoreCase }), [textA, textB, ignoreWs, ignoreCase]);
  const stats = useMemo(() => {
    let add = 0, remove = 0, equal = 0;
    for (const op of ops) {
      if (op.type === "add") add++;
      else if (op.type === "remove") remove++;
      else equal++;
    }
    return { add, remove, equal };
  }, [ops]);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>, setText: (v: string) => void, setName: (v: string) => void) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setText(String(reader.result || ""));
      setName(file.name);
      setHistory((prev) => [{ a: textA, b: textB, ts: Date.now() }, ...prev]);
    };
    reader.readAsText(file);
  };

  const exportPatch = () => {
    const patch = exportUnifiedPatch(ops, nameA, nameB);
    const blob = new Blob([patch], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nameA}_vs_${nameB}.patch`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareUrl = () => {
    try {
      const params = new URLSearchParams({ a: btoa(unescape(encodeURIComponent(textA))), b: btoa(unescape(encodeURIComponent(textB))), ws: String(ignoreWs), ic: String(ignoreCase), sv: String(splitView) });
      const url = `${location.origin}/tools/comparador-archivos?${params.toString()}`;
      navigator.clipboard.writeText(url);
      toast({ title: "URL copiada", description: "Comparación lista para compartir." });
    } catch {
      toast({ title: "No se pudo compartir", description: "El contenido es demasiado grande para la URL." });
    }
  };

  // Cargar desde URL si existe
  useEffect(() => {
    try {
      const qp = new URLSearchParams(location.search);
      const a = qp.get("a");
      const b = qp.get("b");
      if (a) setTextA(decodeURIComponent(escape(atob(a))));
      if (b) setTextB(decodeURIComponent(escape(atob(b))));
      setIgnoreWs(qp.get("ws") === "true");
      setIgnoreCase(qp.get("ic") === "true");
      setSplitView(qp.get("sv") !== "false");
    } catch {}
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GitCompare className="h-5 w-5" /> Comparador de Archivos y Texto (Diff Viewer)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Compara dos textos o archivos línea por línea. Soporta vista dividida y unificada, ignorar espacios y mayúsculas, arrastrar y soltar, exportar patch y compartir por URL.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, setTextA, setNameA)} className="space-y-2">
              <Label>Archivo A</Label>
              <Input placeholder="Nombre" value={nameA} onChange={(e) => setNameA(e.target.value)} />
              <Textarea placeholder="Pega texto aquí o arrastra un archivo" value={textA} onChange={(e) => setTextA(e.target.value)} className="min-h-[200px]" />
              <Button variant="outline" className="gap-2" onClick={() => toast({ title: "Arrastra un archivo", description: "Suelta un archivo de texto sobre este cuadro." })}><Upload className="h-4 w-4" /> Arrastrar archivo</Button>
            </div>
            <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, setTextB, setNameB)} className="space-y-2">
              <Label>Archivo B</Label>
              <Input placeholder="Nombre" value={nameB} onChange={(e) => setNameB(e.target.value)} />
              <Textarea placeholder="Pega texto aquí o arrastra un archivo" value={textB} onChange={(e) => setTextB(e.target.value)} className="min-h-[200px]" />
              <Button variant="outline" className="gap-2" onClick={() => toast({ title: "Arrastra un archivo", description: "Suelta un archivo de texto sobre este cuadro." })}><Upload className="h-4 w-4" /> Arrastrar archivo</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-between"><Label>Ignorar espacios en blanco</Label><Switch checked={ignoreWs} onCheckedChange={setIgnoreWs} /></div>
            <div className="flex items-center justify-between"><Label>Ignorar mayúsculas/minúsculas</Label><Switch checked={ignoreCase} onCheckedChange={setIgnoreCase} /></div>
            <div className="flex items-center justify-between"><Label>Vista dividida</Label><Switch checked={splitView} onCheckedChange={setSplitView} /></div>
          </div>

          <Separator />

          <div className="flex gap-3 items-center">
            <div className="text-sm">Añadidas: <span className="text-green-600 dark:text-green-400 font-medium">{stats.add}</span></div>
            <div className="text-sm">Eliminadas: <span className="text-red-600 dark:text-red-400 font-medium">{stats.remove}</span></div>
            <div className="text-sm">Iguales: <span className="text-muted-foreground font-medium">{stats.equal}</span></div>
            <Button className="ml-auto gap-2" variant="secondary" onClick={shareUrl}><Copy className="h-4 w-4" /> Compartir URL</Button>
            <Button className="gap-2" onClick={exportPatch}><FileDown className="h-4 w-4" /> Exportar patch</Button>
          </div>

          {splitView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="border rounded p-2 text-sm">
                {ops.map((op, idx) => (
                  <div key={idx} className={op.type === "remove" ? "bg-red-50 dark:bg-red-950/30" : op.type === "equal" ? "" : ""}>
                    <pre className="whitespace-pre-wrap break-words">{op.type === "add" ? "" : op.left}</pre>
                  </div>
                ))}
              </div>
              <div className="border rounded p-2 text-sm">
                {ops.map((op, idx) => (
                  <div key={idx} className={op.type === "add" ? "bg-green-50 dark:bg-green-950/30" : op.type === "equal" ? "" : ""}>
                    <pre className="whitespace-pre-wrap break-words">{op.type === "remove" ? "" : op.right}</pre>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border rounded p-2 text-sm">
              {ops.map((op, idx) => (
                <div key={idx} className={op.type === "add" ? "bg-green-50 dark:bg-green-950/30" : op.type === "remove" ? "bg-red-50 dark:bg-red-950/30" : ""}>
                  <pre className="whitespace-pre-wrap break-words">{op.type === "equal" ? op.right : op.type === "add" ? `+ ${op.right}` : `- ${op.left}`}</pre>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium"><History className="h-4 w-4" /> Historial de comparaciones (local)</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {history.length === 0 && <p className="text-sm text-muted-foreground">Sin historial aún.</p>}
              {history.map((h, idx) => (
                <Button key={idx} variant="outline" className="justify-between" onClick={() => { setTextA(h.a); setTextB(h.b); }}>
                  <span>Comparación #{history.length - idx}</span>
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