import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../HomePage/Footer';
import Navbar from '../HomePage/navbar';
import { useTranslation } from 'react-i18next';

const ChatPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Header */}
        {/* Weather Update Section */}
        <section className="py-16 bg-blue-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('weather_update')}</h2>
            <div className="flex justify-center">
              <div className="p-6 bg-white rounded-lg shadow-md max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-2">{t('current_weather')}</h3>
                <p className="text-gray-600">{t('temperature')}: 25°C</p>
                <p className="text-gray-600">{t('condition')}: Sunny</p>
                <p className="text-gray-600">{t('humidity')}: 60%</p>
                {/* You can fetch and display dynamic weather data here */}
              </div>
            </div>
          </div>
        </section>
        

        {/* Report Section */}
        {/* <section id="reports" className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Reports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Report Title</h3>
                <p className="text-gray-600">Brief description of the report...</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Report Title</h3>
                <p className="text-gray-600">Brief description of the report...</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Report Title</h3>
                <p className="text-gray-600">Brief description of the report...</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Image Capture Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('image_capture')}</h2>
            <div className="flex justify-center space-x-4">
              <Link to="/captureimage" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-center">Capture Image and Chat with AI</Link>
              
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ChatPage;