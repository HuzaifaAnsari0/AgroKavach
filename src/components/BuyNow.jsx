import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './HomePage/navbar';
import Footer from './HomePage/Footer';

const BuyNow = () => {
  const location = useLocation();
  const { product, quantity, selectedBottle } = location.state || {};

  if (!product || !selectedBottle) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 shadow-md rounded-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Invalid Purchase Details</h1>
          <p className="text-gray-700">We couldn't process your request. Please try again.</p>
          <button
            onClick={() => window.location.href = '/store'}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Purchase Confirmation</h1>
        <p className="text-gray-700 mb-4">Thank you for your purchase!</p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">{product.name}</h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-gray-700 mb-2"><span className="font-bold">Size:</span> {selectedBottle.size}</p>
          <p className="text-gray-700 mb-2"><span className="font-bold">Quantity:</span> {quantity}</p>
          <p className="text-gray-700 mb-2"><span className="font-bold">Total Price:</span> ₹{selectedBottle.price * quantity}</p>
        </div>
        <button
          onClick={() => window.location.href = '/store'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BuyNow;
