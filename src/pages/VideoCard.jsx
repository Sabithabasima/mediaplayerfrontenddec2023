import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, deleteVideo } from '../service/allapi';
import { v4 as uuidv4 } from 'uuid';

// card is assigned in the selector of video card in view.js 

// props is used   parent:view  child:videocard
function VideoCard({ card, handleDeleteStatus,insideCategory }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {

    setShow(true);
    // to generate id automatically
    const uid = uuidv4()
    console.log(uid);
    // to generate system time and date
    let cardTime = new Date()
    console.log(cardTime);


    const { caption, url } = card


    if (uid != "", caption != "", url != "", cardTime != "") {
      const body = {
        id: uid,
        categoryname: caption,
        url,
        date: cardTime
      }
      // api call for host data to watch history
      const res = await addHistory(body)
      console.log(res);

    }



  }
  // video remove function to delete


  const removeItem = async (id) => {
    // apicall
    const response = await deleteVideo(id)
    console.log(response);

    if (response.status >= 200 && response.status < 300) {
      handleDeleteStatus(true)
    }
  }


  // function defenition

  const dragStarted = (e, id) => {

    console.log("drag started and source card is" + id);
    e.dataTransfer.setData("cardId", id)

   

  }


  return (
    <>
      <div>
        <Card className='shadow' draggable onDragStart={e => dragStarted(e,card?.id)}>
          <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
          <Card.Body>
            <Card.Title>

              <span>{card?.caption}</span>

              <span>

                {
                  insideCategory?"":
                  <Trash2  onClick={() => removeItem(card?.id)} color='red' style={{ float: 'right' }} />

                }

                

              </span>


            </Card.Title>

          </Card.Body>
        </Card>


        {/* modal for img in card */}


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{card?.caption}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <iframe width={"100%"} height={"400"} src={`${card?.url}?autoplay=1`} title="Halaballoo - Video Song | RDX | Shane Nigam,Antony Varghese,Neeraj Madhav | Nahas Hidhayath| Sam C S" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


          </Modal.Body>

        </Modal>

      </div>

    </>
  )
}

export default VideoCard