import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { Package, LogOut, User, ChevronRight } from 'lucide-react';
import api from '../services/api';
import Skeleton from '../components/Common/Skeleton';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-soft-bg py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-serif font-bold mb-8 text-soft-text-primary">My Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* User Info Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                                    <User size={40} className="text-soft-text-secondary" />
                                </div>
                                <h2 className="text-xl font-bold text-soft-text-primary">{user.name}</h2>
                                <p className="text-soft-text-secondary text-sm">{user.email}</p>
                            </div>

                            <div className="border-t border-stone-100 pt-6">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 text-error hover:bg-red-50 p-2 rounded-lg transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-xl shadow-soft p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="text-primary" size={24} />
                                <h2 className="text-xl font-bold text-soft-text-primary">Order History</h2>
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                                    ))}
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-12 bg-stone-50 rounded-lg border border-dashed border-stone-200">
                                    <Package size={48} className="mx-auto text-stone-300 mb-3" />
                                    <p className="text-soft-text-secondary font-medium">No orders found</p>
                                    <p className="text-sm text-stone-400">When you place an order, it will appear here.</p>
                                    <Button
                                        variant="primary"
                                        className="mt-4"
                                        onClick={() => navigate('/shop')}
                                    >
                                        Start Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div
                                            key={order._id}
                                            className="border border-stone-100 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
                                            onClick={() => navigate(`/order/${order._id}`)} // Assuming we might want an order details page later, or just show summary here
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-xs text-soft-text-secondary uppercase tracking-wider font-medium">Order ID</p>
                                                    <p className="font-mono text-sm text-soft-text-primary">#{order._id.slice(-6)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-soft-text-secondary uppercase tracking-wider font-medium">Date</p>
                                                    <p className="text-sm text-soft-text-primary">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 overflow-x-auto py-2 mb-4">
                                                {order.orderItems.map((item, index) => (
                                                    <div key={index} className="w-12 h-12 rounded-md bg-stone-100 flex-shrink-0 overflow-hidden relative group">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/10 hidden group-hover:flex items-center justify-center text-[10px] font-bold text-white">
                                                            x{item.quantity}
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.orderItems.length > 4 && (
                                                    <div className="w-12 h-12 rounded-md bg-stone-50 flex items-center justify-center text-xs text-soft-text-secondary font-medium">
                                                        +{order.orderItems.length - 4}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                                                <div>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {order.isPaid ? 'Paid' : 'Pending Payment'}
                                                    </span>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-soft-text-primary">${order.totalPrice.toFixed(2)}</span>
                                                    <ChevronRight size={16} className="text-soft-text-secondary" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
