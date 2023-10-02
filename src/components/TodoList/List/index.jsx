import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";

// eslint-disable-next-line react/prop-types
export default function List({ data, handleDelete }) {
  console.log("check data: ", data);

  return (
    <div className="list-container">
      {data.length > 0 &&
        data.map((item, idx) => {
          return (
            <form key={idx}>
              <input value={item.title} />
              <textarea value={item.desc} />
              <Zoom in={true}>
                <Fab>
                  <DeleteIcon onClick={() => handleDelete(item)} />
                </Fab>
              </Zoom>
            </form>
          );
        })}
    </div>
  );
}
