import React, { useState } from 'react';
import Card from '../../UI/Card/Card';
import Comments from '../Comments/Comments';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import AddComment from '../Comments/AddComment';

const MIN_POST_LENGTH = 220;

const PostDetails = (props) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [isFirstComment, setIsFirstComment] = useState(false);

  let commentsContent;

  const addCommentHandler = (comment) => {
    props.onAddComment(comment);
  };

  const toggleReadMore = () => {
    setIsReadMore(false);
  };

  const toggleIsFirstComment = () => {
    setIsFirstComment(true);
  };

  if (props.comments && props.comments.length > 0) {
    commentsContent = (
      <React.Fragment>
        <h3 className="comments">Comments</h3>
        <Comments comments={props.comments} />
        <AddComment onAddComment={addCommentHandler} />
      </React.Fragment>
    );
  } else
    commentsContent = (
      <React.Fragment>
        {!isFirstComment && (
          <span onClick={toggleIsFirstComment} className="first-comment">
            <MarkChatReadOutlinedIcon className="first-comment-icon" />
            Be the first to write a comment...
          </span>
        )}
        {isFirstComment && (
          <React.Fragment>
            <h3 className="comments">Comments</h3>
            <AddComment onAddComment={addCommentHandler} />
          </React.Fragment>
        )}
      </React.Fragment>
    );

  let postContent = props.content;

  return (
    <React.Fragment>
      <Card className="post">
        <div className="post-content">
          <h2>{props.title}</h2>
          <small className="date">{props.createdDate}</small>
          <p
            onClick={toggleReadMore}
            className={`${isReadMore ? 'clickable' : 'unclickable'}`}
          >
            {isReadMore ? postContent.slice(0, MIN_POST_LENGTH) : postContent}
            {postContent.length > MIN_POST_LENGTH && (
              <span className="read-more">
                {isReadMore ? '...see more' : ''}
              </span>
            )}
          </p>
          {props.imageUrl && (
            <img src={props.imageUrl} alt="img" className="post-image" />
          )}
        </div>
        {commentsContent}
      </Card>
    </React.Fragment>
  );
};

export default PostDetails;
