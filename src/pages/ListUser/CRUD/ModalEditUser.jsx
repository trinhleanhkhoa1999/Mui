import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { AccountCircle } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { editUser } from "../../../Services/apiService";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 10,
};

const ShowAlert = (alert, code) => {
  return enqueueSnackbar(`${alert}`, {
    variant: `${code}`,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};
const InputForm = ({ name, label, type, data, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        marginBottom: "15px",
      }}
    >
      <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        margin="normal"
        required
        fullWidth
        variant="standard"
        label={label}
        name={name}
        type={type}
        id={name}
        value={data}
        onChange={handleChange}
      />
    </Box>
  );
};

export default function ModalEditUser({
  open,
  setOpen,
  dataEdit,
  setDataEdit,
  fetchAllUser,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(dataEdit);
    const res = await editUser(
      dataEdit.id,
      dataEdit.name,
      dataEdit.email,
      dataEdit.password
    );
    console.log(res);
    if (res.status === 200) {
      ShowAlert("Success create account", "success");
    } else {
      ShowAlert("Error create account", "error");
    }
    setDataEdit({
      id: "",
      name: "",
      email: "",
      password: "",
    });
    setOpen(false);
    fetchAllUser();
  };
  return (
    <Modal open={open}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={style}
        className="modal-user"
      >
        <span className="close-modal" onClick={() => setOpen(false)}>
          <ClearIcon />
        </span>
        <h1>Modal Edit User</h1>
        <InputForm
          label="Name User"
          name="name"
          type="text"
          data={dataEdit.name}
          handleChange={handleChange}
        />
        <InputForm
          label="Email dress"
          name="email"
          type="email"
          data={dataEdit.email}
          handleChange={handleChange}
        />
        <InputForm
          label="Password"
          name="password"
          type="password"
          data={dataEdit.password}
          handleChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <AddIcon />
          Update user
        </Button>
      </Box>
    </Modal>
  );
}
