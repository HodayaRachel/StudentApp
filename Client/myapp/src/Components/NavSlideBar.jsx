import React from "react";
import { Sidenav, Nav } from "rsuite";
import {PiUsers} from "react-icons/pi";
import {AiOutlineUserAdd} from "react-icons/ai";
import {LiaUserEditSolid} from "react-icons/lia";
import "../styles.css";

export default function NavSlideBar({ expanded, onExpand }) {

  const pages = [
    { name: "Students", url: "/", icon: PiUsers},
    { name: "Add Student", url: "/add-student", icon: AiOutlineUserAdd},
    { name: "Edit Student", url: "/edit-student", icon: LiaUserEditSolid},
  ]

  return (
    <div style={{ width: expanded ? "240px" : '80px', marginRight: '10',}}>
      <Sidenav style={{ height: "100vh" }} expanded={expanded}>
        <Sidenav.Body>
          <Nav>
            <br/>
            {pages.map((page, index) => (
              <Nav.Item className="navItem" key={index} style={{display: 'flex', alignItems: 'center', fontSize: '17px', paddingLeft: '30px'}} href={page.url} icon={<page.icon style={{marginRight: '15px', width: '30px', height: '30px', float: 'inline-end'}}/>}>
                {page.name}
              </Nav.Item>
            ))}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={onExpand}/>
      </Sidenav>
    </div>
  );
}




