// components/promotions/FAQ.tsx
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <details
          key={it.q}
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <summary className="cursor-pointer list-none text-sm font-bold text-neutral-900">
            {it.q}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            {it.a}
          </p>
        </details>
      ))}
    </div>
  );
}
