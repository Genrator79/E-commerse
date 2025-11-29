import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white py-12 border-t border-stone-100 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-sans font-bold mb-4">Luxe.</h3>
                        <p className="text-soft-text-secondary text-sm">
                            Premium essentials for the modern lifestyle. Designed for comfort and elegance.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-soft-text-secondary">
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-soft-text-secondary">
                            <li>FAQ</li>
                            <li>Shipping & Returns</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Stay Connected</h4>
                        <p className="text-sm text-soft-text-secondary mb-4">Subscribe for exclusive offers.</p>
                        {/* Newsletter input could go here */}
                    </div>
                </div>
                <div className="border-t border-stone-100 mt-12 pt-8 text-center text-sm text-soft-text-secondary">
                    © {new Date().getFullYear()} Luxe E-Commerce. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
