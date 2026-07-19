"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const frame = window.requestAnimationFrame(() => setVisible(window.localStorage.getItem("bfs-cookie-notice") !== "dismissed")); return () => window.cancelAnimationFrame(frame); }, []);
  if (!visible) return null;
  return <aside className="cookie-notice" aria-label="Privacy notice"><p><strong>Your privacy</strong><br />This static site uses local storage for cart and currency preferences. Optional analytics loads only when configured. <Link href="/cookie-policy/">Learn more</Link>.</p><button className="button small secondary" onClick={() => { window.localStorage.setItem("bfs-cookie-notice", "dismissed"); setVisible(false); }}>Got it</button></aside>;
}
