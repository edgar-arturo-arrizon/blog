import React, { Fragment } from 'react';


const Register = () => {
  return (
    <Fragment>
      <h1>Register</h1>
      <form className=" border-cyan-500 border-2">
        <input
          type='text'
          name='name'
          value={'name'}
          placeholder='name'
          onChange={(e) => console.log(e)}
        />
        <input
          type='text'
          name='email'
          value={'email'}
          placeholder='email'
          onChange={(e) => console.log(e)}
        />
        <input
          type='text'
          name='password'
          value={'password'}
          placeholder='password'
          onChange={(e) => console.log(e)}
        />
      </form>
    </ Fragment>
  )
}

export default Register;