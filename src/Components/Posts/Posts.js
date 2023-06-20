import React, { useCallback, useEffect, useState } from 'react';
import LoadingBox from '../LoadingBox';
import PostDetails from './PostDetails';
import errorImg from '../../assets/error.png';

const FirebaseUri = process.env.REACT_APP_FIREBASE_URI;
const FIREBASE_POSTS = `${FirebaseUri}/posts.json`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(FIREBASE_POSTS);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedPosts = [];

      for (const key in data) {
        const createdDate = new Date(data[key].createdDate);
        const month = createdDate.toLocaleString('en-US', { month: 'long' });
        const day = createdDate.toLocaleString('en-US', { day: '2-digit' });
        const year = createdDate.getFullYear();
        const newFormatDate = day.concat(', ', month, ' ', year);

        loadedPosts.push({
          id: data[key].id,
          title: data[key].title,
          content: data[key].content,
          createdDate: newFormatDate,
          comments: data[key].comments,
          imageUrl: data[key].imageUrl,
        });
      }

      setPosts(loadedPosts);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTasksHandler();
  }, [fetchTasksHandler]);

  async function addCommentHandler(postId, addedComment) {
    const currPostsList = [...posts];

    const post = {
      ...posts[postId],
    };

    let addedDate = new Date().toJSON();
    let currPostComments;

    if (!post.comments) currPostComments = [];
    else currPostComments = [...post.comments];

    currPostComments.push({
      comment: addedComment,
      createdDate: addedDate,
      id: currPostComments.length + 1,
      userId: Math.floor(Math.random() * 10000),
    });

    const currPost = { ...post, comments: currPostComments };

    currPostsList[postId] = currPost;
    setPosts(currPostsList);

    await fetch(FIREBASE_POSTS, {
      method: 'PUT',
      body: JSON.stringify(currPostsList),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let content;

  if (posts.length > 0) {
    content = (
      <React.Fragment>
        {posts.map((post) => {
          return (
            <PostDetails
              key={post.id}
              comments={post.comments}
              title={post.title}
              createdDate={post.createdDate}
              content={post.content}
              imageUrl={post.imageUrl}
              onAddComment={addCommentHandler.bind(null, post.id - 1)}
            />
          );
        })}
      </React.Fragment>
    );
  }

  if (posts?.length === 0) {
    content = <p>Found no posts.</p>;
  }

  if (error) {
    content = (
      <div className="error">
        <img src={errorImg} width="50" height="auto" alt="error icon" />
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    content = (
      <LoadingBox value="1">
        <p style={{ color: '#5d00d4', fontSize: '.8rem' }}>Loading...</p>
      </LoadingBox>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default Posts;
