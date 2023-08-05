import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
 
  cilFile,
  cilLockLocked,
 
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import profilepic1 from './../../assets/images/profilepic/1.png'

const AppHeaderDropdown = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    // Clear user data from Local Storage
    localStorage.removeItem('user');

    // Call the logout function passed from the parent component
    if (onLogout) {
      onLogout();


    }
    alert('Successfully logged out!!!')

    // Navigate to the login page
    navigate('/login');
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={profilepic1} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={handleProfileClick}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="/post">
          <CIcon icon={cilFile} className="me-2" />
          Create Post
          
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="login" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
