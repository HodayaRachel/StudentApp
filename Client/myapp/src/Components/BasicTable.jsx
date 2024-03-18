import React, { useState, Fragment } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ButtonComp from "./ButtonComp";
import { deleteStudent } from "../Utils/studentsUtils";
import RowTable from "./RowTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { faTrashCan, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BasicTable({ allStudents }) {

  const [expandedRows, setExpandedRows] = useState(() => {
    const initialState = {}
    allStudents.forEach((student) => {
      initialState[student._id] = false;
    });
    return initialState;
  });
  const navigate = useNavigate();

  const handleEditStudent = async (id) => {
    sessionStorage.setItem("studentId", id);
    navigate("/edit-student");
  };

  const handleExpandClick = (studentId) => {
    setExpandedRows((prevExpandedRows) => {
      const newState = { ...prevExpandedRows };
        Object.keys(newState).forEach((key) => {
        if (key !== studentId) {
          newState[key] = false;
        }
      });
      newState[studentId] = !prevExpandedRows[studentId];
      return newState;
    });
  };
  
  

  return (
    <TableContainer
      sx={{ maxHeight: 600, minWidth: { xs: "100px", md: "60vw" } }}
      component={Paper}
    >
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Faculty</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allStudents.map((student) => (
            <Fragment key={student._id}>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleExpandClick(student._id)}
                  >
                    {expandedRows[student._id] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center" }}
                  component="th"
                  scope="row"
                >
                  {student.Name}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center" }}
                  component="th"
                  scope="row"
                >
                  {student.Faculty}
                </TableCell>
                <TableCell component="th" scope="row">
                  <ButtonComp
                    buttonIcon={faTrashCan}
                    buttonColor={"#df3207"}
                    buttonData={student._id}
                    buttonFunction={deleteStudent}
                    sizeIcon={30}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    sx={{
                      width: "100%",
                      mt: 2,
                      mb: 2,
                      color: "#1976d2",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "white",
                      },
                    }}
                    onClick={() => handleEditStudent(student._id)}
                  >
                    <FontAwesomeIcon
                      icon={faFilePen}
                      style={{ height: 30 }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse
                    in={expandedRows[student._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ margin: 1 }}>
                      <Typography
                        sx={{ textAlign: "center" }}
                        style={{ fontSize: "20px" }}
                        variant="h6"
                        gutterBottom
                        component="div"
                      >
                        Grades
                      </Typography>
                      <RowTable
                        sx={{ textAlign: "center" }}
                        key={student._id}
                        studentID={student._id}
                        grades={student.Grades}
                        ableEditRow={true}
                      />
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
