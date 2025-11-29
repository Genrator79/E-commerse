import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
                    <p className="mb-4">Manage your store's products. Add, update, or remove items.</p>
                    <Link
                        to="/admin/products"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Manage Products
                    </Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                    <p className="mb-4">Manage registered users. View and remove user accounts.</p>
                    <Link
                        to="/admin/users"
                        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Manage Users
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
