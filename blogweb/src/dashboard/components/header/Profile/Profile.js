import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import profilepic1 from '../../../assets/images/profilepic/1.png'
import "./profile.css"

import {
  CAvatar,
  
} from '@coreui/react'

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    axios
      .get('http://localhost:8080/profile', config)
      .then((response) => {
        console.log(response.data);
        setUserProfile(response.data); // Set the user's profile data to the state
      })
      .catch((error) => {
        console.log('Failed to fetch user profile:', error);
        // Handle the error
      });
  }, []);

  if (!userProfile) {
    // Render a loading message or spinner while waiting for the profile data
    return <p>Loading...</p>;
  }

  return (
    // <div>
    //   <h2>Profile</h2>
    //   <p>Name: {userProfile.name}</p>
    //   <p>Username: {userProfile.username}</p>
    //   <p>Email: {userProfile.email}</p>
    //   <p>Phone: {userProfile.phone}</p>
    //   <p>Address: {userProfile.address}</p>
    //   <p>State: {userProfile.state}</p>
    //   <p>Zip: {userProfile.zip}</p>
    // </div>
    <section className="vh-100 color " >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center ">
          <MDBCol  className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0 ">
                <MDBCol md="4" className=" text-center gradients-custom"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <CAvatar src={profilepic1} size="md" className="my-5" style={{ width: '80px' }} fluid/>
                  <MDBTypography tag="h6">Name</MDBTypography>
                  <MDBCardText className="text-primary">{userProfile.name}</MDBCardText>

                  
                </MDBCol>
                <MDBCol md="8 custom">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6" className='text-center'>INFORMATION</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"className='text-center'>Email</MDBTypography>
                        <MDBCardText className="text-primary text-center">{userProfile.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"className='text-center'>Username</MDBTypography>
                        <MDBCardText className="text-primary text-center">{userProfile.username}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    
                    {/* <hr className="mt-0 mb-4" /> */}
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"className='text-center'>Address</MDBTypography>
                        <MDBCardText className="text-primary text-center">{userProfile.address}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"className='text-center'>Phone</MDBTypography>
                        <MDBCardText className="text-primary text-center">{userProfile.phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"className='text-center'>State</MDBTypography>
                        <MDBCardText className="text-primary text-center">{userProfile.state}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"className='text-center'>Zip Code</MDBTypography>
                        <MDBCardText className="text-primary text-center">{userProfile.zip}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Profile;
