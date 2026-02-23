// components/promotions/PointsGrid.tsx
export function PointsGrid({ points }: { points: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {points.map((p) => (
        <div
          key={p}
          className="rounded-2xl bg-neutral-50 p-5 ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold text-neutral-900">{p}</p>
        </div>
      ))}
    </div>
  );
}
