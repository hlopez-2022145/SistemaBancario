import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { ModalDeposit } from '../../components/Modal/Deposit'
import { SiberBar } from '../../components/Sidebar/SiberBar'
import { TableDeposit } from '../../components/Tables/Deposit'
import { ModalPutDeposit } from '../Updates/ModalPutDeposit'

export const DepositView = () => {
  const [deposit, setDeposit] = useState([{}])
  const [tableDeposits, setTableDeposits] = useState([{}])
  const [search, setSearch] = useState("")

  const [datos, setDatos] = useState({});
  const [showModalDeposit, setShowModalDeposit] = useState(false);
  const [showModalPutDeposit, setShowModalPutDeposit] = useState(false);

  const getTableDeposit = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios('http://localhost:3000/deposit/get',
        {
          headers: {
            token
          }
        }
      );
      setDeposit(data.deposits)
      setTableDeposits(data.deposits)
    } catch (e) {
      console.log(e);
    }
  }

  const reverseDeposit = async (id) => {
    try {
      Swal.fire({
        title: 'Do you want to reverse this deposit?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reverse it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          const { data } = await axios.delete(`http://localhost:3000/deposit/delete/${id}`,
            {
              headers: {
                token
              }
            }
          );
          getTableDeposit();
          Swal.fire(
            data.message,
            '',
            'success'
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (searchTerm) => {
    var resultSearch = tableDeposits.filter((elemento) => {
      if (elemento.accountReq.user.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        elemento.accountReq._id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        return elemento
    })
    setDeposit(resultSearch)
  }

  const updateData = async () => {
    try {
      getTableDeposit();
    } catch (e) {
      console.log(e);
    }
  }

  const handleOpenModal = () => {
    setShowModalDeposit(true);
  }
  const handleCloseModal = () => {
    setShowModalDeposit(false);
  }

  const handleOpenModal2 = (id, amount) => {
    let datos1 = {
      id: id,
      amount: amount
    }
    setDatos(datos1);
    setShowModalPutDeposit(true);
  }

  const handleCloseModal2 = () => {
    setShowModalPutDeposit(false);
  }

  useEffect(() => getTableDeposit, [])

  return (
    <>
      <SiberBar />
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>VIEW DEPOSITS</h1>
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
          <div className="col-md-2 col-lg-4">
            <div className="row">
              <div className="col1" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button onClick={handleOpenModal} className='btn btn-primary' style={{ width: '50%' }}>CREATE DEPOSIT</button>
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
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >No. Account</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Nombre</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Monto</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Date</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Hour</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              deposit.map(({ _id, accountReq, amount, accountReq2, date, hour }, index) => {
                                return (
                                  <tr key={index}>
                                    <TableDeposit
                                      accountReq={accountReq?._id}
                                      accountReq2={accountReq?.user.name}
                                      amount={amount + '.00 Q'}
                                      date={date}
                                      hour={hour}
                                    ></TableDeposit>
                                    <td className='text-center align-middle'>
                                      <div className='btn-group align-top'>
                                        <div className='btn btn-sm btn-primary btn-outline-secondary badge'>
                                          <button onClick={() => handleOpenModal2(_id, amount)} className='btn badge' type='button' data-toggle='modal' data-target='#user-form-modal'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi2 bi-pencil-square' viewBox='0 0 16 16'>
                                              <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                                              <path fillRule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z' />
                                            </svg>
                                          </button>
                                        </div>
                                        <div className='btn btn-sm btn-danger btn-outline-secondary badge'>
                                          <button onClick={() => reverseDeposit(_id)} className='btn badge' type='button' data-toggle='modal' data-target='#user-form-modal'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat bi2" viewBox="0 0 16 16">
                                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
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
      <ModalDeposit isOpen={showModalDeposit} onClose={handleCloseModal} update={updateData} />
      <ModalPutDeposit isOpen={showModalPutDeposit} onClose={handleCloseModal2} datos={datos} update={updateData} />
    </>
  )
}
