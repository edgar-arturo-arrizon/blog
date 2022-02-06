import React, { useState } from 'react';

const Register = ( { setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { email, password, name } = inputs;

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const onSubmitForm = async (e) => {
    console.log(inputs);
    e.preventDefault();
    try {
      const body = { email, password, name };

      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        header: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      console.log('test',parseRes)
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm} className=" border-cyan-500 border-2">
        <input
          type='text'
          name='email'
          value={email}
          placeholder='email'
          onChange={e => handleChange(e)}
        />
        <input
          type='text'
          name='password'
          value={password}
          placeholder='password'
          onChange={e => handleChange(e)}
        />
        <input
          type='text'
          name='name'
          value={name}
          placeholder='name'
          onChange={e => handleChange(e)}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default Register;