import React from "react";
import { Fragment, useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonComp from "./ButtonComp";
import { deleteGrade, updateGrade } from '../Utils/studentsUtils'
import { faTrashCan, faFilePen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextField } from "@mui/material";


export default function RowTable({ grades, studentID, ableEditRow }) {

  const [isEditing, setIsEditing] = useState(null);
  const [newGrade, setNewGrade] = useState({})

  const handleEditClick = useCallback((grade) => {
    setIsEditing(grade._id);
    setNewGrade(grade)
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(null);
    setNewGrade({})
  }, []);


  return (
    <Fragment>
      <TableRow style={{display: 'block', width: '70%', margin: 'auto'}}>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Profession</TableCell>
              <TableCell sx={{textAlign: 'center'}}>Score</TableCell>
              {ableEditRow && (
                <Fragment>
                  <TableCell sx={{textAlign: 'center'}}>Delete</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>Edit</TableCell>
                </Fragment>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {grades?.map((grade) => (
              <TableRow key={grade._id}>
                {isEditing === grade._id && ableEditRow ? (
                  <Fragment>
                    <TableCell sx={{ width: '35%' }} component="th" scope="row">
                      <TextField  type="text" defaultValue={grade.Profession} onChange={(e) => setNewGrade({ ...newGrade, Profession: e.target.value })} />
                    </TableCell>
                    <TableCell sx={{ width: '35%' }}>
                      <TextField type="number" defaultValue={grade.Score} onChange={(e) => setNewGrade({ ...newGrade, Score: e.target.value })} />
                    </TableCell>

                        <TableCell sx={{ textAlign: 'center', width: '15%' }} colspan="2">
                          <ButtonComp
                            buttonIcon={faTimes}
                            buttonColor="green"
                            buttonFunction={handleCancelEdit}
                            sizeIcon={20}
                          />
                          <ButtonComp
                            buttonIcon={faFilePen}
                            buttonColor="#1976d2"
                            buttonData={{studentId: studentID, gradeId: grade._id, newGrade: newGrade}}
                            buttonFunction={updateGrade}
                            sizeIcon={20}
                          />
                        </TableCell>
                    
                  </Fragment>
                ) : (
                <Fragment>
                  <TableCell sx={{width: '35%'}} component="th" scope="row">
                    {grade.Profession}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '35%'}}>{grade.Score}</TableCell>
                  {ableEditRow && (
                    <Fragment>
                      <TableCell sx={{textAlign: 'center', width: '15%'}}>
                        <ButtonComp buttonIcon={faTrashCan} buttonColor={'#df3207'} buttonData={{studentId: studentID, gradeId: grade._id}} buttonFunction={deleteGrade} sizeIcon={20}/>
                      </TableCell>
                      <TableCell sx={{textAlign: 'center', width: '15%'}}>
                        <Button onClick={() => {handleEditClick(grade)}}>
                          <FontAwesomeIcon icon={faFilePen} style={{height: 20}} />
                        </Button>
                      </TableCell>
                    </Fragment>
                  )}
                </Fragment>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRow>
    </Fragment>
  );
}
