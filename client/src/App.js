import React, { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from 'react-router-dom';

 import Dashboard from './components/Dashboard.js';
 import Login from './components/Login.js';
 import Register from './components/Register.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, [])

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to="/login"  />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
