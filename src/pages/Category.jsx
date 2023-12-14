import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllCategory, getVideos, updateCategory } from '../service/allapi';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard'



function Category() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [categoryItem, setcategoryItem] = useState({
    id: "",
    name: "",
    allvideos: []
  })

  // to bring value outside the function 
  const [allCategory, setallCategory] = useState([])

  const [deletecateStatus, setdeletecateStatus] = useState(false)

  // used to view catogary
  useEffect(() => {
    getCategoryList()
  }, [deletecateStatus])


  const hanStatus = (res) => {
    setdeletecateStatus(res)
  }




  // const removeCategory = async (e,id) =>{
  // e.preventDefault ()  :::
  // console.log(id);
  // api call
  // await deleteCategory(id)
  // getCategoryList()
  // }



  // a function to delete category

  const removeCategory = async (id) => {
    // api call for delete category
    const response = await deleteCategory(id)

    if (response.status >= 200 && response.status < 300) {
      hanStatus(true)

    }

  }




  // define function of onclick
  const addcategoryForm = (e) => {
    const { name, value } = e.target
    setcategoryItem({ ...categoryItem, [name]: value })
    //  ...    rest operator 

  }

  console.log(categoryItem);

  const handleAddCategory = async (e) => {
    e.preventDefault()
    // prevent default dismiss auto refreashing

    const { id, name } = categoryItem
    if (!id || !name) {
      toast.warning("please fill the form completely")
    }
    else {
      const response = await addCategory(categoryItem)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        setShow(false);
        toast.success("new category added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",

        })

        // to show list without refreashing
        getCategoryList()
      }
      else {
        toast.error("provide a unique id!")
      }
    }

  }
  const getCategoryList = async () => {
    // api call
    const res = await getAllCategory()
    console.log(res);
    setallCategory(res.data)
  }
  // include in return
  console.log(allCategory);


  // function define:dragOver

  const dragOver = (e) => {

    e.preventDefault()
    console.log("dragging over the category board");

  }
  // function define

  const dropped = async (e, categoryid) => {
    console.log("category id", categoryid);
    let sourceCardId = e.dataTransfer.getData("cardId")

    console.log("sourceCardId", sourceCardId);

    // logic to implement adding card in the given category
    const{data} = await getVideos(sourceCardId);

    console.log('source video data',data);


    // dropped catogory details
    let selectedCategory=allCategory.find(item=>item.id==categoryid)
    console.log("target category details",selectedCategory);
    // to push drop data in to array
    selectedCategory.allvideos.push(data)
    // update drop data in allvideos array
    await updateCategory(categoryid,selectedCategory)
    getCategoryList()


  }


  return (
    <>

      <div className='d-grid'>


        <div className=' btn btn-dark m-2' onClick={handleShow}>

          Add Category

        </div>

      </div>
      {

        allCategory.map(item => (
          <div droppable onDragOver={e => { dragOver(e) }} onDrop={e => dropped(e, item.id)}>
            <div className='d-flex justify-content-between border rounded mt-3 p-2'>
              <h4>{item.name}</h4>

              {/*another method:<span onClick={e=>removeCategory(e,item?.id)}><Trash2  color='red' /></span>  */}
              <span><Trash2 onClick={() => removeCategory(item.id)} color='red' /></span>

              <Row>
                {
                  item?.allvideos.map((card)=>(
                    <Col className='p-3 mb-1 sm={12}'>
                    <VideoCard card={card} insideCategory={true}/>
                    </Col>
                  ))
                }

              </Row>
            </div>

          </div>
        ))
      }




      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Categary</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Id of the Video">
              <Form.Control name='id' onChange={addcategoryForm} type="text" placeholder="Category Id" />
            </FloatingLabel>


            <FloatingLabel className='mb-3' controlId="floatingcategory" label="Category">
              <Form.Control name='name' onChange={addcategoryForm} type="text" placeholder="Category " />
            </FloatingLabel>




          </Form>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>

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

export default Category