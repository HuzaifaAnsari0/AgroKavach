import React, { useState } from 'react';
import Footer from '../HomePage/Footer';
import Navbar from '../HomePage/navbar';
import axios from 'axios';
import { useCart } from '../../actions/context';
import { useNavigate } from 'react-router-dom';

function CaptureImage() {
    const [step, setStep] = useState(1); // Tracks which step the user is on
    const [selectedImage, setSelectedImage] = useState(null); // Stores the selected/uploaded image
    const [aiResult, setAiResult] = useState(null); // Stores the AI prediction result
     // Stores the list of diseases identified in the image

     const navigate=useNavigate();

    const {isLogin,setIsLogin,name,setName,user,setUserDetails,history,setHistory,addHistory,diseases,setDiseases,initial, setInitial} = useCart();

    const handleUpload = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(URL.createObjectURL(imageFile));
        console.log('Selected Image:', imageFile);
    
        // Create a FormData object and append the image file with the correct name
        const formData = new FormData();
        formData.append('file', imageFile); // Change 'image' to 'file'
    
        axios.post("https://b90c-152-52-34-131.ngrok-free.app/predict", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Response:', response.data);
            var diseases = response.data.predicted_label;
            diseases=diseases.replace('_',' ')
            setDiseases(diseases);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    
        setStep(3);
    };
    

    const handleCapture = () => {
        // Logic to open camera and capture image
        // Assuming captureImage will set the selected image.
        setStep(3); // Move to AI result step after capturing the image
    };

    const handleAiProcessing = () => {
        // Call AI API to process the selected image
        // Simulate AI response
        const params = new URLSearchParams();
        console.log('Diseases:', diseases);
        if (diseases == `not_a_leaf`) {
            console.log("Not a leaf");
            params.append('prompt', 'The image is not a leaf. Please upload a leaf image.');
            setAiResult('The image is not a leaf. Please upload a leaf image.');
            return
        } else {
        params.append('prompt', `The plant has the following diseases: ${diseases}, give the prescription, and precautions. Tell me if there is emergency treatment required. Give in only maximum 25 words`);
        }
        axios.post("http://localhost:3000/ai/generate", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log('AI Response:', response.data);
            setAiResult(response.data);
        })
        .catch(error => {
            console.error('Error processing image with AI:', error);
        });
        setStep(4); // Move to result step
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setStep(2);
    };

    return (
        <>
            <Navbar />
            <div className="text-center p-6 min-h-screen bg-gray-100 flex flex-col items-center justify-center" style={{height: "100vh"}}>
                <h1 className="text-center text-3xl font-bold text-blue-600 mb-8">Upload Image</h1>
                {step === 1 && (
                    <>
                    <div className="w-full max-w-md text-center ">
                        <button
                            onClick={() => setStep(2)}
                            className="mb-5 w-100 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            style={{width:"10rem"}}
                            >
                            Capture Image
                        </button>
                    </div>
                    </>
                )}
                {step === 2 && (
                    <form className="w-full max-w-lg mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white shadow-md" onSubmit={(e) => { e.preventDefault(); handleUpload(e); }}>
                        <label className="block text-lg font-medium text-gray-700 mb-4">Select Image:</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleUpload} 
                            className="block w-full text-lg text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 focus:outline-none"
                        />
                        <button 
                            type="submit" 
                            className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                        >
                            Upload
                        </button>
                    </form>
                )}

                {step === 3 && selectedImage && (
                    <>
                        <div className="relative w-full max-w-md mt-8 text-center">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Selected Image</h2>
                            <img 
                                src={selectedImage} 
                                alt="Selected" 
                                className="mx-auto w-64 h-64 object-cover rounded-lg shadow-lg mb-4"
                            />
                            <button
                                onClick={handleDeleteImage}
                                className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="w-full max-w-md mt-8 text-center">
                            <button
                                onClick={handleAiProcessing}
                                className="w-half py-3 px-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            >
                                Submit to AI
                            </button>
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div className="w-full max-w-md mt-8 text-center">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Identified Diseases: {diseases}</h2>
                            <ul className="list-disc list-inside text-left text-gray-700">
                                {aiResult || <div className='toploader'><div className="loadersmall"></div></div>}
                            </ul>
                        </div>
                        <div className="w-full max-w-md mt-8 text-center">
                            <button
                                className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                                onClick={()=>{
                                    const data=`The plant is suffering from ${diseases}. The answer was ${aiResult}.`
                                    addHistory({role:'user',data:`The plant is suffering from ${diseases}`});
                                    addHistory({role:'model',data:`The answer was ${aiResult}`});
                                    setInitial(`The plant is suffering from ${diseases}. The answer was ${aiResult}.`);
                                    navigate('/ai');
                                }}
                            >
                                Chat with AI
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default CaptureImage;