import React, { useState, useEffect } from 'react';
import EditBlog from './EditBlog.js';

const ListBlog = ( { allBlogs, setBlogsChange }) => {
  const [blogs, setBlogs] = useState([]);

  async function deleteBlog(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/blogs/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setBlogs(blogs.filter(blog => blog.blog_id !== id));
    } catch (err) {
      console.error(err.message, 'ERROR: ListBlog component - deleteBlog function');
    }
  }

  // useEffect(() => {
  //   setBlogs(allBlogs)
  // }, [allBlogs]);

  return (
    <>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {blogs.length !== 0 &&
            blogs[0].blog_id !== null &&
            blogs.map(blog => (
              <tr key={blog.blog_id}>
                <td>{blog.description}</td>
                <td>
                  <EditBlog blog={blog} setBlogsChange={setBlogsChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBlog(blog.blog_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default ListBlog;
