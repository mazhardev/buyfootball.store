"use client";

import Link from "next/link";
import { Clipboard, Mail, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { buildOrderSummary, emailUrl, generateOrderReference, whatsappUrl } from "@/lib/commerce";

const initialCustomer = { name: "", email: "", phone: "", country: "", city: "", postalCode: "", address: "", notes: "", preferredContact: "WhatsApp" };

export function OrderForm() {
  const cart = useCart();
  const { currency, convert, displayPrice } = useCurrency();
  const [customer, setCustomer] = useState(initialCustomer);
  const [reference, setReference] = useState("BFS-PENDING");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { const frame = window.requestAnimationFrame(() => setReference(generateOrderReference())); return () => window.cancelAnimationFrame(frame); }, []);
  const summary = useMemo(() => buildOrderSummary({ reference, customer, items: cart.items, currency, subtotalUsd: cart.subtotalUsd, displaySubtotal: convert(cart.subtotalUsd) }), [reference, customer, cart.items, cart.subtotalUsd, currency, convert]);
  const validate = () => {
    if (!cart.items.length) { setStatus("Your cart is empty. Add at least one football before creating an order request."); return false; }
    if (!formRef.current?.reportValidity()) return false;
    if (!accepted) { setStatus("Please confirm the terms and shipping note before continuing."); return false; }
    setStatus(""); return true;
  };
  const send = (channel: "whatsapp" | "email") => {
    if (!validate()) return;
    const url = channel === "whatsapp" ? whatsappUrl(summary) : emailUrl(`Order request ${reference}`, summary);
    if (!url) { setStatus(`${channel === "whatsapp" ? "WhatsApp" : "Email"} is not configured. Use copy order details instead.`); return; }
    window.location.href = url;
  };
  const copy = async () => {
    if (!validate()) return;
    try { await navigator.clipboard.writeText(summary); setStatus("Order details copied to your clipboard."); }
    catch { setStatus("Clipboard access failed. Select and copy the order preview below manually."); }
  };
  const field = (key: keyof typeof customer, label: string, options?: { type?: string; required?: boolean; textarea?: boolean; placeholder?: string }) => <label><span>{label}{options?.required && " *"}</span>{options?.textarea ? <textarea required={options.required} value={customer[key]} placeholder={options.placeholder} onChange={(event) => setCustomer((value) => ({ ...value, [key]: event.target.value }))} /> : <input type={options?.type ?? "text"} required={options?.required} value={customer[key]} placeholder={options?.placeholder} onChange={(event) => setCustomer((value) => ({ ...value, [key]: event.target.value }))} />}</label>;
  return <div className="order-form-grid"><form ref={formRef} className="form-card" onSubmit={(event) => event.preventDefault()}><span className="eyebrow">Reference {reference}</span><h2>Delivery and contact details</h2><div className="form-grid two">{field("name", "Customer name", { required: true })}{field("email", "Email", { type: "email", required: true })}{field("phone", "Phone / WhatsApp", { type: "tel", required: true })}{field("country", "Country", { required: true })}{field("city", "City", { required: true })}{field("postalCode", "Postal code", { required: true })}</div>{field("address", "Delivery address", { required: true, textarea: true })}{field("notes", "Order notes", { textarea: true, placeholder: "Delivery timing, access notes or product questions" })}<label><span>Preferred contact method</span><select value={customer.preferredContact} onChange={(event) => setCustomer((value) => ({ ...value, preferredContact: event.target.value }))}><option>WhatsApp</option><option>Email</option><option>Phone</option></select></label><label className="check-label"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span>I confirm these details are an order request, not a completed purchase. I accept the <Link href="/terms-and-conditions/">terms</Link> and understand shipping, taxes and availability require confirmation.</span></label>{status && <p className={status.includes("copied") ? "form-success" : "form-error"} role="status">{status}</p>}<div className="form-actions"><button type="button" className="button whatsapp" onClick={() => send("whatsapp")}><MessageCircle /> Send through WhatsApp</button><button type="button" className="button secondary" onClick={() => send("email")}><Mail /> Send through email</button><button type="button" className="button secondary" onClick={copy}><Clipboard /> Copy order details</button><Link className="button ghost" href="/shop/">Continue shopping</Link></div></form><aside className="order-summary-card"><span className="eyebrow">Your selection</span><h2>Order summary</h2>{cart.items.length ? cart.items.map((item) => <div className="order-mini-line" key={item.lineId}><span>{item.name}<small>{item.size} · {item.color} · Qty {item.quantity}</small></span><strong>{displayPrice(item.priceUsd * item.quantity)}</strong></div>) : <p>Your cart is empty.</p>}<div className="summary-line total"><span>Estimated subtotal</span><strong>{displayPrice(cart.subtotalUsd)}</strong></div><p>USD pricing is retained in the generated message. Shipping is confirmed after the destination and order are reviewed.</p><details><summary>Preview order message</summary><pre className="order-preview">{summary}</pre></details></aside></div>;
}
