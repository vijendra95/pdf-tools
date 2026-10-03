"use client";

export default function PairList({
  value,
  onChange,
  labels,
  addLabel,
  multiline,
}: {
  value: [string, string][];
  onChange: (v: [string, string][]) => void;
  labels: [string, string];
  addLabel: string;
  multiline?: boolean;
}) {
  const update = (i: number, j: 0 | 1, s: string) => {
    const next = value.map((p) => [...p] as [string, string]);
    next[i][j] = s;
    onChange(next);
  };
  const move = (i: number, d: number) => {
    const next = [...value];
    const [x] = next.splice(i, 1);
    next.splice(i + d, 0, x);
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map(([a, b], i) => (
        <div key={i} className="border rounded-xl p-3 bg-gray-50 space-y-2">
          <div className="flex gap-2">
            <input className="input-field flex-1" placeholder={labels[0]} value={a} onChange={(e) => update(i, 0, e.target.value)} />
            <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="px-2 text-gray-500 disabled:opacity-30">↑</button>
            <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="px-2 text-gray-500 disabled:opacity-30">↓</button>
            <button type="button" onClick={() => onChange(value.filter((_, k) => k !== i))} className="px-2 text-red-500">✕</button>
          </div>
          {multiline ? (
            <textarea className="input-field" rows={3} placeholder={labels[1]} value={b} onChange={(e) => update(i, 1, e.target.value)} />
          ) : (
            <input className="input-field" placeholder={labels[1]} value={b} onChange={(e) => update(i, 1, e.target.value)} />
          )}
        </div>
      ))}
      <button type="button" className="btn-secondary !py-2 !px-4 text-sm" onClick={() => onChange([...value, ["", ""]])}>
        + {addLabel}
      </button>
    </div>
  );
}
