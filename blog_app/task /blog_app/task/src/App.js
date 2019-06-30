import React from 'react';
import LandingPage from './pages/landingpage.js';
import BlogPage from './pages/blogpage.js';
import CreateBlogPost from './pages/createblogpost.js';
import EditBlogPost from './pages/editblogpost.js';
import DeletePost from './pages/deletepost.js';

import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/" exact render = { () => { return (<LandingPage/>) } } />
      <Route path = "/blog/:id" exact component = {BlogPage}/>
      <Route path = "/add/blog" exact component = {CreateBlogPost}/>
      <Route path = "/update/:id" exact component = {EditBlogPost}/>
      <Route path = "/delete/:id" exact component = {DeletePost}/>



    </div>
    </Router>
  );
}

export default App;
