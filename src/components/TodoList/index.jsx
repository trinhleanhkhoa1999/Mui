import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import List from "./List";
import { useSnackbar } from "notistack";

export default function TodoList() {
  const [isShowHideInput, setIsShowHideInput] = useState(false);
  const [dataForm, setDataForm] = useState({
    id: Math.floor(Math.random() * 10001),
    title: "",
    desc: "",
  });
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    setData([...data, dataForm]);
    setDataForm({
      id: "",
      title: "",
      desc: "",
    });
    enqueueSnackbar("Success add note", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  console.log("data: ", dataForm);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleShowHideInput = () => {
    setIsShowHideInput(!isShowHideInput);
  };
  const handleDelete = (del) => {
    setData(data.filter((i) => i !== del));
    enqueueSnackbar(`Delete add note with ${del.title}`, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <form>
        <input
          required
          name="title"
          value={dataForm.title}
          onChange={handleChange}
          placeholder="Add title..."
          onClick={handleShowHideInput}
        ></input>
        {isShowHideInput ? (
          <textarea
            name="desc"
            value={dataForm.desc}
            onChange={handleChange}
            className="textarea"
            placeholder="Take a note..."
          />
        ) : (
          <textarea style={{ display: "none" }} />
        )}
        <Zoom in={true}>
          <Fab>
            <AddIcon onClick={handleSubmit} />
          </Fab>
        </Zoom>
      </form>

      <List data={data} handleDelete={handleDelete} />
    </div>
  );
}
