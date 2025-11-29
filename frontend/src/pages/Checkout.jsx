import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Card from '../components/Common/Card';
import { toast } from 'sonner';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to continue');
            navigate('/login');
            return;
        }

        setLoading(true);
        // Simulate network delay for "Click-to-Success"
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    image: item.images[0],
                    price: item.price,
                    quantity: item.quantity,
                })),
                shippingAddress: formData,
                paymentMethod: 'MockPay',
                itemsPrice: total,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: total,
            };

            const { data } = await api.post('/orders', orderData);
            clearCart();
            navigate('/order-success', { state: { order: data } });
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Your cart is empty</div>;
    }

    return (
        <div className="min-h-screen py-12 bg-soft-bg">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-sans font-bold mb-8 text-center">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                        <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
                            <Input
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </form>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            {cart.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t border-stone-100 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            form="checkout-form"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Processing Payment...' : 'Pay with MockPay'}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
