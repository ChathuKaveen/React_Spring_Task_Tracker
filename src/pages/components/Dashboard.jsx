import { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import useTaskSocket from "../../hooks/useTaskSocket";
import Navbar from "./Navbar";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";
import Pagination from "../components/Pagination";

const STATUS_FILTERS = ["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"];
const PAGE_SIZE = 6; 

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("ALL");
  const [userId, setUserId] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalTask, setModalTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, size: PAGE_SIZE };
      if (status !== "ALL") params.status = status;
      let endpoint = "/task";
      if (isAdmin) {
        endpoint = "/task/all-tasks";
        if (userId) params.userId = userId;
      }

      const { data } = await api.get(endpoint, { params });
      console.log(data.data)
      setTasks(data.data|| []);
      setTotalPages(data.totalPages ?? 1);
    } catch (err) {
      setError("Could not load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, status, userId, isAdmin]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Live update: Refetch current page when a task event happenss
  useTaskSocket(() => fetchTasks());

  const handleCreate = () => {
    setModalTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setModalTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/task/${id}`);
    fetchTasks();
  };

  const handleSubmit = async (form) => {
    if (modalTask?.id) {
      // PUT /task/{id} — includes status
      await api.put(`/task/${modalTask.id}`, {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        status: form.status,
      });
    } else {
      // POST /task — no status on create
      await api.post("/task", {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
      });
    }
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-xl font-semibold text-slate-800">
            {isAdmin ? "All Tasks" : "My Tasks"}
          </h1>
          <button
            onClick={handleCreate}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
          >
            + New Task
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>

          {isAdmin && (
            <input
              type="number"
              placeholder="Filter by user ID"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setPage(0);
              }}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm w-40"
            />
          )}
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p className="text-sm text-slate-400">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-slate-400">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                canEdit={isAdmin || task.userId === user.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {showModal && (
        <TaskFormModal
          initialTask={modalTask}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
