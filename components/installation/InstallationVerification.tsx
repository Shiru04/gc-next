"use client";
import Script from "next/script";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type InstallationVerificationHandle = { verify: () => Promise<string> };
/** Mount and run the challenge only after an explicit submit attempt. */
export const InstallationVerification = forwardRef<InstallationVerificationHandle, { locale?: "en" | "es" }>(function InstallationVerification({ locale = "en" }, ref) {
  const [attempt, setAttempt] = useState(0);
  const element = useRef<HTMLDivElement>(null);
  const widget = useRef<string>();
  const pending = useRef<{ resolve: (token: string) => void; reject: (error: Error) => void }>();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  function finish(token?: string, code = "verification_failed") {
    clearTimeout(timer.current);
    const task = pending.current;
    pending.current = undefined;
    if (token) task?.resolve(token);
    else task?.reject(new Error(code));
  }
  useImperativeHandle(ref, () => ({ verify: () => {
    if (pending.current) return Promise.reject(new Error("verification_busy"));
    return new Promise<string>((resolve, reject) => {
      pending.current = { resolve, reject };
      timer.current = setTimeout(() => finish(undefined, "verification_timeout"), 30000);
      setAttempt(value => value + 1);
    });
  } }));
  function render() {
    if (!pending.current || !element.current || !window.turnstile || widget.current) return;
    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (process.env.NODE_ENV !== "production" ? "1x00000000000000000000AA" : "");
    if (!sitekey) { finish(undefined, "verification_configuration"); return; }
    try {
      widget.current = window.turnstile.render(element.current, {
        sitekey, size: "flexible", retry: "never",
        callback: (token: string) => finish(token),
        "error-callback": (code: string) => { finish(undefined, /^\d{6}$/.test(code) ? `turnstile_${code}` : "verification_failed"); return true; },
        "expired-callback": () => finish(undefined, "verification_expired"),
        "timeout-callback": () => finish(undefined, "verification_timeout"),
      });
    } catch { finish(undefined, "verification_unavailable"); }
  }
  useEffect(() => {
    if (!attempt) return;
    render();
    return () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
    // Each attempt owns a fresh single-use token and widget.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);
  useEffect(() => () => { finish(undefined, "verification_cancelled"); }, []);
  if (!attempt) return null;
  return <div className="min-w-0" aria-label={locale === "es" ? "Verificación de seguridad" : "Security verification"}>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={render} onError={() => finish(undefined, "verification_load_failed")} />
    <div key={attempt} ref={element} />
  </div>;
});
