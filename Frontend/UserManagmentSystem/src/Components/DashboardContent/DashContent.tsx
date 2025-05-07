import { useEffect, useState } from "react";
import axios from "axios";
import "./DashContent.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EditUser from "../EditUser/EditUser";

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const DashContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); 
  const[isEdit,setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:3003/admin/getUser");
        console.log("res",response.data)
        setUsers(response.data); // assuming response.data is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
    
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="userTable">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                  <button 
                  className="iconBtn edit" 
                  onClick={()=> setIsEdit(!isEdit)}                 >
                    <FaEdit color="black" />
                  </button>
                  <button className="iconBtn delete">
                    <FaTrash color="black" />
                    </button>
                </td>

 
                </tr>
              ))
            ) : (
              <tr>
                <td  className="noData">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {isEdit && <EditUser/> }
    </div>
  );
};

export default DashContent;
