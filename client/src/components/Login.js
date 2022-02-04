import React, { Fragment } from 'react';

const Login = ( { setAuth }) => {
  return (
    <>
      <h1>Login</h1>
      <button onClick={() => setAuth(true)}>test</button>

    </>
  )
}

export default Login;
