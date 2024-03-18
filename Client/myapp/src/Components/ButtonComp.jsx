import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ButtonComp({buttonIcon, buttonColor, buttonData, buttonFunction, sizeIcon}) {

  const navigate = useNavigate()

  console.log(buttonData)

  async function functionInButton() {
    const {msg} = await buttonFunction(buttonData)
    alert(`This student ${msg} success`)     
    navigate('/')     
    location.reload()
  }


  return (
      <Button sx={{ width: '100%', color: buttonColor, backgroundColor: 'white', '&:hover': { backgroundColor: buttonColor, color: 'white' } }} onClick={functionInButton}>
        <FontAwesomeIcon icon={buttonIcon} style={{height: sizeIcon}} />
      </Button> 
  )
}


