import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../HomePage/Footer';
import { FaEdit } from 'react-icons/fa';
import {useCart} from "../../actions/context";
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const {t}=useTranslation();
  const {isLogin,setIsLogin,name,setName,user,setUserDetails}= useCart();


  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: JSON.parse(localStorage.getItem('user'))["displayName"],
    location: "Khet",
    reach: "50 miles radius",
    email: JSON.parse(localStorage.getItem('user'))['email'],
    phone: "+98 1202387891",
    posts: 42,
    about: "I am a dedicated farmer with over 15 years of experience in sustainable agriculture. Passionate about organic farming and innovation."
  });
  const [profilePic, setProfilePic] = useState(JSON.parse(localStorage.getItem('user'))["photoURL"]); // State for profile picture
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image

  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to the file input element

  const toggleEditMode = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (editMode) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  };

  const saveProfile = () => {
    console.log('Profile saved:', profile);
    setEditMode(false);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        <button className="text-gray-600" onClick={goBack}>
          <img src="./images/arrow-left.svg" alt="goback" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{editMode ? t('edit_profile') : t('my_profile')}</h1>
        {editMode && (
          <button className="text-gray-600" onClick={saveProfile}>
            {t('save')}
          </button>
        )}
      </header>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-4 py-6 bg-white shadow-md rounded-lg m-4 mb-6">
        <img
          src={profilePic}
          alt="Profile"
          className="rounded-full w-24 h-24 mb-3 cursor-pointer"
          onClick={handleImageClick} // Click handler for changing the profile picture
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef} // Reference to the file input
            style={{ display: 'none' }} // Hide the file input
          />
        )}
        {editMode ? (
          <input
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="text-xl font-bold mb-2 w-full text-center border-b border-gray-300 focus:outline-none focus:border-blue-600"
          />
        ) : (
          <h2 className="text-xl font-bold mb-2 text-gray-900">{profile.name}</h2>
        )}
        <div className="text-sm text-gray-500">{profile.location}</div>
        <div className="text-xs text-gray-400">{profile.reach}</div>
      </div>

      {/* Account Information */}
      <div className="bg-white p-4 shadow-md rounded-lg m-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('account_information')}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-900">{t('email')}:</span>
          {editMode ? (
            <input
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600"
            />
          ) : (
            <span className="text-gray-900">{profile.email}</span>
          )}
          <FaEdit className="text-gray-500 cursor-pointer" />
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-900">{t('phone')}:</span>
          {editMode ? (
            <input
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600"
            />
          ) : (
            <span className="text-gray-900">{profile.phone}</span>
          )}
          <FaEdit className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* About Me */}
      <div className="bg-white p-4 shadow-md rounded-lg m-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('about_me')}</h3>
        {editMode ? (
          <textarea
            name="about"
            value={profile.about}
            onChange={handleInputChange}
            className="w-full p-2 text-gray-900 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
          />
        ) : (
          <p className="text-gray-600">{profile.about}</p>
        )}
        {editMode && (
          <div className="flex justify-end mt-2">
            <FaEdit className="text-gray-500 cursor-pointer" />
          </div>
        )}
      </div>

      {/* Edit Profile Button */}
      {!editMode && (
        <div className="flex justify-center mt-4 mb-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={toggleEditMode}>Edit Profile</button>
        </div>
      )}

      {/* Logout Button */}
        <div className="flex justify-center mt-2 mb-16">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={()=>{
            setIsLogin(false);
            localStorage.clear();
            navigate("/");
          }}>Logout</button>
        </div>
      {/* Bottom Navigation */}
      <Footer />
    </div>
  );
};

export default Profile;