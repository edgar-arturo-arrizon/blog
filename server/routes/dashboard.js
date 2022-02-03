import express from 'express';
import pool from '../db.js';
import authorize from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorize, async (req, res) => {
  try {
    console.log(req.user)
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [ req.user ]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default dashboardRouter;