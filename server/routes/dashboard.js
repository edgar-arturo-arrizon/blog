import express from 'express';
import pool from '../db.js';
import authorization from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorization, async (req, res) => {
  try {
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

// dashboardRouter.post('/blogs', authorization, async (req, res) => {
//   try {
//     const
//     console.log('get blog', req.body)

//   } catch (err) {
//     console.error(err.message)
//   }
// })

export default dashboardRouter;