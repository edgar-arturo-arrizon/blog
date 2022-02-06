import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const Dashboard = ( { setAuth }) => {
  const [name , setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setName(parseRes.user_name)
    } catch (err) {
      console.log('Dashboard request error');
      console.error(err.message);
    }
  }

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  )
}

export default Dashboard;
