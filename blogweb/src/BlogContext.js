// BlogContext.js

import React, { createContext, useState } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  const addBlogPost = (newPost) => {
    setBlogPosts([...blogPosts, newPost]);
  };

  return (
    <BlogContext.Provider value={{ blogPosts, setBlogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};
