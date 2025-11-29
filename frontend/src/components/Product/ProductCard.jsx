import React from 'react';
import { Heart } from 'lucide-react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <Card
            className="
                p-0 overflow-hidden group 
                border border-gray-100 
                rounded-xl bg-white 
                shadow-sm hover:shadow-md
                transition-all duration-300 
                h-full flex flex-col
            "
        >
            {/* IMAGE */}
            <Link
                to={`/product/${product._id}`}
                className="block relative overflow-hidden rounded-t-xl bg-[#f3f0ea] aspect-[3/4]"
            >
                <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="
                        w-full h-full object-cover object-center 
                        transition-transform duration-[800ms] 
                        ease-out group-hover:scale-[1.06]
                    "
                />

                {/* Discount Badge */}
                {product.discount && (
                    <span className="
                        absolute top-3 left-3 
                        bg-white/85 backdrop-blur-sm 
                        text-gray-900 text-[10px] font-medium 
                        px-3 py-1 uppercase tracking-wider rounded-full
                    ">
                        {product.discount}
                    </span>
                )}

                {/* Stock Badge */}
                {product.stock === 0 ? (
                    <span className="
                        absolute top-3 left-3 
                        bg-red-500/85 backdrop-blur-sm 
                        text-white text-[10px] font-medium 
                        px-3 py-1 uppercase tracking-wider rounded-full
                    ">
                        Out of Stock
                    </span>
                ) : product.stock < 5 ? (
                    <span className="
                        absolute top-10 left-3 
                        bg-orange-500/85 backdrop-blur-sm 
                        text-white text-[10px] font-medium 
                        px-3 py-1 uppercase tracking-wider rounded-full
                    ">
                        Low Stock
                    </span>
                ) : null}

                {/* Heart Icon */}
                <button
                    className="
                        absolute top-3 right-3 
                        p-2 bg-white/50 backdrop-blur-md 
                        rounded-full hover:bg-white 
                        transition-colors duration-300
                    "
                    aria-label="Add to wishlist"
                    onClick={(e) => e.preventDefault()}
                >
                    <Heart className="w-5 h-5 text-gray-700" />
                </button>
            </Link>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-1">
                    {product.category || 'Collection'}
                </p>

                <div className="flex justify-between items-start mb-2">
                    <Link
                        to={`/product/${product._id}`}
                        className="hover:opacity-75 transition"
                    >
                        <h3 className="
                            text-lg font-serif text-gray-900 leading-snug
                        ">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="text-lg font-semibold text-gray-900 ml-3">
                        ${product.price}
                    </span>
                </div>

                {/* Colors and Sizes */}
                <div className="mb-4 space-y-2">
                    {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center space-x-1">
                            {product.colors.map((color, index) => (
                                <span
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    title={color}
                                />
                            ))}
                        </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {product.sizes.map((size, index) => (
                                <span
                                    key={index}
                                    className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200"
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* ALWAYS VISIBLE BUTTON */}
                <Button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`
                        w-full py-3 rounded-lg mt-auto
                        text-xs uppercase tracking-widest font-semibold
                        shadow-sm hover:shadow-md
                        transition-all duration-300
                        ${product.stock === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                            : 'bg-[#c7b8a3] text-white hover:bg-[#b9a892]'}
                    `}
                >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;
