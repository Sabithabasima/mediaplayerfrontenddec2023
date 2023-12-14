import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { Link } from 'react-router-dom'





function Home() {
// child to child data sharing through parent home
  // use state to share data b/w siblings "add" and "view"


  // here initial value is a empty object
  const[severRes,setserverRes]=useState({})
//  
const handleResponse=(res)=>{
  setserverRes(res)

}
  return (
    <>

      <h1 className='text-info ms-5 mb-5'>All video cards</h1>

      <div className='text-end me-5 p-3'><Link to={'/watchhistory'} style={{textDecoration:'none',fontSize:'25px',color:'red'}} className='ms-auto'>Watch History</Link>  </div>

      <div className='container-fluid p-2'>
        <Row>
          {/* Add component selector */}
          <Col lg={1}>
            <Add handleRespo={handleResponse}/>

          </Col>

{/* view component selector */}

          <Col lg={7}>
            <View serverResponse={severRes}/>
          </Col>

{/*  category selector */}
          <Col lg={4}>

            <Category/>



          </Col>
        </Row>

      </div>
    </>
  )
}

export default Home