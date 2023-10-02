import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TableUSer({
  listUser,
  handleDeleteUser,
  handleEditUser,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUser.map((item, idx) => {
            return (
              <TableRow hover key={idx}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">
                  <span>
                    <EditIcon
                      color="primary"
                      sx={{ marginRight: "20px" }}
                      onClick={() => handleEditUser(item)}
                    />
                  </span>
                  <span>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleDeleteUser(item)}
                    />
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
          {listUser.length < 0 && <span>Không có data!</span>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
