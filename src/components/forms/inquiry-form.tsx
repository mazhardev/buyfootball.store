"use client";

import { Clipboard, Mail, MessageCircle } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { emailUrl, whatsappUrl } from "@/lib/commerce";

const fields = { contactName: "", company: "", businessType: "Club / academy", website: "", email: "", whatsapp: "", country: "", quantity: "", category: "Training footballs", sizes: "", deliveryDate: "", customLogo: "No", packaging: "", testing: "", message: "" };

export function InquiryForm({ title = "Tell us what you need" }: { title?: string }) {
  const [values, setValues] = useState(fields);
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const summary = useMemo(() => ["WHOLESALE / CUSTOM INQUIRY", ...Object.entries(values).map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value || "Not provided"}`)].join("\n"), [values]);
  const validate = () => formRef.current?.reportValidity() ?? false;
  const act = async (kind: "whatsapp" | "email" | "copy") => {
    if (!validate()) return;
    if (kind === "copy") { try { await navigator.clipboard.writeText(summary); setStatus("Inquiry copied."); } catch { setStatus("Clipboard failed. Copy the preview text manually."); } return; }
    const url = kind === "whatsapp" ? whatsappUrl(summary) : emailUrl("Wholesale / custom football inquiry", summary);
    if (!url) { setStatus(`${kind} is not configured. Please use copy inquiry.`); return; }
    window.location.href = url;
  };
  const input = (key: keyof typeof fields, label: string, required = false, type = "text") => <label><span>{label}{required && " *"}</span><input type={type} required={required} value={values[key]} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} /></label>;
  return <form ref={formRef} className="form-card inquiry-form" action={siteConfig.externalContactFormEndpoint || undefined} method={siteConfig.externalContactFormEndpoint ? "post" : undefined} onSubmit={siteConfig.externalContactFormEndpoint ? undefined : (event) => event.preventDefault()}><span className="eyebrow">Specification-led quoting</span><h2>{title}</h2><div className="form-grid two">{input("contactName", "Contact name", true)}{input("company", "Company / organization", true)}<label><span>Business type</span><select value={values.businessType} onChange={(event) => setValues((current) => ({ ...current, businessType: event.target.value }))}><option>Club / academy</option><option>School / university</option><option>Retailer</option><option>Wholesaler</option><option>Promotional company</option><option>Brand / private label</option><option>Individual</option></select></label>{input("website", "Website", false, "url")}{input("email", "Email", true, "email")}{input("whatsapp", "WhatsApp", false, "tel")}{input("country", "Country", true)}{input("quantity", "Estimated quantity", true, "number")}<label><span>Ball category</span><select value={values.category} onChange={(event) => setValues((current) => ({ ...current, category: event.target.value }))}><option>Match footballs</option><option>Training footballs</option><option>Futsal balls</option><option>Kids footballs</option><option>Custom footballs</option></select></label>{input("sizes", "Sizes required")}{input("deliveryDate", "Required delivery date", false, "date")}<label><span>Custom logo required?</span><select value={values.customLogo} onChange={(event) => setValues((current) => ({ ...current, customLogo: event.target.value }))}><option>No</option><option>Yes</option><option>Unsure</option></select></label></div>{input("packaging", "Packaging requirement")}{input("testing", "Certification or testing requirement")}<label><span>Message *</span><textarea required value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} /></label>{!siteConfig.externalContactFormEndpoint && <p className="config-note">Direct web submission is not configured. Use WhatsApp, email or copy below.</p>}{status && <p className={status.includes("copied") ? "form-success" : "form-error"} role="status">{status}</p>}<div className="form-actions">{siteConfig.externalContactFormEndpoint && <button className="button primary" type="submit">Submit inquiry</button>}<button className="button whatsapp" type="button" onClick={() => act("whatsapp")}><MessageCircle /> WhatsApp</button><button className="button secondary" type="button" onClick={() => act("email")}><Mail /> Email</button><button className="button secondary" type="button" onClick={() => act("copy")}><Clipboard /> Copy inquiry</button></div></form>;
}
