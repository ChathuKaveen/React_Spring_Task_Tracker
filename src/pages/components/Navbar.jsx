import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
      <span className="font-semibold text-slate-800">Task Tracker</span>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-500">
          {user?.username}{" "}
          <span className="ml-1 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {user?.role}
          </span>
        </span>
        <button
          onClick={handleLogout}
          className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
