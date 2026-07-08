const statusStyles = {
  TODO: "bg-slate-100 text-slate-600",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  DONE: "bg-emerald-100 text-emerald-700",
};

export default function TaskCard({ task, canEdit, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-slate-800">{task.title}</h3>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
            statusStyles[task.status] || "bg-slate-100 text-slate-600"
          }`}
        >
          {task.status?.replace("_", " ")}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
        <span>Due {task.dueDate || "—"}</span>
        <span>Owner: {task.owner.name}</span>
      </div>

      {canEdit && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 rounded-md border border-slate-200 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 rounded-md border border-red-200 py-1.5 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
