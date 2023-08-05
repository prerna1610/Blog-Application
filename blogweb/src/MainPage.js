import React, { useContext, useEffect, useRef, useState } from 'react';
import { BlogContext } from './BlogContext';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';
import profilepic1 from './dashboard/assets/images/profilepic/1.png';
import { formatDate } from './utils/formatDate';
import "./main.css";

import axios from 'axios';


import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';

// useRef
const MainPage = () => {
  const navigate = useNavigate();
  const [storedPosts, setStoredPosts] = useState([]);
  const [showDropdownIndex, setShowDropdownIndex] = useState(null);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/create');

  };

  const handleDropdownToggle = (index) => {
    setShowDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = storedPosts.filter((_, i) => i !== index);
      setStoredPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setShowDropdownIndex(null);
    }
  };

  const handleEdit = (index) => {
    const postToEdit = storedPosts[index];
    setEditedIndex(index);
    setEditedTitle(postToEdit.title);
    setEditedContent(postToEdit.content);
  };

  const handleSave = () => {
    if (editedIndex !== null) {
      const updatedPost = {
        ...storedPosts[editedIndex],
        title: editedTitle,
        content: editedContent,
      };
  
      const updatedPosts = [...storedPosts];
      updatedPosts[editedIndex] = updatedPost;
  
      setStoredPosts(updatedPosts);
      setEditedIndex(null);
      setEditedTitle('');
      setEditedContent('');
  
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };



  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
  
    axios
      .get('http://localhost:8080/home', config)
      .then((response) => {
        console.log(response.data);
        setStoredPosts(response.data); // Update storedPosts with the fetched data
      })
      .catch((error) => {
        console.log('Failed to fetch blog posts:', error);
        // Handle the error
      });
  }, []);

 

  return (
    
    <div className='color'>
      
      {storedPosts.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        <div className="container p-5 ">
          {storedPosts.map((post, index) => (
            <div className="card mb-4 " key={index}>
              <header className="header">
                <div className="user-profile">
                  <CAvatar src={profilepic1} size="md" />
                  <span className="username p-4">{post.email}</span>
                </div>
                <div className="dropdown">
                  <CDropdown>
                    <CDropdownToggle color="secondary">
                      <i className="fas fa-ellipsis-v"></i>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => handleDelete(index)}>Delete</CDropdownItem>
                      <CDropdownItem onClick={() => handleEdit(index)}>Edit</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </header>
              <div className="card-body mt-4 mb-5 p-5 ">
                {editedIndex === index ? (
                  <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                ) : (
                  <h3 className="card-title">{post.title}</h3>
                )}
                {editedIndex === index ? (
                  <input type="text" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                ) : (
                  <p className="card-text mt-5">{post.content}</p>
                )}
                <p className="card-text">Posted {formatDate(post.created)}</p>
              </div>
              {editedIndex === index ? (
                <div>
                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div className="card-footer beige">
                  <Comment postId={index} />
                </div>
              )}
            </div>
          ))} 
        </div>
      )}
    </div>
  );
};

export default MainPage;







