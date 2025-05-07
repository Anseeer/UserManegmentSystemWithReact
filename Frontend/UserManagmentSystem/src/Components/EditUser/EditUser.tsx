import { useEffect, useState } from "react";
import "./EditUser.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/Slices/userSlice";

interface EditUserProps {
  id: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUsers: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ id, isEdit, setIsEdit ,refetchUsers }) => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get("http://localhost:3003/admin/getUser", {
          params: {
            userId: id,
          },
        });
        setUserData({ name: user.data.name, email: user.data.email });
      } catch (error) {
        toast.error("Can't fetch the user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleSave = async () => {
    try {
      const data = userData;
      const res = await axios.post("http://localhost:3003/updateUser", data);
      dispatch(updateUser(res.data.user));
      refetchUsers();
      toast.success("Edit successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit user");
    }
  };

  return (
    <div className="editContainer">
      <div className="editCard">
        <h3>Edit User</h3>
        <label>Username:</label>
        <input
          value={userData.name}
          type="text"
          onChange={(e) => setUserData({ name: e.target.value, email: userData.email })}
        />
        <div className="editActions">
          <button className="saveBtn" onClick={() => { handleSave(); setIsEdit(!isEdit); }}>Save</button>
          <button className="cancelBtn" onClick={() => setIsEdit(!isEdit)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
