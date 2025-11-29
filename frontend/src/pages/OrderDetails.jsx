import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Skeleton from '../components/Common/Skeleton';
import { ChevronLeft, MapPin, CreditCard, Package, Calendar } from 'lucide-react';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
            } catch (err) {
                console.error('Error fetching order:', err);
                setError(err.response?.data?.message || 'Failed to fetch order');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    // console.log(order)

    if (loading) {
        return (
            <div className="min-h-screen bg-soft-bg py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-soft-bg py-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link to="/profile" className="text-primary hover:underline">
                        Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-soft-bg py-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-4">This order does not exist.</p>
                    <Link to="/profile" className="text-primary hover:underline">
                        Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-soft-bg py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link to="/profile" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
                    <ChevronLeft size={20} />
                    <span>Back to Orders</span>
                </Link>

                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-gray-900">
                                Order #{id.slice(-6)}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Calendar size={14} />
                                <span>
                                    Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.isPaid ? 'Paid' : 'Pending Payment'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
                                ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {order.isDelivered ? 'Delivered' : 'Processing'}
                            </span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Package size={20} className="text-primary" />
                            Items
                        </h2>
                        <div className="space-y-4">
                            {order.orderItems?.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.product}`} className="font-medium text-gray-900 hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping & Summary */}
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Shipping */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin size={20} className="text-primary" />
                                Shipping
                            </h2>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shippingAddress?.address}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                                <p>{order.shippingAddress?.country}</p>
                            </div>
                        </div>

                        {/* Payment */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CreditCard size={20} className="text-primary" />
                                Payment Summary
                            </h2>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Items Subtotal</span>
                                    <span className="font-medium">${order.totalPrice - order.taxPrice - order.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">${order.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">${order.taxPrice}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${order.totalPrice}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
