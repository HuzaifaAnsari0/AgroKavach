import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './HomePage/navbar';
import Footer from './HomePage/Footer';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, selectedBottle } = location.state || {};

  React.useEffect(() => {
    if (product && selectedBottle) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [product, selectedBottle]);

  if (!product || !selectedBottle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md"
        >
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-700 mb-6">We couldn't process your request. Let's try again!</p>
          <button
            onClick={() => navigate('/store')}
            className=" bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Store
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">Purchase Confirmation</h1>
            <p className="text-lg">Thank you for your purchase!</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Size</p>
                <p className="text-lg font-semibold">{selectedBottle.size}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="text-lg font-semibold">{quantity}</p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-600">Total Price</p>
              <p className="text-3xl font-bold text-green-800">₹{selectedBottle.price * quantity}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/store')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyNow;

