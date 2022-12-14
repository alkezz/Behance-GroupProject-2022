import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProjectList from './components/ProjectList/index'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import CreateProject from './components/CreateProjectForm'
import CreateImages from './components/CreateProjectImage';
import * as sessionActions from "./store/session"
import NavBar from './components/Navbar/NavBar';
import DemoUser from './components/DemoUser';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Project from './components/Project';
import Profile from './components/Profile'
import EditProject from './components/EditProjectForm';
import './index.css'
import * as followsActions from './store/follows';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [prevPath, setPrevPath] = useState('')
  const dispatch = useDispatch();
  const currLocation = useSelector((state) => state.location.prev)
  const location = useLocation()
  const history = useHistory()
  const session = useSelector((store) => store.session)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
        .then((res) => {
          if (res) {
            dispatch(followsActions.userFollows(res.id))
          }
        });
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <NavBar />
      <Switch location={currLocation}>
        <Route path='/project/create' exact={true}>
          <CreateProject />
        </Route>
        <Route path='/project/:projectId/edit'>
          <EditProject />
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
        <Route path='/project/create' exact={true}>
          <CreateProject />
        </Route>
        <Route path='/' exact={true}>
          <ProjectList />
        </Route>
        {/* <Route path='/gallery/:projectId'>
          <Project />
        </Route> */}
        <Route exact={true} path="/4error0page4">
          <div style={{ fontSize: 200, marginTop: "150px",textAlign:"center" }}>* 404: Page not found *</div>
        </Route>
        <Route path='/:username'>
          <Profile />
        </Route>
        <Route path="*">
          <div style={{ fontSize: 200, marginTop: "150px",textAlign:"center" }}>* 404: Page not found *</div>
        </Route>
      </Switch>
      {<Route path="/gallery/:projectId"><Project /></Route>}
    </BrowserRouter>
  );
}

export default App;
