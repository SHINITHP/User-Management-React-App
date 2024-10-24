import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";
import Navbar from "../Navbar/Navbar";
import UserList from "../UserList/UserList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (searchQuery = "") => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/users?search=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  const handleUserUpdate = (newUser) => {
    if (newUser) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    fetchUsers(searchTerm);
  };

  const handleAddUser = (newUser) => {
    if (newUser) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    fetchUsers(searchTerm);
  };

  return (
    <div>
      <Navbar onSearch={setSearchTerm} addUser={handleAddUser} />
      <UserList
        users={users}
        onDelete={handleDelete}
        onUserUpdate={handleUserUpdate}
      />
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
