"use client";

import { useState, type FormEvent } from "react";

const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMS_ENDPOINT ||
  "https://operations-hub-cb65.onrender.com/api/public/forms";

const FORM_ID = process.env.NEXT_PUBLIC_CONTACT_FORM_ID || "";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${FORM_ENDPOINT}/${FORM_ID}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            website: form.website, // honeypot
          },
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-8 text-center">
        <div className="text-2xl font-extrabold text-brand-red">
          Thank you!
        </div>
        <p className="mt-2 text-black/70">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label
          htmlFor="cf-name"
          className="block text-sm font-semibold text-black/70"
        >
          Name <span className="text-brand-red">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="cf-email"
          className="block text-sm font-semibold text-black/70"
        >
          Email <span className="text-brand-red">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          placeholder="john@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="cf-phone"
          className="block text-sm font-semibold text-black/70"
        >
          Phone
        </label>
        <input
          id="cf-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label
          htmlFor="cf-message"
          className="block text-sm font-semibold text-black/70"
        >
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1 w-full resize-none rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          placeholder="How can we help?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-red text-base font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
