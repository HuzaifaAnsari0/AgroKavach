import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaUpload, FaBell, FaChartBar, FaStore, FaLightbulb } from 'react-icons/fa';
import Navbar from './navbar';
import Footer from './Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleUploadImageClick = () => {
    navigate('/CaptureImage');
  };

  const handleReportClick = () => {
    navigate('/report');
  };

  const handleStore = () => {
    navigate('/store');
  };

  const handlerecommned = () => {
    navigate('/chat');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.section 
          className="text-center py-20"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-bold text-blue-800 mb-6">{t('efficient_farm_management')}</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">{t('streamline_operations')}</p>
          <button 
            onClick={handleGetStarted}
            className="   bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            {t('get_started')}
          </button>
        </motion.section>

        <motion.section 
          className="py-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 ">{t('dashboard')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaUpload, title: 'upload_image_feature', description: 'upload_image_description', action: handleUploadImageClick, actionText: 'diagnose_disease' },
               { icon: FaLightbulb, title: 'Recommendations', description: 'alerts_description', action: handlerecommned, actionText: 'Crop Prediction' },
              { icon: FaChartBar, title: 'view_reports', description: 'view_reports_description', action: handleReportClick, actionText: 'check_reports' },
              { icon: FaStore, title: 'Our Store', description: 'One stop solution for all your needs', action: handleStore, actionText: 'Visit Store' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="flex items-center mb-4">
                  <item.icon className="text-2xl text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">{t(item.title)}</h3>
                </div>
                <p className="text-gray-600 mb-4">{t(item.description)}</p>
                <button
                  onClick={item.action}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  {t(item.actionText)}
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="py-16 bg-white rounded-lg shadow-md"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('quick_actions')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleUploadImageClick}
              className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 font-bold py-2 px-4 rounded-full transition duration-300"
            >
              {t('diagnose_disease')}
            </button>
            <button 
            onClick={handleReportClick}
              className="bg-yellow-50 text-yellow-600 border border-yellow-200 hover:bg-yellow-100 font-bold py-2 px-4 rounded-full transition duration-300"
            >
              {t('Crop Recommendation')}
            </button>
            <button 
              onClick={handleStore}
              className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 font-bold py-2 px-4 rounded-full transition duration-300"
            >
              {t('Store')}
            </button>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

