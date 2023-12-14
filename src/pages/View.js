import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../service/allapi'


// serverResponse is a props destructured from parent "HOme"
function View({serverResponse}) {
// state is created to get the delete function without refreashing
  const[deleteStatus,setdeleteStatus]=useState(false)



  // state is used to update the data outside the function
  // to store api response
  // api response is a array so need to put a empty array 
  const [allvideos, setallvideos] = useState([])

  // useeffct is used to view videos when page is loaded

  useEffect(() => {

    // shows all the videos
    getallVideos()

  }, [serverResponse,deleteStatus])

  // create a function to view automatically all vidseos

  // api response

  const getallVideos = async () => {
    const response = await getVideo()
    //  console.log(response.data);
    setallvideos(response.data)

  }

  console.log(allvideos);

  // function to get delete response (without refreashing)

  const handleDeleteStatus=(res)=>{

    setdeleteStatus(res)

  }


  return (
    <>

      <div className='border p-3 rounded m-5'>

        <Row>
          {
          allvideos.map(video=>(
            <Col className='p-3 mb-3' sm={12} md={6}>

              {/* card id used in video card */}

              {/* handleDeleteStatus is passed to child */}
                <VideoCard  card={video} handleDeleteStatus={handleDeleteStatus}/>
              
              

              
            </Col>
          ))
            
          }
        </Row>

      </div>

    </>
  )
}

export default View