import React, { useEffect, useState } from "react";
import { config, endpoints, frontendMessages } from '../../config/index';
import "./Profile.css";


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem("userEmail");  // Pull from localStorage

  useEffect(() => {
    if (!email) return;


    fetch(`${config.API_BASE_URL}${endpoints.PROFILE}/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(frontendMessages.error.profileFetch, error);
      });
  }, [email]);

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile flex" >
      <div className="photo">
      </div>
      <div>
        <p><strong>Name :</strong> {userData.firstName}</p>
        <p><strong>Sur Name :</strong> {userData.lastName}</p>
        <p><strong>Email :</strong> {userData.email}</p>
        <p><strong>Role :</strong> {userData.role}</p>
        <p><strong>Id :</strong> {userData.id}</p>
      </div>

    </div>
  );
};

export default Profile;
