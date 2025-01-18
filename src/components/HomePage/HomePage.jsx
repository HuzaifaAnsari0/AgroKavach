// src/components/HomePage/HomePage.jsx
import React from 'react';
import Footer from './Footer';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome, FaFileAlt, FaBell, FaLightbulb, FaComments } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const{t}= useTranslation();

  const handlegetStarted = () => {
    navigate('/register');
};

const handleUploadImageClick = () => {
  navigate('/CaptureImage');
};
const handleReportClick = () => {
  navigate('/report');
};




  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20 bg-blue-100">
          <h1 className="text-5xl font-bold text-blue-800 mb-4 mx-7">{t('efficient_farm_management')}</h1>
          <p className="text-lg text-gray-700 mb-8 mx-7">{t('streamline_operations')}</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">{t('get_started')}</button>
        </section>

      {/* Features Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('dashboard')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-lg shadow-md cursor-pointer" onClick={handleUploadImageClick}>
                <h3 className="text-xl font-semibold mb-2">{t('upload_image_feature')}</h3>
                <p className="text-gray-600">{t('upload_image_description')}</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{t('alerts')}</h3>
                <p className="text-gray-600">{t('alerts_description')}</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow-md cursor-pointer" onClick={handleReportClick}>
                <h3 className="text-xl font-semibold mb-2">{t('view_reports')}</h3>
                <p className="text-gray-600">{t('view_reports_description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <div className="container mx-auto px-6 mt-2 mb-14 pb-9">
          <h2 className="text-3xl font-bold text-center text-gray-800 mt-3 mb-8">{t('quick_actions')}</h2>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 cursor-pointer" onClick={handleUploadImageClick}>{t('diagnose_disease')}</button>
            <button className="px-6 py-3 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300">{t('send_alert')}</button>
            <button className="px-6 py-3 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 cursor-pointer" onClick={handleReportClick}>{t('check_reports')}</button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )};

export default HomePage;