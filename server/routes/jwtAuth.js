import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator.js';

const router = express.Router();

//registering
router.post('/register', async (req, res) => {
  try {
    //step 1 destructure req.body eamil/password/name
    const { name, email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) Values ($1, $2, $3) RETURNING *", [ name, email, bcryptPassword ]);

    const token = jwtGenerator(newUser.rows[0].user_id)
    res.json({ token });

  //step 5 generating our jwt token

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error ")
  }
})

export default router;