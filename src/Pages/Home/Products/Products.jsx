import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const fetchProductsBySearchTerm = async (searchQuery) => {
        try {
            const response = await fetch(`http://localhost:5000/products?search=${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Error fetching products:', response);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        if (query.trim() === '') {
            fetch('http://localhost:5000/products')
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        } else {
            fetchProductsBySearchTerm(query);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                        <div className="relative aspect-w-16 aspect-h-9">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full rounded-t-lg"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-2">${product.price}</p>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <Link
                                to={`/product/${product._id}`}
                                className="block bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 focus:ring focus:ring-indigo-200 transition duration-300 text-center"
                            >
                                View Product Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Products;
