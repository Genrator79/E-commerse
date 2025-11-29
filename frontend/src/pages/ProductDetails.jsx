import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../hooks/useCart";
import Button from "../components/Common/Button";
import { toast } from "sonner";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [mainImage, setMainImage] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                if (data.images && data.images.length > 0) {
                    setMainImage(data.images[0]);
                }
                if (data.colors && data.colors.length > 0) {
                    setSelectedColor(data.colors[0]);
                }
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedColor && product.colors.length > 0) {
            toast.error("Please select a color");
            return;
        }
        if (!selectedSize && product.sizes.length > 0) {
            toast.error("Please select a size");
            return;
        }
        addToCart({
            ...product,
            selectedColor,
            selectedSize,
        });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-[#f7f3ee] py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* IMAGE SECTION */}
                    <div className="w-full space-y-4">
                        <div className="aspect-[3/4] bg-[#e8e3db] rounded-xl overflow-hidden shadow-sm relative">
                            <img
                                src={mainImage || product.images?.[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.stock === 0 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold uppercase tracking-widest">Out of Stock</span>
                                </div>
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMainImage(img)}
                                        className={`w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="space-y-8 pt-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="uppercase text-sm tracking-widest text-gray-500">
                                    {product.category}
                                </p>
                                {product.stock > 0 && product.stock < 5 && (
                                    <span className="text-orange-600 text-xs font-bold uppercase tracking-wide">
                                        Low Stock: Only {product.stock} left
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <p className="text-3xl font-semibold text-gray-900">
                                ${product.price}
                            </p>
                        </div>

                        <div className="prose prose-lg text-gray-600 leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {/* VARIANTS */}
                        <div className="space-y-6 border-t border-gray-200 pt-6">
                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Color</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black border-transparent' : 'border-gray-200 hover:border-gray-400'}`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Selected: <span className="font-medium text-gray-900">{selectedColor}</span></p>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Size</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-[3rem] px-4 py-2 rounded-md border text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`w-full md:w-auto px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${product.stock === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
