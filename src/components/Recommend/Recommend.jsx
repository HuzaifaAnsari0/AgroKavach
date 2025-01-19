import { useState } from 'react';
// import { Link } from 'react-router-dom';
import Footer from '../HomePage/Footer';
import Navbar from '../HomePage/navbar';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recommend = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [month, setMonth] = useState('');
  const [predictedCrop, setPredictedCrop] = useState('');
  const [error, setError] = useState('');
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedCrop('');
    setError('');

    try {
      console.log("Location:", location, "Month:", month);
      const formData = new FormData();
      formData.append('location', location);
      formData.append('month', month);
      const response = await axios.post('http://127.0.0.1:5000/predict_crop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set content type for FormData
        },
      });

      if (response.status === 200) {
        setPredictedCrop(response.data.crop)
        setReason(response.data.reason)
      } else {
        setError('Failed to predict the crop. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-light text-dark py-5">
        {/* Header */}
        <Container className="text-center mb-5">
          <h1 className="display-4">{t('CROP RECOMMENDATION')}</h1>
          <p className="lead">{t("Provide your farm's location and the farming month to receive personalized crop recommendations.")}</p>
        </Container>

        {/* Crop prediction form */}
        <Container className="d-flex justify-content-center">
          <div className="bg-white p-5 rounded shadow-lg w-50">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="location">
                <Form.Label>{t('Location')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('Location city')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="rounded-pill border-0 shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="month" className="mt-3">
                <Form.Label>{t('Month')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('Month of farming')}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  className="rounded-pill border-0 shadow-sm"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4 w-100 rounded-pill shadow-sm">
                {t('Get recommendation')}
              </Button>
            </Form>

            {predictedCrop && (
              <Alert variant="success" className="mt-4 text-center">
                <div>
                  {t('Predicted crop')}: <strong>{predictedCrop}</strong>
                </div>
                {t('Reason')}: <strong>{reason}</strong>
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mt-4 text-center">
                {error}
              </Alert>
            )}
          </div>
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Recommend;
