import React, { useState, useEffect } from 'react'
import SignUp from './components/auth/signup/SignUp';
import './App.css';
import NavBar from './components/nav/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebase';
import Dashboard from './components/dashboard/Dashboard';
import LogIn from './components/auth/signin/LogIn';
import InitialLoader from './components/loader/InitialLoader';

function App() {
  const [waitToLoad, setWaitToLoad] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        // console.log(authUser);
        setUser(authUser);
        setWaitToLoad(true)

      } else {
        // user is logged out...
        setUser(null)
        setWaitToLoad(true)
      }
    })

    return () => {
      // perform some cleanup activity
      unsubscribe()
    }
  }, [user]);

  return (
    <Router>
      {
        waitToLoad ? (
          <div className="app">
          <header>
            <NavBar user={user} />
          </header>
          <main>
            <Switch>
              <Route exact path='/' render=
              { (props) => <Dashboard {...props} user={user} />} />
              <Route path='/signup' render=
              { (props) => <SignUp {...props} user={user} />} />
              <Route path='/login' render=
              { (props) => <LogIn {...props} user={user} />} />
            </Switch>
          </main>
        </div>
        ) : (<InitialLoader />)
      }
    </Router>
  )
}

export default App
