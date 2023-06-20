import React, { useRef } from 'react';

const AddComment = (props) => {
  const newCommentRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newCommentRef.current.value === '') {
        return;
      }

      props.onAddComment(newCommentRef.current.value);
      newCommentRef.current.value = '';
    }
  };

  return (
    <div className="write-comment-group">
      <input
        className="write-comment-field"
        type="text"
        ref={newCommentRef}
        placeholder="Leave a comment.."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default AddComment;
