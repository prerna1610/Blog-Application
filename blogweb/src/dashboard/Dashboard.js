import React from 'react'
import './scss/whole.css'
import { NavLink } from 'react-router-dom'




import {

    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
   
    CNavLink,
    CNavItem,

} from '@coreui/react'


import CIcon from '@coreui/icons-react'





import { AppHeaderDropdown } from './components/header/index'


import './dashboard.css'





const Dashboard = () => {

    

    return (
        <>
            {/* <------------------Header--------------------> */}
            <CHeader position="sticky" className="mb-4">
                <CContainer fluid>
                    {/* <CHeader className='navbarlogo'>
                    <img src={logos} alt="Logos" />
                        
                    </CHeader> */}
                    
                    <CHeaderNav className="d-none d-md-flex me-auto ">
                        <CNavItem>
                            <CNavLink to="/post" component={NavLink}>
                                Create post
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href="/home">Home Page</CNavLink>
                        </CNavItem>

                    </CHeaderNav>
                    
                    <CHeaderNav className="ms-3">
                        <AppHeaderDropdown />
                    </CHeaderNav>
                </CContainer>
                

            </CHeader>


        </>
    )
}

export default Dashboard
