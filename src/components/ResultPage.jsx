import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './HomePage/Footer';
import Navbar from './HomePage/navbar';
import { useTranslation } from 'react-i18next';
import { FaFilePdf } from 'react-icons/fa'; // Import PDF icon from react-icons

const ReportPage = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(''); // Fetch reports from API
        // const data = await response.json();
        const data =[{id:1,diseaseType:"Crop Fungal Rust",date:"2024-09-06",pdfLink:"https://firebasestorage.googleapis.com/v0/b/agroshield-64778.appspot.com/o/report1.pdf?alt=media&token=525e0ebc-d569-45c0-8f6f-c0ba1ca04a81"},{id:2,diseaseType:"Late Blight",date:"2024-09-06",pdfLink:"https://firebasestorage.googleapis.com/v0/b/agroshield-64778.appspot.com/o/report2.pdf?alt=media&token=f6f29dd1-59b1-4a1a-98c8-24a2cdca1bff"},{id:3,diseaseType:"Powdery Mildew",date:"2024-09-06",pdfLink:"https://firebasestorage.googleapis.com/v0/b/agroshield-64778.appspot.com/o/report3.pdf?alt=media&token=c711324b-6e20-4f90-9329-e212f02307cd"}];

        // Ensure data is an array
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setReports([]); // Set to empty array if data is not an array
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
        setReports([]); // Set to empty array on error
      }
    };

    fetchReports();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Report Section */}
        <section id="reports" className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('reports')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {reports.length > 0 ? (
                reports.map(report => (
                  <div key={report.id} className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    {/* Left Side - PDF Icon */}
                    <div className="flex-shrink-0">
                      <FaFilePdf className="text-red-500 text-4xl" /> {/* PDF icon */}
                    </div>
                    {/* Right Side - Report Details */}
                    <div className="ml-4 flex-grow">
                      <h3 className="text-xl font-semibold mb-1">{report.diseaseType}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <p>{new Date(report.date).toLocaleDateString()}</p> {/* Formatted date */}
                        <a 
                          href={report.pdfLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:underline font-medium"
                        >
                          {t('View or Download')}
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No reports available</p>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ReportPage;
