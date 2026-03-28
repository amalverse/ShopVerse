import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery, useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = user?.user ? user.user : user;
  const isAdmin = currentUser?.role === "admin";

  // Fetch orders based on role
  const { data: userOrdersData, isLoading: isUserOrdersLoading } = useGetOrdersByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email || isAdmin,
  });

  const { data: allOrdersData, isLoading: isAllOrdersLoading } = useGetAllOrdersQuery(undefined, {
    skip: !isAdmin,
  });

  const orders = isAdmin ? (allOrdersData || []) : (userOrdersData?.orders || []);
  const isLoading = isAdmin ? isAllOrdersLoading : isUserOrdersLoading;

  const totalSpent = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Welcome back, {currentUser?.username}! 👋
        </h1>
        <p className="text-slate-500">
          This is your central hub. Navigate using the sidebar to view your
          {isAdmin
            ? " shop statistics, manage products, and orders."
            : " order history, personal details, and more."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-emerald-600">
            {isLoading ? "..." : orders.length}
          </p>
        </div>
        
        {isAdmin ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Completed Orders</h3>
            <p className="text-3xl font-bold text-emerald-600">
              {isLoading ? "..." : completedOrders}
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Spent</h3>
            <p className="text-3xl font-bold text-emerald-600">
              {isLoading ? "..." : `$${totalSpent.toFixed(2)}`}
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-amber-500">
            {isLoading ? "..." : pendingOrders}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

