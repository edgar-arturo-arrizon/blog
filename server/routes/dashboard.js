import express from 'express';
import pool from '../db.js';
import authorization from '../middleware/authorization.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', authorization, async (req, res) => {
  try {
    console.log('dashboardRouter: GET request', req.user)
    const user = await pool.query(
      "SELECT u.user_name, b.blog_id, b.blog_title FROM users AS u LEFT JOIN blogs AS b ON u.user_id = b.user_id WHERE u.user_id = $1",
      [req.user]
    );
    const blogs = await pool.query(
      "select * from blogs where user_id = $1", [req.user]
    );

    res.json([user.rows[0], blogs.rows]);
  } catch (err) {
    console.error(err.message, 'ERROR: Error @  `/` GET route');
    res.status(500).send("Server error");
  }
});

dashboardRouter.post('/blogs', authorization, async (req, res) => {
  // console.log('dashboardRouter: POST /blogs route', req.body)
  try {
    const { title, id } = req.body;
    const newBlog = await pool.query(
      "INSERT INTO blogs (user_id, blog_title) VALUES ($1, $2) RETURNING *",
      [id, title]
    );

    res.json(newBlog.rows[0]);
  } catch (err) {
    console.error(err.message, 'ERROR: Error @ `/blogs` POST route');
  }
});

dashboardRouter.put("/blogs/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateBlog = await pool.query(
      "UPDATE blogs SET description = $1 WHERE blog_id = $2 AND user_id = $3 RETURNING *",
      [title, id, req.user.id]
    );

    if (updateBlog.rows.length === 0) {
      return res.json("This blog is not yours");
    }

    res.json("Blog was updated");
  } catch (err) {
    console.error(err.message, 'ERROR: Error @  PUT `/blogs/:id` route');
  }
});

//delete a todo

dashboardRouter.delete("/blogs/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await pool.query(
      "DELETE FROM blogs WHERE blog_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );

    console.log(id, req.user, deleteBlog.rows)

    if (deleteBlog.rows.length === 0) {
      return res.json("This Blog is not yours");
    }

    res.json("Blog was deleted");
  } catch (err) {
    console.error(err.message, 'ERROR: Error @  DELETE `/blogs/:id` route');
  }
});

export default dashboardRouter;