import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';

const ProductDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState(null);
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Product not found');
                }
            })
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        const userData = {
            email: user?.email,
        };
        const productId = id;

        const requestData = {
            email: userData.email,
            quantity: 1,
            product: product, 
        };

        fetch(`http://localhost:5000/cart/add/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), 
        })
            .then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Added to Cart',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    throw new Error('Failed to add product to cart');
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };




    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src={product.image} alt={product.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <p className="text-gray-600 text-lg">${product.price}</p>
                        {!isAdmin && (
                            <button onClick={handleAddToCart} className="btn btn-primary mt-2">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
