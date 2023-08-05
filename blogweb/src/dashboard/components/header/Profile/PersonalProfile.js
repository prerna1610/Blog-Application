import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';

export default function PersonalProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const userEmail = ''; 

  useEffect(() => {
    
    axios
      .get(`http://localhost:8080/users?email=${userEmail}`)
      .then((response) => {
        // Assuming the response contains the user's information
        const user = response.data;

        // Update the state with the user's information
        setUserInfo(user);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  }, [userEmail]);

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBCardBody className="p-4">
                {userInfo ? (
                  <>
                    <MDBTypography tag="h5">{userInfo.name}</MDBTypography>
                    <MDBTypography tag="p">{userInfo.username}</MDBTypography>
                    <MDBTypography tag="p">{userInfo.phone}</MDBTypography>
                    <MDBTypography tag="p">{userInfo.address}</MDBTypography>
                    <MDBTypography tag="p">{userInfo.state}</MDBTypography>
                    <MDBTypography tag="p">{userInfo.zip}</MDBTypography>
                    <MDBTypography tag="p">{userInfo.email}</MDBTypography>
                  </>
                ) : (
                  <p>Loading user information...</p>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
