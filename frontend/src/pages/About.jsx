import React from 'react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Our Story
                    </h1>
                    <p className="mt-6 text-xl max-w-3xl mx-auto text-gray-300">
                        Crafting premium experiences for the modern lifestyle. We believe in quality, sustainability, and timeless design.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Driven by Passion
                            </h2>
                            <p className="mt-4 text-lg text-gray-500">
                                Founded in 2023, Luxe began with a simple mission: to provide high-quality, ethically sourced products that elevate everyday living. We started as a small team of designers and dreamers, united by a love for craftsmanship.
                            </p>
                            <p className="mt-4 text-lg text-gray-500">
                                Today, we continue to push boundaries, exploring new materials and designs while staying true to our core values. Every product tells a story of dedication and artistry.
                            </p>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <img
                                className="rounded-lg shadow-xl w-full object-cover h-96"
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                                alt="Team working"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="rounded-lg overflow-hidden mb-4 h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Quality"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Uncompromised Quality</h3>
                            <p className="mt-2 text-gray-500">
                                We source only the finest materials to ensure durability and comfort in every piece.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="rounded-lg overflow-hidden mb-4 h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Sustainability"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Sustainability First</h3>
                            <p className="mt-2 text-gray-500">
                                Our commitment to the planet drives our choices, from eco-friendly packaging to ethical manufacturing.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="rounded-lg overflow-hidden mb-4 h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Design"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Timeless Design</h3>
                            <p className="mt-2 text-gray-500">
                                We create pieces that transcend trends, offering style that lasts a lifetime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter / CTA */}
            <div className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white">Join Our Journey</h2>
                    <p className="mt-4 text-xl text-gray-300">
                        Subscribe to our newsletter for exclusive updates, behind-the-scenes content, and early access to new collections.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex rounded-md shadow">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
