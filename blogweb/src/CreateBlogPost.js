import React, { useState, useContext, useEffect } from 'react';
import { BlogContext } from './BlogContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {homePage} from './service/user-service';
import "./main.css"

const CreateBlogPost = () => {
  const { addBlogPost } = useContext(BlogContext);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const navigate = useNavigate();
  const [username, setUsername] =  useState({});

 

  const handleSubmit = (e) => {
    e.preventDefault();


    const newPost = {
      title,
      content
      // timestamp: new Date().getTime(),
    };
    console.log(newPost);

    
  const data=localStorage.getItem("user");
    const jsonObject = JSON.parse(data);

    // Extracted the JWT token from the JSON object
    const jwtToken = jsonObject.jwtToken;
    
    console.log(jwtToken);
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
   
    axios
      .post('http://localhost:8080/post', newPost, config)
      .then((response) => {
        console.log(response.data);
        
        addBlogPost(newPost);
        setTitle('');
        setContent('');
        
        navigate('/home');
      })
      .catch((error) => {
        console.error('Failed to create blog post:', error);
        
      });


  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the token in the Authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  

  return (


    <section className="color vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card log text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-2 mt-md-2 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Blog Post</h2>
                  <p className="text-white-50 mb-5">Please enter your post!!!</p>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="title">
                      Title
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="title"
                      placeholder="Enter the title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-outline form-white mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control p-5"
                    id="content"
                    placeholder="Enter the content"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>

                </div>

                <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBlogPost;
