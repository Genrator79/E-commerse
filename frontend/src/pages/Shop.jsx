import React from 'react';
import { useShop } from '../hooks/useShop';
import { useCart } from '../hooks/useCart';
import Card from '../components/Common/Card';
import ProductCard from '../components/Product/ProductCard';
import Button from '../components/Common/Button';
import { Link } from 'react-router-dom';
import Skeleton from '../components/Common/Skeleton';

const Shop = () => {
    const { products, loading } = useShop();
    const { addToCart } = useCart();

    if (loading) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <Skeleton className="h-12 w-64 mx-auto mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="space-y-4">
                                <Skeleton className="aspect-square rounded-xl w-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-8 w-20 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-sans font-bold mb-8 text-center">Shop Collection</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
