import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header"; // agar Header src ke andar hai
import "./Showuser.css";

function Showuser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="users-container">
  <h2 className="users-title">Users List</h2>

  <table className="users-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
      </tr>
    </thead>

    <tbody>
      {users.map((user, index) => (
        <tr key={user._id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="password-cell">{user.password}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </>
  );
}

export default Showuser;