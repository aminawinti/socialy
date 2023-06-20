import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Friends from './Components/Friends/Friends';
import Layout from './Components/Layout/Layout';
import Posts from './Components/Posts/Posts';
import Register from './Components/Register/Register';
import NotFound from './NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
