import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { enqueueSnackbar } from "notistack";
import { postCreateUser } from "../../../Services/apiService";

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

export default function ModalCreateUser({
  open,
  setOpen,
  dataCreateUser,
  setDataCreateUser,
  fetchAllUser,
}) {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataCreateUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidateEmail = validateEmail(dataCreateUser.email);
    if (!isValidateEmail) {
      ShowAlert("Invalidation failed email", "error");

      return;
    }
    if (!dataCreateUser.password) {
      ShowAlert("Invalidation failed password", "error");
      return;
    }
    if (!dataCreateUser.name) {
      ShowAlert("Invalidation failed name", "error");
      return;
    }
    const res = await postCreateUser(
      dataCreateUser.id,
      dataCreateUser.name,
      dataCreateUser.email,
      dataCreateUser.password
    );
    if (res.status === 201) {
      ShowAlert("Success create account", "success");
    } else {
      ShowAlert("Error create account", "error");
    }
    setDataCreateUser({
      id: "",
      name: "",
      email: "",
      password: "",
    });
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
        <h1>Modal Create User</h1>
        <InputForm
          label="Name User"
          name="name"
          type="text"
          data={dataCreateUser.name}
          handleChange={handleChange}
        />
        <InputForm
          label="Email dress"
          name="email"
          type="email"
          data={dataCreateUser.email}
          handleChange={handleChange}
        />
        <InputForm
          label="Password"
          name="password"
          type="password"
          data={dataCreateUser.password}
          handleChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <AddIcon />
          CREATE
        </Button>
      </Box>
    </Modal>
  );
}
