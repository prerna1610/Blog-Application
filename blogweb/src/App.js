import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './signin/Login';
import Register from './signin/Register';
import Dashboard from './dashboard/Dashboard';
import MainPage from './MainPage';
import CreateBlogPost from './CreateBlogPost';
import { BlogProvider } from './BlogContext';
import Profile from './dashboard/components/header/Profile/Profile';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const setUserState = (userDetails) => {
    setUser(userDetails);
    localStorage.setItem('user', JSON.stringify(userDetails));
  };

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    const response = await axios.post('http://localhost:8080/auth/logout', user);
  };

  return (
    <div className="App">
      <Router>
    
        {user && <Dashboard onLogout={handleLogout} />}
        <Routes>
          {!user && <Route path="/" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<Login setUserState={setUserState} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {user ? (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              {/* <Route path="/" element={<Dashboard onLogout={handleLogout} />} /> */}
              <Route
                path="/home"
                element={
                  <BlogProvider>
                    <MainPage user={user} />
                  </BlogProvider>
                }
              />
              <Route path="/post" element={<CreateBlogPost />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login setUserState={setUserState} />} />
            </>
          )}
        </Routes>
     
      </Router>
    </div>
  );
}

export default App;

























// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './Login';
// import Register from './Register';
// import Dashboard from '../dashboard/Dashboard';
// import MainPage from './MainPage';
// import CreateBlogPost from './CreateBlogPost';
// import { BlogProvider } from './BlogContext';

// function App() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

//   // Function to set the user state and store user details in Local Storage
//   const setUserState = (userDetails) => {
//     setUser(userDetails);
//     localStorage.setItem('user', JSON.stringify(userDetails));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <div className="App">
//       <Router>
//         {user && <Dashboard onLogout={handleLogout} />}
//         <Routes>
//           <Route path="/login" element={<Login setUserState={setUserState} />} />
//           <Route path="/signup" element={<Register />} />
//           {user ? (
//             <>
//               <Route path="/" element={<Navigate to="/dashboard" />} />
//               <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
//               <Route
//                 path="/home"
//                 element={
//                   <BlogProvider>
//                     <MainPage />
//                   </BlogProvider>
//                 }
//               />
//               <Route path="/create" element={<CreateBlogPost />} />
//             </>
//           ) : (
//             <>
//               <Route path="/" element={<Navigate to="/login" />} />
//               <Route path="/home" element={<MainPage />} />
//             </>
//           )}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
