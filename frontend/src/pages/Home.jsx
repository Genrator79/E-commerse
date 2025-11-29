import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Common/Button';
import { Link } from 'react-router-dom';
import { useShop } from '../hooks/useShop';
import Card from '../components/Common/Card';
import ProductCard from '../components/Product/ProductCard';

const Home = () => {
    const { products, loading } = useShop();

    // Get top 4 products for featured section
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="container mx-auto px-4 text-center z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white"
                    >
                        Soft Luxury <br /> for Everyday Life
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light tracking-wide"
                    >
                        Discover our curated collection of premium essentials designed for comfort and style.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/shop">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-none">
                                Shop Collection
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-sans font-bold text-center mb-12">Featured Arrivals</h2>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="bg-white rounded-2xl h-96 shadow-soft animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
