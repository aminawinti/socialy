import React from 'react';
import CommentDetails from './CommentDetails';

const Comments = (props) => {
  return (
    <React.Fragment>
      {props.comments.map((item) => {
        return (
          <CommentDetails
            key={item.userId}
            userId={item.userId}
            createdDate={item.createdDate}
            comment={item.comment}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Comments;
