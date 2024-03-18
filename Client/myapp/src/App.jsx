import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StudentsPage from "./Pages/StudentsPage";
import AddStudentPage from "./Pages/AddStudentPage";
import EditStudentPage from "./Pages/EditStudentPage";
import NavSlideBar from "./Components/NavSlideBar";
import { Col, Container, Row } from "rsuite";

function App() {

  const [expanded, setExpand] = useState(true);

  return (
    <>
      <Container>
        <Row style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Col style={{position: 'fixed'}}>
            <NavSlideBar
              expanded={expanded}
              onExpand={setExpand}
            />
          </Col>
          <Col style={{maxHeight: '100hv', position: 'sticky'}}>
            <Routes>
              <Route path="/" element={<StudentsPage />}></Route>
              <Route path="/add-student" element={<AddStudentPage />}></Route>
              <Route path="/edit-student" element={<EditStudentPage />}></Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
