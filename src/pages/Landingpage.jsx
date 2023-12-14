import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Landingpage() {


  // function defenition
  // to redirect to one page to another page we can use::(hook)::  useNavigate()
 const navigate = useNavigate()
  const handleNavigate = () => {
   
    navigate('/home')

  }
  return (
    <Row >
      <Col></Col>
      <Col lg={6}>
        <h1 class="text-danger">WELCOME Video.com</h1>
        <p className='text.secondary' style={{ textAlign: 'justify' }}  >Where user can use their favorite videos.  User can upload any youtube vedios by copy and paste  their url in to video.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free... try it now!!</p>
        <button onClick={handleNavigate} className='btn btn-info' >Click Here To Know More</button>





      </Col>
      <Col lg={5}>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFjEPrMidod8uu0mJ5YvX7_y-ZBQId3bM-A&usqp=CAU" width={400} height={400}  alt="" className='img-fluid' />


      </Col>

    </Row>
  )
}

export default Landingpage