import React, { useState, useEffect } from 'react';
import EditBlog from './EditBlog.js';

const ListBlog = ( { allBlogs, setBlogsChange }) => {
  const [blog, setBlogs] = useState([]);


  useEffect(() => {
    setBlogs(allBlogs)
  }, [allBlogs]);

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
            blogs[0].todo_id !== null &&
            blogs.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditBlog todo={todo} setBlogsChange={setBlogsChange} />
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
