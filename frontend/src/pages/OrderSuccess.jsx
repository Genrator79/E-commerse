import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';

const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state?.order;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-soft-bg">
            <Card className="max-w-md w-full text-center py-12">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="text-success w-20 h-20" />
                </div>
                <h1 className="text-3xl font-sans font-bold mb-4">Payment Successful!</h1>
                <p className="text-soft-text-secondary mb-8">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {order && (
                    <div className="bg-stone-50 rounded-xl p-4 mb-8 text-left">
                        <p className="text-sm text-soft-text-secondary">Order ID:</p>
                        <p className="font-mono font-medium">{order._id}</p>
                        <p className="text-sm text-soft-text-secondary mt-2">Amount Paid:</p>
                        <p className="font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
                    </div>
                )}

                <Link to="/">
                    <Button>Continue Shopping</Button>
                </Link>
            </Card>
        </div>
    );
};

export default OrderSuccess;
