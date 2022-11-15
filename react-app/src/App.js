import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import CreateProject from './components/CreateProjectForm'
import * as sessionActions from "./store/session"
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';
import Project from './components/Project';
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/project/create' exact={true}>
          <CreateProject />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>Home Page Coming Soon!</h1>
        </Route>
        {/* <Route path='/gallery/:projectId'>
          <ProjectGallery />
        </Route> */}
        <Route path='/:username'>
          <ProfilePage />
        </Route>
        <Route path="*">
          <div style={{ fontSize: 404 }}>* 404: Page not found *</div>
        </Route>
      </Switch>
      {<Route path="/gallery/:projectId"><Project /></Route>}
    </BrowserRouter>
  );
}

export default App;
