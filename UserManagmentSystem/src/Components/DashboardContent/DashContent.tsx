import { useState } from "react";
import "./DashContent.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const DashContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, username: "john_doe", email: "john@example.com", isAdmin: true },
    { id: 2, username: "jane_smith", email: "jane@example.com", isAdmin: false },
    { id: 3, username: "mike", email: "mike@abc.com", isAdmin: true },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashBoard">
      <div className="dashHeader">
        <h2>User Management</h2>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="createBtn">
          <FaPlus /> Create User
        </button>
      </div>

      <table className="userTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button className="iconBtn edit">
                    <FaEdit />
                  </button>
                  <button className="iconBtn delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="noData">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashContent;
