import React, { useEffect, useState } from 'react';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve comments from local storage
    const storedComments = localStorage.getItem(`comments_${postId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [postId]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
    setError(''); // Clear the error when the user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      setError('Please enter a comment.'); // Set the error message
      return;
    }

    const comment = {
      id: Date.now(),
      content: newComment,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);

    // Store comments in local storage
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));

    setNewComment('');
  };

  const handleDelete = (commentId) => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
  
      // Update comments in local storage
      localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    }
  };
  

  return (
    <div className="comments-section">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="list-group p-5">
          {comments.map((comment) => (
            <div className="list-group-item d-flex justify-content-between mt-2" key={comment.id}>
              {comment.content}
              <button className="delete-comment btn btn-danger" onClick={() => handleDelete(comment.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className='mt-2'>
        <div className="form-group">
          <input
            className="form-control p-5"
            placeholder="Add a comment"
            type="text"
            value={newComment}
            onChange={handleInputChange}
          />
        </div >
        <button className="btn btn-primary mt-5 mb-5" type="submit" disabled={error}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;