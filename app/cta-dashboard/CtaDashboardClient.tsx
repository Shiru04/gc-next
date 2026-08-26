"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

type CtaTotal = {
  ctaId: string;
  count: number;
  location: string;
  type: string;
  label: string;
  lastSeenAt: string;
  pages: Array<{ page: string; count: number }>;
};

type Stats = {
  configured: boolean;
  site?: { name: string; url: string };
  days?: number;
  since?: string;
  totals: CtaTotal[];
  daily: Array<{ date: string; count: number }>;
};

const TOKEN_KEY = "gc-cta-token";

export function CtaDashboardClient() {
  const [token, setToken] = useState("");
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (authToken: string, range: number) => {
    if (!authToken) return;
    setLoading(true);
    setError(null);

    try {
      // La barra final evita el 308 de `trailingSlash: true`.
      const res = await fetch(`/api/cta-stats/?days=${range}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        cache: "no-store",
      });

      if (res.status === 401) {
        setError("Token inválido o CTA_STATS_TOKEN no configurado en Vercel.");
        setStats(null);
        return;
      }
      if (res.status === 502) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "El hub no respondió.");
        setStats(null);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStats(await res.json());
      sessionStorage.setItem(TOKEN_KEY, authToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      void load(stored, days);
    }
    // Solo al montar: el resto de las recargas son explícitas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totals = stats?.totals ?? [];
  const grandTotal = totals.reduce((sum, row) => sum + row.count, 0);

  const byType = useMemo(() => {
    const out: Record<string, number> = {};
    for (const row of totals) out[row.type] = (out[row.type] ?? 0) + row.count;
    return Object.entries(out).sort((a, b) => b[1] - a[1]);
  }, [totals]);

  const peakDay = useMemo(() => {
    if (!stats?.daily?.length) return null;
    return stats.daily.reduce((max, d) => (d.count > max.count ? d : max));
  }, [stats]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">CTA Dashboard</h1>
      <p className="mt-2 text-black/60">
        Conteo first-party de clicks en CTAs, guardado en el Operations Hub.
        Incluye visitantes que rechazaron cookies o usan bloqueadores, así que
        estos números suelen ser más altos que los de GA4.
      </p>

      <form
        className="mt-6 flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          void load(token, days);
        }}
      >
        <div className="min-w-[240px] flex-1">
          <label
            htmlFor="token"
            className="block text-sm font-semibold text-black/70"
          >
            Access token
          </label>
          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="CTA_STATS_TOKEN"
            className="mt-1 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        <div>
          <label
            htmlFor="days"
            className="block text-sm font-semibold text-black/70"
          >
            Días
          </label>
          <input
            id="days"
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-1 w-24 rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="h-12 rounded-xl bg-brand-red px-6 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Cargando…" : "Ver datos"}
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {stats && !stats.configured ? (
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Falta conectar el hub. Configurá <code>HIVE_API_URL</code> y{" "}
          <code>HIVE_CTA_SITE_KEY</code> en Vercel. Mientras tanto los eventos se
          escriben en los logs pero no se acumulan.
        </p>
      ) : null}

      {stats?.configured ? (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-black/10 p-4">
              <div className="text-2xl font-extrabold">{grandTotal}</div>
              <div className="text-sm text-black/60">
                Clicks · últimos {stats.days}d
              </div>
            </div>
            {byType.slice(0, 2).map(([type, count]) => (
              <div key={type} className="rounded-2xl border border-black/10 p-4">
                <div className="text-2xl font-extrabold">{count}</div>
                <div className="text-sm text-black/60">{type}</div>
              </div>
            ))}
            {peakDay ? (
              <div className="rounded-2xl border border-black/10 p-4">
                <div className="text-2xl font-extrabold">{peakDay.count}</div>
                <div className="text-sm text-black/60">
                  Pico · {peakDay.date}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-black/10 text-black/60">
                <tr>
                  <th className="py-2 pr-4 font-semibold">CTA</th>
                  <th className="py-2 pr-4 font-semibold">Ubicación</th>
                  <th className="py-2 pr-4 font-semibold">Tipo</th>
                  <th className="py-2 text-right font-semibold">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {totals.map((row) => (
                  <Fragment key={row.ctaId}>
                    <tr
                      className="cursor-pointer border-b border-black/5 hover:bg-black/[0.02]"
                      onClick={() =>
                        setExpanded(expanded === row.ctaId ? null : row.ctaId)
                      }
                    >
                      <td className="py-3 pr-4">
                        <div className="font-semibold">
                          {row.pages.length > 1 ? (
                            <span className="mr-1 text-black/40">
                              {expanded === row.ctaId ? "▾" : "▸"}
                            </span>
                          ) : null}
                          {row.ctaId}
                        </div>
                        {row.label ? (
                          <div className="text-xs text-black/50">
                            {row.label}
                          </div>
                        ) : null}
                      </td>
                      <td className="py-3 pr-4 text-black/70">{row.location}</td>
                      <td className="py-3 pr-4 text-black/70">{row.type}</td>
                      <td className="py-3 text-right font-extrabold tabular-nums">
                        {row.count}
                      </td>
                    </tr>

                    {expanded === row.ctaId && row.pages.length > 1
                      ? row.pages.map((p) => (
                          <tr
                            key={`${row.ctaId}-${p.page}`}
                            className="border-b border-black/5 bg-black/[0.02] text-xs"
                          >
                            <td className="py-2 pl-6 pr-4 text-black/60" colSpan={3}>
                              {p.page}
                            </td>
                            <td className="py-2 text-right tabular-nums text-black/70">
                              {p.count}
                            </td>
                          </tr>
                        ))
                      : null}
                  </Fragment>
                ))}
                {totals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-black/50">
                      Todavía no se registraron clicks.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
