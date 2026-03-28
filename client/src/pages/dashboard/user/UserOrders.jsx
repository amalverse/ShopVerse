import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserOrders = () => {
    const { user } = useSelector(state => state.auth);
    const currentUser = user?.user ? user.user : user;
    const { data: orderData, error, isLoading } = useGetOrdersByEmailQuery(currentUser?.email, { skip: !currentUser?.email });
    const orders = orderData?.orders || [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>No orders found.</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Order History</h2>

            {orders.length === 0 ? (
                <div className="text-center py-10 text-slate-500">You haven't placed any orders yet.</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Order Header */}
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4 text-sm">
                                <div>
                                    <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold mb-1">Order Placed</p>
                                    <p className="font-medium text-slate-800">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold mb-1">Total Amount</p>
                                    <p className="font-bold text-slate-800">${order.amount?.toFixed(2) || '0.00'}</p>
                                </div>
                                <div className="flex-grow md:text-right">
                                    <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold mb-1">Order ID</p>
                                    <p className="font-medium text-slate-800">#{order.orderId || order._id.slice(0, 8)}</p>
                                </div>
                            </div>
                            
                            {/* Order Items */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-slate-800 mb-4">
                                        <span className={`inline-block px-3 py-1 mr-3 text-xs font-semibold rounded-full capitalize 
                                            ${order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                              order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                                              'bg-blue-100 text-blue-700'}`}>
                                            {order.status}
                                        </span>
                                        Delivery Status
                                    </h3>
                                </div>
                                
                                <div className="space-y-6">
                                    {order.products?.map((p, i) => (
                                        <div key={i} className="flex gap-6 items-start border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                            {/* Product Image Placeholder (can be updated to actual image if saved in DB) */}
                                            <div className="w-24 h-24 bg-slate-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                                                {p.image ? (
                                                    <img src={p.image} alt={p.itemName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                )}
                                            </div>
                                            
                                            {/* Product Details */}
                                            <div className="flex-grow">
                                                <h4 className="font-semibold text-slate-800 text-lg hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2">
                                                    {p.itemName || `Item (ID: ${p.productId?.slice(10, 16) || 'Unknown'})`}
                                                </h4>
                                                <p className="text-slate-500 text-sm mt-1">Quantity: <span className="font-medium text-slate-700">{p.quantity}</span></p>
                                                
                                                <div className="mt-4 flex gap-3">
                                                    {!p.productId?.startsWith("prod_") && (
                                                        <Link 
                                                            to={`/shop/${p.productId}`}
                                                            className="text-sm border border-slate-300 rounded-md shadow-sm px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                                        >
                                                            View Product
                                                        </Link>
                                                    )}
                                                    <button className="text-sm bg-emerald-50 text-emerald-700 rounded-md shadow-sm px-4 py-2 font-medium hover:bg-emerald-100 transition-colors">
                                                        Buy it again
                                                    </button>
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

export default UserOrders;
