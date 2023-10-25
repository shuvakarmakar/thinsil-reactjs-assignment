import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch the user's cart items from the backend based on user's email
        fetch(`http://localhost:5000/cart/${user?.email}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch cart items');
                }
            })
            .then((data) => {
                setCartItems(data);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });
    }, [user]);

    const handleDelete = (itemId) => {
        // Display a confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cart/delete/${itemId}`, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        if (response.ok) {
                            setCartItems((prevCartItems) =>
                                prevCartItems.filter((item) => item._id !== itemId)
                            );
                            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                        } else {
                            throw new Error('Failed to delete item from cart');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting item from cart:', error);
                        // Show an error message
                        Swal.fire('Error', 'An error occurred while deleting the item.', 'error');
                    });
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1>Your Cart</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>
                                    <img
                                        src={item.product.image}
                                        className="mask mask-squircle w-12 h-12"
                                        alt={item.product.name}
                                    />
                                </td>
                                <td>{item.product.name}</td>
                                <td>${item.product.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
