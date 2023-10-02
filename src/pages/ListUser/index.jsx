import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../Services/apiService";
import { Box, Container, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TableUSer from "./CRUD/TableUSer";
import ModalCreateUser from "./CRUD/ModalCreateUser";
import "./styles.scss";
import { enqueueSnackbar } from "notistack";
import ModalEditUser from "./CRUD/ModalEditUser";

export default function ListUser() {
  const [listUser, setListUser] = useState([]);
  const [dataCreateUser, setDataCreateUser] = useState({
    id: Math.floor(Math.random() * 10001),
    name: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const fetchAllUser = async () => {
    const data = await getAllUser();
    setListUser(data.data);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEditUser = (editUser) => {
    console.log("handleEditUser: ", editUser);
    setOpenModalEdit(true);
    setDataEdit(editUser);
  };

  const handleDeleteUser = async (userDel) => {
    const res = await deleteUser(userDel.id);
    console.log("handleDeleteUser: ", res);
    if (res.status === 200) {
      enqueueSnackbar("Delete user success", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      fetchAllUser();
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <Container>
      <h1>List User</h1>
      <Box sx={{ flexGrow: 1, marginBottom: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Name" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Email" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained">
              <SearchIcon />
              SEARCH
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="success" onClick={handleOpen}>
              <AddIcon />
              CREATE
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableUSer
        listUser={listUser}
        handleDeleteUser={handleDeleteUser}
        handleEditUser={handleEditUser}
      />
      <ModalCreateUser
        open={open}
        setOpen={setOpen}
        dataCreateUser={dataCreateUser}
        setDataCreateUser={setDataCreateUser}
        fetchAllUser={fetchAllUser}
      />
      <ModalEditUser
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        fetchAllUser={fetchAllUser}
      />
    </Container>
  );
}
