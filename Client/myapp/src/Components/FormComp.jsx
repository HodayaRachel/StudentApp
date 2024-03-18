import React, { useState, useEffect } from "react";
import RowTable from "./RowTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import ButtonComp from "./ButtonComp";
import { TextField, Button, Typography, Container, Grid, Paper, FormControl } from "@mui/material";
import { Col } from "rsuite";

export default function FormComp({ student, buttonIcon, buttonColor, funcToButton }) {

  const [newStudent, setNewStudent] = useState({});
  const [grades, setGrades] = useState([]);
  const [oneGrade, setOneGrade] = useState({});
  const [openGrades, setOpenGrades] = useState(false);


  useEffect(() => {
    if (student != null || Object.keys(student).length > 0) {
        setGrades(student.Grades);
        setNewStudent({Name: student.Name, Faculty: student.Faculty});
    } 
  }, [student]);


  useEffect(() => {
    setNewStudent({ ...newStudent, Grades: grades });
  }, [grades]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(newStudent);
  console.log(grades);

  const AddGrade = async () => {
    if (
      oneGrade.Profession &&
      oneGrade.Score &&
      oneGrade.Score > 0 &&
      oneGrade.Score <= 100
    ) {
      console.log(oneGrade);
      if (Array.isArray(grades)) {
        setGrades((grades) => [...grades, oneGrade]);
      } else {
        setGrades([oneGrade]);
      }
    }
    setOneGrade({});
  };

  return (
    <Container>
      <Col>
        <Container component={Paper} maxWidth="sm">
          <FormControl onSubmit={handleSubmit}>
            <br/>
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  label="Name"
                  InputLabelProps={{
                      shrink: true,
                  }}        
                  placeholder="Your name"
                  value={newStudent?.Name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, Name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  required
                  label="Faculty"
                  InputLabelProps={{
                      shrink: true,
                  }}        
                  placeholder="Your faculty"
                  value={newStudent?.Faculty}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, Faculty: e.target.value })
                  }
                />
              </Grid>

              <Container>
                <br/>
                <br/>
                <Typography variant="h6" align="center" gutterBottom>
                  <Button onClick={() => setOpenGrades(!openGrades)}>
                    Grades
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenGrades(!openGrades)}
                      >
                        {openGrades ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                  </Button>
                </Typography>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: openGrades ? "block" : "none" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="text"
                        required
                        label="Profession"
                        placeholder="Profession"
                        onChange={(e) =>
                          setOneGrade({ ...oneGrade, Profession: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        required
                        label="Score"
                        placeholder="Score"
                        onChange={(e) =>
                          setOneGrade({ ...oneGrade, Score: +e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        type="reset"
                        variant="contained"
                        onClick={AddGrade}
                      >
                        Add Grades
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </Grid>
          </FormControl>
          <div style={{marginLeft: '30%', marginRight: '30%'}}>
            <br/>
            <br/>
            <ButtonComp 
              fullWidth
              buttonIcon={buttonIcon} 
              buttonColor={buttonColor}
              buttonData={{id: student._id, student: newStudent }}
              buttonFunction={funcToButton}
              sizeIcon={30}
            />
            <br/>
            <br/>
          </div>
        </Container>
      </Col>
      <Col>
        <RowTable grades={grades} studentID={student._id} ableEditRow={false}/>
      </Col>
    </Container>
    
  );
}
