import { useEffect, useState } from "react";
import axios from "axios";
import "./DashContent.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EditUser from "../EditUser/EditUser";
import { toast } from "react-toastify";
import CreateUser from "../Creat-user/CreateUser";

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
  const[isCreate,setCreate] = useState<boolean>(false);
  const [editUserId, setEditUserId] = useState<string | undefined>(undefined);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3003/admin/getUser",{withCredentials:true});
      console.log("res",response.data)
      setUsers(response.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HandleDelete = async (id: string | undefined) => {
    if (!id) return;
  
    try {
      await axios.get("http://localhost:3003/admin/deleteUser", {
        params: { userId: id },
        withCredentials:true,
      });
      toast.success("Deleted Successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    }
  };
  

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
        <button className="createBtn"
        onClick={()=> setCreate(!isCreate) }
        >
          <FaPlus /> Create User
        </button>
      </div>
      {isCreate && <CreateUser setCreate={setCreate} fetchUser={fetchUsers} isCreate={isCreate} />}
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
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                  <button 
                  className="iconBtn edit" 
                  onClick={()=> {setIsEdit(!isEdit);setEditUserId(user._id)}}
                  >
                    <FaEdit color="black" />
                  </button>
                  <button className="iconBtn delete" onClick={() => HandleDelete(user._id)}>
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
      {isEdit && editUserId && <EditUser id={editUserId} setIsEdit={setIsEdit} isEdit={isEdit} refetchUsers={fetchUsers} /> }
    </div>
  );
};

export default DashContent;

