import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiberBar } from '../../components/Sidebar/SiberBar'
import { TableTransfer } from '../../components/Tables/Transfer'

export const TransferView = () => {

  const [transfer, setTransfer] = useState([{}])
  const [tableTransfer, setTableTransfer] = useState([{}])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const getTableTransfer = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios('http://localhost:3000/transfer/get',
        {
          headers: {
            token
          }
        }
      );
      setTransfer(data.transfers);
      setTableTransfer(data.transfers);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (searchTerm) => {
    var resultSearch = tableTransfer.filter((elemento) => {
      if (elemento.date.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        return elemento
    })
    setTransfer(resultSearch)
  }

  useEffect(() => getTableTransfer, [])

  return (
    <>
      <SiberBar />
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>VIEW TRANSFERS</h1>
          </div>
        </div>
      </nav>
      <div className="container t">
        <div className="row d-flex justify-content-center ">
          <div className="a1">
            <div className="search-box">
              <div className="row1">
                <input type="text" id='inputSearch' placeholder='Search' value={search} onChange={handleChangeSearch} />
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" className="bi bi-search bi-solid" viewBox="0 0 16 25">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='intro'>
        <div className='bg-image h-100' style={{ backgroundColor: '#f5f7fa', marginTop: '1.5rem' }}>
          <div className='mask d-flex align-items-center h-100'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-10'>
                  <div className='card box-shadow'>
                    <div className='card-body p-0'>
                      <div className='table-responsive table-scroll' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '700px' }}>
                        <table className='table table-striped '>
                          <thead style={{ backgroundColor: '#8c7c62' }}>
                            <tr>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Receptor</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Name</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Emisor</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Name</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Monto</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Date</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Hour</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              transfer.map(({ _id, accountReq, accountReq2, accountSender, accountSender2, amount, date, hour, description }, i) => {
                                return (
                                  <tr key={i}>
                                    <TableTransfer
                                      accountReq={accountReq?._id}
                                      accountReq2={accountReq?.user.name}
                                      accountSender={accountSender?._id}
                                      accountSender2={accountSender?.user.name}
                                      amount={amount + '.00 Q'}
                                      date={date}
                                      hour={hour}
                                      description={description}
                                    ></TableTransfer>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <br />
    </>
  )
}
