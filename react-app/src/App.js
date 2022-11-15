import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProjectList from './components/ProjectList/index'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import CreateProject from './components/CreateProjectForm'
import * as sessionActions from "./store/session"
import NavBar from './components/Navbar/NavBar';
import DemoUser from './components/DemoUser';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Project from './components/Project';
import Profile from './components/Profile'
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/project/create' exact={true}>
          <CreateProject />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
          <DemoUser />
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
          <ProjectList />
        </Route>
        {/* <Route path='/gallery/:projectId'>
          <Project />
        </Route> */}
        <Route path='/:username'>
          <Profile />
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
