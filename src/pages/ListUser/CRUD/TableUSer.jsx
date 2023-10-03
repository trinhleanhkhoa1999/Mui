import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

export default function TableUSer({
  listUser,
  handleDeleteUser,
  handleEditUser,
}) {
  const collumns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "action", name: "Actions" },
  ];
  const handleChangePage = (event, newpage) => {
    setPage(newpage);
  };
  const handleRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  useEffect(() => {}, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {collumns.map((item) => {
                return (
                  <TableCell align="center" key={item.id}>
                    {item.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser.length === 0 ? (
              <TableRow>
                <TableCell component="th" scope="row">
                  Không có data!
                </TableCell>
              </TableRow>
            ) : (
              <>
                {listUser
                  .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                  .map((item, idx) => {
                    return (
                      <TableRow hover key={idx}>
                        <TableCell align="center" component="th" scope="row">
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
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        count={listUser.length}
        rowsPerPage={rowPerPage}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPage}
      ></TablePagination>
    </>
  );
}
