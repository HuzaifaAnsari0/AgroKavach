import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from './items.json';
import Navbar from './HomePage/navbar';
import Footer from './HomePage/Footer';
// import image from '../assets/unnamed.jpg';

const EcomPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from JSON file
    setProducts(productsData);
  }, []);

  return (
    <>
    <Navbar />
    <section className="container mx-auto p-8 md:py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Welcome to Our Store</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 items-start">
        {products.map((product) => (
          <section
            key={product._id}
            className="p-5 bg-white shadow-md rounded-lg transform duration-300 hover:-translate-y-2 hover:shadow-xl border border-blue-100"
          >
            <Link to={`/store/productview/${product._id}`} className="block">
              <img
                src={product.image1}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-md mb-4"
              />
              <h1 className="text-2xl font-semibold text-blue-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
              <h2 className="text-lg font-bold text-blue-600">₹{Math.min(...product.bottleOptions.map((opt) => opt.price))}</h2>
            </Link>
            <Link
              to={`/store/productview/${product._id}`}
              className="block mt-5 p-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
            >
              View Options
            </Link>
          </section>
        ))}
      </section>
    </section>
    <Footer />
    </>
  );
};

export default EcomPage;
