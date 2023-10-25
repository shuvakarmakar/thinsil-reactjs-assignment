import { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl mx-auto p-4">
            <div className="flex items-center border rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
                <input
                    type="text"
                    placeholder="Search products by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full py-2 px-4 bg-transparent outline-none text-white"
                />
                <button
                    type="submit"
                    className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-4 py-2 ml-2 focus:ring focus:ring-indigo-200 transition duration-300"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBox;
