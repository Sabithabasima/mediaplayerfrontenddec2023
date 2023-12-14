import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { getHistory } from '../service/allapi';


function Watchhistory() {

  const [history, sethistory] = useState([])
  // hook to view on loading
  useEffect(() => {
    getwatchHistory()


  }, [])


  // watch history when page is loaded

  const getwatchHistory = async () => {
    const { data } = await getHistory()
    //  console.log(response);
    sethistory(data)

  }
  console.log(history);

  return (
    <>

      <h5 className='text-center text-danger mb-3'>WATCH HISTORY</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>categoryname</th>
            <th>url</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {
            history?.map((item, index) => (

              <tr>
                <td>{index + 1}</td>
                <td>{item?.categoryname}</td>
                <td>{item?.url}</td>
                <td>{item?.date}</td>
              </tr>
            ))
          }


        </tbody>
      </Table>


    </>
  )
}

export default Watchhistory