import express from 'express';
import pool from '../db.js';

const router = express.Router();

//registering

router.post('/register', async (req, res) => {
  try {
    console.log('testing', req.body)
  //step 1 destructure req.body eamil/password/name
    const { name, email, password } = req.body;
  //step 2 check if user exists, if they do throw error
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    res.json(user);
  //step 3 else  bcrypt user password

  //step 4 enter user in db

  //step 5 generating our jwt token

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error ")
  }
})

export default router;