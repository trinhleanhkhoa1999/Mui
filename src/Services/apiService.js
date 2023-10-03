import axios from "axios";

const postRegister = async (id, name, email, password) => {
  const res = await axios.post(`http://localhost:3000/users`, {
    id,
    name,
    email,
    password,
  });
  return res;
};

const postLogin = async (email, password) => {
  const res = await axios.post(`http://localhost:3000/users`, {
    email,
    password,
  });
  return res;
};

const getAllUser = async () => {
  const res = await axios.get(`http://localhost:3000/users`);
  return res;
};

const postCreateUser = async (id, name, email, password) => {
  const res = await axios.post(`http://localhost:3000/users`, {
    id,
    name,
    email,
    password,
  });
  return res;
};

const deleteUser = async (id) => {
  const res = await axios.delete(`http://localhost:3000/users/${id}`);
  return res;
};
const editUser = async (id, name, email, password) => {
  const res = await axios.put(`http://localhost:3000/users/${id}`, {
    name,
    email,
    password,
  });
  return res;
};
export {
  postRegister,
  postLogin,
  getAllUser,
  postCreateUser,
  deleteUser,
  editUser,
};
