export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6 text-sm">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        className="rounded-md border border-slate-200 px-3 py-1.5 text-slate-600 disabled:opacity-40 hover:bg-slate-50"
      >
        Prev
      </button>
      <span className="text-slate-500">
        Page {page + 1} of {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page + 1 >= totalPages}
        className="rounded-md border border-slate-200 px-3 py-1.5 text-slate-600 disabled:opacity-40 hover:bg-slate-50"
      >
        Next
      </button>
    </div>
  );
}
