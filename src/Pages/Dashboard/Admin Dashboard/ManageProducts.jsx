import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleUpdateProduct = async () => {
        if (!selectedProduct) {
            return;
        }

        try {
            const { _id, ...updateData } = selectedProduct;

            const response = await fetch(`http://localhost:5000/products/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                fetchProducts();
                setSelectedProduct(null);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product updated successfully',
                });
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const handleDeleteProduct = async (productId) => {
        if (!productId) {
            console.error('Invalid product ID');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/products/${productId._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchProducts();
                setSelectedProduct(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Product Deleted',
                    text: 'The product has been successfully deleted.',
                });
            } else {
                console.error('Failed to delete product');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete the product. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting the product. Please try again later.',
            });
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Action</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className='text-sm'>{product.name}</td>
                                <td className='text-sm'>{parseFloat(product.price)}</td>
                                <td className='text-justify text-sm'>{product.description}</td>
                                <td>
                                    <button className='btn btn-sm btn-primary' onClick={() => handleSelectProduct(product)}>Edit</button>
                                </td>
                                <td>
                                    <button className='btn btn-sm btn-warning' onClick={() => handleDeleteProduct(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {selectedProduct && (
                <div>
                    <h2>Edit Product</h2>
                    <div className="max-w-md">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedProduct.name}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                        />
                    </div>
                    <div className="max-w-md">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedProduct.price}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                        />
                    </div>
                    <div className="max-w-md">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedProduct.description}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleUpdateProduct}>Update</button>
                    <button className="btn" onClick={handleDeleteProduct}>Delete</button>
                </div>
            )}
        </div>

    );
};

export default ManageProducts;
