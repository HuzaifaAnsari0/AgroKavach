// src/components/HomePage/navbar.jsx
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';
import { useCart } from '../../actions/context';

function Navbar() {
  const navigate = useNavigate();
  // const {isLoggedIn, changeToLogin} = useState(false);
  const {isLogin,setIsLogin,name,setName,user,setUserDetails}= useCart();

  useEffect(()=>{
      if(localStorage.getItem('user'))
      {
        setIsLogin(true);
      }
  },[]);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo */}
        <img
          src="/images/logoPrim.svg" // Replace with the actual path to your logo image in the public folder
          alt="Logo"
          className="w-10 h-10 mr-3"
        />
        {/* <div className="font-bold text-blue-800" style={{ fontSize: "1.75rem" }}>AgroShield</div> */}
      </div>
      
      <div className="flex items-end space-x-4">
        <LanguageSwitcher />
        {/* Profile Picture */}

        {isLogin ? 
          <img
            src={JSON.parse(localStorage.getItem('user'))['photoURL']} // Replace with profile image URL
            alt="Profile"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={() => navigate('/profile')}
          /> : 
          <img
            src="images/logindoor.svg" // Replace with profile image URL
            alt="Profile"
            className="w-10 h-10 cursor-pointer"
            onClick={() => navigate('/login')}
          />
        }

      </div>
    </nav>
  );
};

export default Navbar;