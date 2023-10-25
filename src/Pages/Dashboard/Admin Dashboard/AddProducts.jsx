import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const AddProducts = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmit = async (data) => {
        try {
            const imageData = new FormData();
            imageData.append('image', data.image[0]);

            const imgResponse = await fetch(img_hosting_url, {
                method: 'POST',
                body: imageData,
            });

            if (!imgResponse.ok) {
                console.error('Image upload failed:', imgResponse);
                return;
            }

            const imgData = await imgResponse.json();
            const imageUrl = imgData.data.url;

            // Create the product data with the image URL
            const productData = {
                name: data.name,
                price: parseFloat(data.price),
                description: data.description,
                image: imageUrl,
            };

            // Send the product data to your server
            const response = await fetch('https://thinsil-reactjs-server.vercel.app/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added',
                    text: 'The product has been successfully added.',
                });

                reset();
            } else {
                console.error('Product creation failed:', response);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 border border-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price:</label>
                    <input
                        type="number"
                        id="productPrice"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 border border-gray-400 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('price', { required: true, min: 0 })}
                    />
                    {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description:</label>
                    <textarea
                        id="productDescription"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 border border-gray-400 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('description', { required: true })}
                    />
                    {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image:</label>
                    <input
                        type="file"
                        id="productImage"
                        className={`mt-1 p-2 w-full rounded-md focus:ring focus:ring-indigo-200 border border-gray-400 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('image', { required: true })}
                    />
                    {errors.image && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md hover:shadow-md transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProducts;
