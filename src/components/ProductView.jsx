import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from './items.json';
import Navbar from './HomePage/navbar';
import Footer from './HomePage/Footer';
// import image from '../assets/unnamed.jpg';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((item) => item._id === id);

  if (!product) {
    return (
      <section className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-red-600">Product Not Found</h1>
        <Link to="/store" className="block mt-4 text-center text-blue-600 hover:underline">
          Go Back to Store
        </Link>
      </section>
    );
  }

  const handleBuyNow = (selectedBottle) => {
    navigate('/store/buynow', {
      state: {
        product,
        selectedBottle,
        quantity: 1, // Default quantity
      },
    });
  };

  return (
    <>
    <Navbar />
    <section className="container mx-auto p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <img
          src={product.image1} // Use imported image for ID 1
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-blue-700 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Bottle Options */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Available Options</h2>
          <ul className="mb-6">
            {product.bottleOptions.map((option, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b">
                <span className="text-lg">{option.size}</span>
                <span className="font-bold text-lg text-blue-800">₹{option.price}</span>
                <button
                  onClick={() => handleBuyNow(option)}
                  className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Buy now
                </button>
              </li>
            ))}
          </ul>

          <Link
            to="/store"
            className="ml-4 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </section>
    <>
    <Footer />
    </>
    
    </>
  );
};

export default ProductView;