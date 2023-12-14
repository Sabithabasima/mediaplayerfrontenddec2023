import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allapi';
// install toastfy from npm react toastfy
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// using props destructured data  "handleRespo " from home addselector
function Add({handleRespo}) {
  // / all data inputs on modal is assigned to a state

  const [uploaddata, setuploaddata] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: ""

  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // define function from form-control

  const setInput = (e) => {
    const { name, value } = e.target
    // the three dots are called spread operator    if a object values are placed as key value pair then the other objects are empty then it seems to be empty 
    setuploaddata({ ...uploaddata, [name]: value })
    //  setuploaddata(e.target.value)
  }
  console.log(uploaddata);

  // extract embedded url from youtube original url

  const extractUrl = (e) => {
    // console.log(e.target.value);
    let youtubeUrl = e.target.value

    if (youtubeUrl.includes("v=")) {
      // find the index of v=
      let index = youtubeUrl.indexOf("v=")
      console.log(index);
      // seperate the portion after v=  from url
      let videoUrl = youtubeUrl.substring(index + 2, index + 13)

      console.log(videoUrl);

      // change the portion url from the above state
      let videodata = uploaddata

      videodata.url = `https://www.youtube.com/embed/${videoUrl}`

      setuploaddata(videodata)






    }
    console.log(uploaddata);
  }

  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploaddata

    if (!id || !caption || !thumbnail || !url) {
      toast.error("please fill the form completely!")
    }
    else {

      // make a api call
      const response = await addVideo(uploaddata)

      if (response.status >= 200 && response.status < 300) {
        // data to be added in the back end
        // console.log(response.data);
// using props destructured data  
        handleRespo(response.data)

        setShow(false);
        toast.success("new video uploaded successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",

        })
      }
      else {

        toast.warning("provide a unique id!!!")
      }

    }
  }



  // original url:https://www.youtube.com/watch?v=m3OtL4peEWU
  // embedded url:"https://www.youtube.com/embed/m3OtL4peEWU"

  return (
    <>
      <div onClick={handleShow} className='btn'>
        <PlusCircle color='white' size={85} />




      </div>
      
      {/* modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload video details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            {/* id of the video */}
            <FloatingLabel className='mb-3' controlId="floatingid" label="Uploading video id">
              <Form.Control name='id' onChange={setInput} type="text" placeholder="Uploading video id" />
            </FloatingLabel>

            {/* caption of vedio */}

            <FloatingLabel className='mb-3' controlId="floatingcaption" label="Uploading Video caption">
              <Form.Control name='caption' onChange={setInput} type="text" placeholder="video caption" />
            </FloatingLabel>

            {/* uploading vedio cover img url */}

            <FloatingLabel className='mb-3' controlId="floatingimage" label="Vedio cover image url">
              <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder="vedio cover img url" />
            </FloatingLabel>

            {/* Uploading Video Link */}

            <FloatingLabel className='mb-3' controlId="floatinglink" label="Uploading Video Link">
              <Form.Control name='url' onChange={extractUrl} type="text" placeholder="Uploading Video Link" />
            </FloatingLabel>







          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>



      {/* toast from react toast */}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />



    </>




  )
}

export default Add