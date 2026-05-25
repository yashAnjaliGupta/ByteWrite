import { useState } from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { MyBlogs } from './pages/Myblogs'
import {UserPage } from "./pages/UserPage"
import { PrivateRoutes,PublicRoutes } from './components/Gaurds'




function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/blogs" />} />
      <Route path="/signup" element={
      <PublicRoutes>
        <Signup/>
      </PublicRoutes>
      }/>
      <Route path="/signin" element={
        <PublicRoutes>
          <Signin/>
        </PublicRoutes>
      }/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/Myblogs" element={
        <PrivateRoutes>
        <MyBlogs/>
        </PrivateRoutes>
        }/>
      <Route path="/publish" element={
      <PrivateRoutes>
          <Publish/>
      </PrivateRoutes>
      }/>
      <Route path="/publish/:id" element={
      <PrivateRoutes>
          <Publish/>
      </PrivateRoutes>
      }/>
      <Route path="/me" element={
      <PrivateRoutes>
          <UserPage/>
      </PrivateRoutes>
      }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
