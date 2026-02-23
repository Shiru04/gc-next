// components/promotions/OfferCard.tsx
export function OfferCard({
  title,
  value,
  details,
}: {
  title: string;
  value: string;
  details: string[];
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-end gap-3">
        {title ? (
          <p className="text-sm font-semibold text-neutral-500">{title}</p>
        ) : null}
        <p className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
          {value}
        </p>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-neutral-700">
        {details.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-red-600" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
