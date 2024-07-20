import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SiberBar } from '../../components/Sidebar/SiberBar';
import { TableClient } from '../../components/Tables/Client';

export const ClienteView = () => {

  const [tableClient, setTableClient] = useState([{}]);
  const [client, setClient] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const getTableClient = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get('http://localhost:3000/user/getRoleClient',
        {
          headers: {
            token
          }
        }
      );
      setClient(data.user)
      setTableClient(data.user)
      setIsLoading(true)
    } catch (e) {
      console.log(e);
    }
  }
  const handleChangeSearch = (e) => {
    filtrar(e.target.value)
  }

  const filtrar = useMemo(() => {
    return (searchTerm) => {
      let resultSearch = tableClient.filter((elemento) => {
        if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          return elemento
      })
      if (resultSearch.length === client.length) return
      setClient(resultSearch)
    }
  }, [client])

  const deleteClient = async (id) => {
    try {
      Swal.fire({
        title: 'Do you want to delete this record?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        const token = localStorage.getItem('token')
        if (result.isConfirmed) {
          const { data } = await axios.delete(`http://localhost:3000/user/delete/${id}`,
            {
              headers: {
                token
              }
            }
          );
          getTableClient();
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

  useEffect(() => {
    getTableClient()
  }, [])

  return (
    <>
      <SiberBar />
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>VIEW CLIENTS</h1>
          </div>
        </div>
      </nav>
      <div className="container t">
        <div className="row d-flex justify-content-center ">
          <div className="a1">
            <div className="search-box">
              <div className="row1">
                <input type="text" id='inputSearch' placeholder='Search' onChange={handleChangeSearch} />
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
                <div className='col-12'>
                  <div className='card box-shadow'>
                    <div className='card-body p-0'>
                      <div className='table-responsive table-scroll' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '700px' }}>
                        <table className='table table-striped '>
                          <thead style={{ backgroundColor: '#8c7c62' }}>
                            <tr>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Name</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Username</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >DPI</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Address</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Phone</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Email</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >WorkName</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Balance</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Role</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoading && client.map(({
                              _id, name, username, DPI, address, phone, email, workname, balance, role
                            }) => {
                              return (
                                <tr key={_id}>
                                  <TableClient
                                    name={name}
                                    username={username}
                                    DPI={DPI}
                                    address={address}
                                    phone={phone}
                                    email={email}
                                    workname={workname}
                                    balance={balance}
                                    role={role}
                                  ></TableClient>
                                  <td className='text-center align-middle'>
                                    <div className='btn-group align-top'>
                                      <div className='btn btn-sm btn-primary btn-outline-secondary badge'>
                                        <button onClick={() => navigate(`/updateClient/${_id}`)} className='btn badge' type='button' data-toggle='modal' data-target='#user-form-modal'>
                                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi-pencil-square bi2' viewBox='0 0 16 16'>
                                            <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                                            <path fillRule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z' />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className='btn btn-sm btn-danger btn-outline-secondary badge'>
                                        <button onClick={() => deleteClient(_id)} className='btn badge' type='button'>
                                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi-trash-fill bi2' viewBox='0 0 16 16'>
                                            <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className='btn btn-sm btn-danger btn-outline-secondary badge'>
                                        <button onClick={() => navigate(`/history/${_id}`)} className='btn badge' type='button'>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history bi2" viewBox="0 0 16 16">
                                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
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
    </>
  )
}
