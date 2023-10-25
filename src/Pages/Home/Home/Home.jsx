import React from 'react';
import Products from '../Products/Products';

const Home = () => {
    const gradientBackground = {
        background: 'linear-gradient(to bottom, #3490dc, #6574cd)',
        minHeight: '100vh',
    };

    return (
        <div style={gradientBackground}>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold text-white mb-4">Welcome to Our Store</h1>
                <p className="text-lg text-white mb-8">Discover amazing products and shop with confidence.</p>
                <Products />
            </div>
        </div>
    );
};

export default Home;
