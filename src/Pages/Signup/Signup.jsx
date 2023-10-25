import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const password = watch('password', '');

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(loggedUser => {
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Sign Up Successful',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
            <div className="hero-content flex-col lg:flex-row">
                <h1 className="text-5xl text-center text-white font-bold mb-4">Signup Here</h1>
                <div className="card flex-shrink-0 w-full max-w-sm bg-white shadow-lg rounded-md mx-auto mt-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                name="name"
                                placeholder="Name"
                                className={`input input-bordered rounded-md ${errors.name ? 'input-error' : ''}`}
                            />
                            {errors.name && <span className="text-red-700">{errors.name.message}</span>}
                        </div>
                        {/* email */}
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                {...register('email', { required: 'Email is required' })}
                                name="email"
                                placeholder="Email"
                                className={`input input-bordered rounded-md ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <span className="text-red-700">{errors.email.message}</span>}
                        </div>
                        {/* Password */}
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*])/,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                                    },
                                })}
                                name="password"
                                placeholder="Password"
                                className={`input input-bordered rounded-md ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <span className="text-red-700">{errors.password.message}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    validate: (value) => value === password || 'Passwords do not match',
                                })}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={`input input-bordered rounded-md ${errors.confirmPassword ? 'input-error' : ''}`}
                            />
                            {errors.confirmPassword && <span className="text-red-700">{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary w-full" value="Sign Up" />
                        </div>
                    </form>
                    <p className="text-center text-gray-600 my-4">Already have an account? <Link to="/login" className="text-purple-600">Please login</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Signup;