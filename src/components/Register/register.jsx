import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const location = document.getElementById("location").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmpassword").value;

    if (password !== confirmpassword) {
      alert(t('passwords_do_not_match'));
      return;
    }

    const data = {
      name,
      contact: mobile,
      farmLocation: location,
      email,
      password,
      animals: [],
      crops: []
    };

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", data);
      console.log(response);

      if (response.status === 200) {
        alert(t('registration_successful'));
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 logreg-page">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-blue-500" style={{ fontSize: "2rem" }}>AgroShield</h1>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">{t('register')}</h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">{t('name')}</label>
              <input id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black mt-1" />
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">{t('mobile_number')}</label>
              <input id="mobile" name="mobile" type="tel" autoComplete="tel" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black mt-1" />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">{t('location')}</label>
              <input id="location" name="location" type="text" autoComplete="location" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black mt-1" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">{t('email_address')}</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black mt-1" />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">{t('password')}</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black mt-1" />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">{t('confirm_password')}</label>
              <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black mt-1" />
            </div>

            {/* Register Button */}
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{t('register_button')}</button>
            </div>
          </form>

          {/* Login and Google */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {t('already_registered')}
            <Link to="/login" className="font-semibold leading-6 text-blue-500 hover:text-indigo-500 ml-2">{t('login')}</Link>
            <p className="mt-3">{t('or_register_with')}</p>
            <button type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-green-500 mt-3">
              <img src="./images/Google.svg" alt="Google" className="mr-2" />{t('google')}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;