import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//registering

router.post('/register', async (req, res) => {
  try {
  //step 1 destructure req.body eamil/password/name
    const { name, email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    //step 2 if user exist throw error
    if (user.rows.length !== 0) {
      return res.status(401).send('User already exists');
    }

    //step 3 else bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = bcrypt.hash(password, salt);

  //step 4 enter user in db

    const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) Values ($1, $2, $3) RETURNING *", [ name, email, bcryptPassword ]);

    res.json(newUser)

  //step 5 generating our jwt token

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error ")
  }
})

export default router;