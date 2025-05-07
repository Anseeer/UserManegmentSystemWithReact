import "./CreateUser.css";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface propType {
  setCreate: React.Dispatch<SetStateAction<boolean>>;
  isCreate: boolean;
  fetchUser: () => void;
}

const CreateUser = ({ isCreate, setCreate, fetchUser }: propType) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(form);
      await axios.post('http://localhost:3003/signup', form);
      setCreate(!isCreate);
      fetchUser();
      toast.success("Created Successfully");
    } catch (error: any) {
      toast.error(error.response.data.msg || "Signup failed");
      setCreate(!isCreate);
    }
  };

  return (
    <div className="CreateUserWrapper">
      <div className="CreateUserCard">
        <h2>CREATE USER</h2>
        <form onSubmit={HandleSubmit} className="CreateUserForm">
          <input
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            placeholder="Enter your name"
          />
          <input
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="Email (example@gmail.com)"
          />
          <input
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            placeholder="Enter password"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
