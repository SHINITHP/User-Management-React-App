import axios from "axios";

const AdminApi = axios.create({
  baseURL: "http://localhost:5000/admin",
  withCredentials: true,
});

export default AdminApi;
