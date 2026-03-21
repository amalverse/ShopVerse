import React from 'react';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../../redux/features/orders/ordersApi';
import { Link } from 'react-router-dom';

const ManageOrders = () => {
    const { data: orders, error, isLoading } = useGetAllOrdersQuery();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateOrderStatus({ id, status }).unwrap();
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading orders...</div>;
    if (error) return <div className="p-8 text-center text-indigo-500">Error fetching orders. No orders found.</div>;

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'shipped': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Manage All Orders</h2>
                    <p className="text-slate-500 text-sm mt-1">Review and manage customer orders across the shop.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-semibold text-sm">
                    {orders?.length || 0} Total Orders
                </div>
            </div>
            
            {orders?.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-slate-500 font-medium text-lg">No orders placed yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Order Header / User Details */}
                            <div className="bg-slate-50 px-6 py-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-3">
                                    <div>
                                        <p className="uppercase text-[10px] font-bold text-slate-400 tracking-widest mb-1.5">Customer</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                                                {(order.contact || order.email || 'U')[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 leading-tight">{order.contact || 'User'}</p>
                                                <p className="text-slate-500 text-xs">{order.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="uppercase text-[10px] font-bold text-slate-400 tracking-widest mb-1.5">Shipping Address</p>
                                    {order.address ? (
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                           {typeof order.address === 'string' ? order.address : `${order.address.address || ''}, ${order.address.city || ''}, ${order.address.state || ''} ${order.address.pincode || ''}, ${order.address.country || ''}`}
                                        </p>
                                    ) : (
                                        <p className="text-slate-400 text-sm italic">No address details provided</p>
                                    )}
                                </div>

                                <div>
                                    <p className="uppercase text-[10px] font-bold text-slate-400 tracking-widest mb-1.5">Order Info</p>
                                    <p className="text-lg font-bold text-emerald-600">${order.amount?.toFixed(2) || '0.00'}</p>
                                    <p className="text-slate-500 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                    <p className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md shadow-sm inline-block font-mono mt-2">
                                        ID: {order.orderId || order._id.slice(18)}
                                    </p>
                                </div>

                                <div>
                                    <p className="uppercase text-[10px] font-bold text-slate-400 tracking-widest mb-1.5">Update Status</p>
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${getStatusStyles(order.status)}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="completed">Completed</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            {/* Order Products */}
                            <div className="p-6">
                                <h3 className="uppercase text-[10px] font-bold text-slate-400 tracking-widest mb-4">Ordered Products Details</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {order.products?.map((p, i) => (
                                        <div key={i} className="flex gap-4 border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors group">
                                            <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                                                {p.image ? (
                                                    <img src={p.image} alt={p.itemName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                ) : (
                                                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1 py-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <Link to={`/shop/${p.productId}`} className="font-bold text-slate-800 hover:text-emerald-600 transition-colors line-clamp-1">
                                                        {p.itemName || 'Product Name'}
                                                    </Link>
                                                </div>
                                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tight mb-2">PROD-ID: {p.productId || 'N/A'}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-4">
                                                        <p className="text-slate-500 text-sm">Qty: <span className="font-bold text-slate-700">{p.quantity}</span></p>
                                                        <p className="text-slate-300">|</p>
                                                        <p className="text-emerald-600 font-bold text-sm">Price: ${p.price?.toFixed(2)}</p>
                                                    </div>
                                                    <p className="font-extrabold text-slate-800 text-sm">Total: ${(p.quantity * (p.price || 0)).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageOrders;

