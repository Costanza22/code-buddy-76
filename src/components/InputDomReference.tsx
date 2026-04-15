/** Referência compacta estilo MDN para o elemento HTML &lt;input&gt; e a interface DOM. */
export default function InputDomReference() {
  const rows: { attr: string; desc: string }[] = [
    { attr: "type", desc: "Comportamento e validação: text, password, email, number, checkbox, radio, date, file, hidden, submit…" },
    { attr: "name", desc: "Nome no envio de formulários (URLSearchParams / FormData)." },
    { attr: "id", desc: "Identificador único no documento; liga a <label for=\"…\">." },
    { attr: "value", desc: "Valor controlado; em checkbox/radio reflete o envio quando marcado." },
    { attr: "placeholder", desc: "Texto de exemplo (não substitui label nem value real)." },
    { attr: "checked", desc: "Só checkbox/radio — se está marcado." },
    { attr: "disabled", desc: "Desativa interação e não entra no submit." },
    { attr: "readonly", desc: "Valor visível e enviado, mas não editável pelo utilizador." },
    { attr: "required", desc: "Validação nativa: campo obrigatório antes de submit." },
    { attr: "min / max / step", desc: "Para number, range, date — limites e incremento." },
    { attr: "pattern", desc: "Regex HTML (validação nativa em type text)." },
    { attr: "autocomplete", desc: "Sugestão ao browser (on, off, email, current-password…)." },
    { attr: "accept", desc: "Para type=file — MIME ou extensões permitidas." },
    { attr: "multiple", desc: "Para file/email — vários valores." },
  ];

  return (
    <details className="mt-6 border-2 border-border bg-card group">
      <summary className="cursor-pointer list-none px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2">
        <span>Referência rápida: elemento &lt;input&gt; (DOM)</span>
        <span className="text-foreground opacity-60 group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <div className="border-t-2 border-border px-4 py-3 text-sm">
        <p className="text-muted-foreground text-xs leading-relaxed mb-4">
          <code className="font-mono text-foreground">HTMLInputElement</code> estende{" "}
          <code className="font-mono text-foreground">HTMLElement</code>. Abaixo, atributos HTML comuns e o efeito no browser.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-2 pr-4 font-bold text-foreground align-top w-[28%]">Atributo / API</th>
                <th className="py-2 text-muted-foreground font-normal align-top">Notas</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.attr} className="border-b border-border/80">
                  <td className="py-2 pr-4 text-primary align-top whitespace-nowrap">{r.attr}</td>
                  <td className="py-2 text-secondary-foreground align-top leading-relaxed">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          No DOM, lês/escreves muitas destas propriedades em{" "}
          <code className="text-foreground">document.querySelector(&quot;input&quot;)</code> ou{" "}
          <code className="text-foreground">element.value</code>, <code className="text-foreground">.checked</code>,{" "}
          <code className="text-foreground">.disabled</code>. Documentação completa: MDN{" "}
          <a
            href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input"
            className="text-primary underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            &lt;input&gt;
          </a>
          {" · "}
          <a
            href="https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLInputElement"
            className="text-primary underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTMLInputElement
          </a>
          .
        </p>
      </div>
    </details>
  );
}
