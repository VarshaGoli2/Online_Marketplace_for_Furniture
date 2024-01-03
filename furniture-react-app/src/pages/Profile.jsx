// Profile.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import { toast } from 'react-toastify';
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import Button from '@mui/material/Button';

const Profile = () => {
const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    fname: '',
    lname: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUserData = async () => {
      const username = sessionStorage.getItem("username")
      const response = await axios.get(`http://localhost:5001/users/userInfo/${username}`);
      if (response.status === 200)  {
        // const userData = await response.json();
        setUserData(response.data);
    }
    else {
        toast.error("Unable to retrieve user data", { autoClose: 15 })
    }
        
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    // Perform any cancel action here
    // For example, redirecting to another page
    navigate('/home');
  };

  const handleSaveChanges = async () => {
    try {
        const response = await axios.put(`http://localhost:5001/users/edit/${userData.username}`, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          // Optionally, you can provide user feedback here
        } else {
          console.error('Error while updating user info');
          // Optionally, you can provide an error message to the user
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <Helmet title={"Profile"}>
    <div className="profile-container">
      <h1>User Profile</h1>
      {/* <div className="profile-info">
        <p>Username: {userData.username}</p>
        <p>First Name: {userData.fname}</p>
        <p>Last Name: {userData.lname}</p>
        <p>Phone: {userData.phone}</p>
        <p>Street: {userData.street}</p>
        <p>City: {userData.city}</p>
        <p>Country: {userData.country}</p>
        <p>Zip Code: {userData.zipCode}</p>
      </div> */}

      <form className="edit-profile-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={userData.username} readOnly />

        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" name="fname" value={userData.fname} onChange={handleInputChange} />

        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" name="lname" value={userData.lname} onChange={handleInputChange} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />

        <label htmlFor="street">Street:</label>
        <input type="text" id="street" name="street" value={userData.street} onChange={handleInputChange} />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={userData.city} onChange={handleInputChange} />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={userData.country} onChange={handleInputChange} />

        <label htmlFor="zipCode">Zip Code:</label>
        <input type="text" id="zipCode" name="zipCode" value={userData.zipCode} onChange={handleInputChange} />


          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="button"
            variant="contained"
            onClick={handleCancel}
            sx={{ mt: 3, mb: 2 , bgcolor: 'var(--primary-color)'}}
          >
            Cancel
          </Button>
          <Button
              type="submit"
              variant="contained"
              onClick={handleSaveChanges}
              sx={{ mt: 3, mb: 2 , bgcolor: 'var(--primary-color)'}}
             >
            Save Changes
        </Button>
        
          </div>
      </form>
    </div>
    </Helmet>
  );
};

export default Profile;
