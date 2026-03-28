import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = user?.user ? user.user : user;

  useScrollToTop();

  if (!currentUser) {
    return <div className="p-10 text-center">Loading... or Please login.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg flex-shrink-0 relative">
        <div className="p-6 pb-2 border-b border-gray-100 flex items-center justify-between md:justify-start gap-4">
          <div>
             <h2 className="text-xl font-bold text-slate-800">Shopverse</h2>
             <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full capitalize">{currentUser.role}</span>
          </div>
        </div>
        
        <nav className="p-4 space-y-1.5 mt-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-all"
          >
            Dashboard
          </Link>
          {currentUser.role === 'admin' && (
            <>
              <Link
                to="/dashboard/admin/products"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-all"
              >
                Manage Products
              </Link>
              <Link
                to="/dashboard/admin/orders"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-all"
              >
                Manage Orders
              </Link>
              <Link
                to="/dashboard/admin/users"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-all"
              >
                Manage Users
              </Link>
              <Link
                to="/dashboard/admin/profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition-all"
              >
                My Profile
              </Link>
            </>
          )}

          {currentUser.role === 'user' && (
            <>
              <Link
                to="/dashboard/user/orders"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-all"
              >
                My Orders
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-all"
              >
                My Profile
              </Link>
            </>
          )}

          <div className="pt-8 mt-8 border-t border-gray-100">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition-all"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
