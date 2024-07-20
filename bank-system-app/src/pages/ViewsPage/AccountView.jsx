import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ModalAccount } from '../../components/Modal/Account';
import { SiberBar } from '../../components/Sidebar/SiberBar';
import { TableAccount } from '../../components/Tables/Account';

export const AccountView = () => {

  const navigate = useNavigate();
  const [tableAccount, setTableAccount] = useState([{}]);
  const [accounts, setAccounts] = useState([{}])
  const [search, setSearch] = useState("")
  const [showModalAccount, setShowModalAccount] = useState(false)

  const handleOpenModal = () => {
    setShowModalAccount(true);
  }
  const handleCloseModal = () => {
    setShowModalAccount(false);
  }

  const getTableAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios('http://localhost:3000/account/get',
        {
          headers: {
            token
          }
        }
      );
      setTableAccount(data.accounts)
      setAccounts(data.accounts)
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (searchTerm) => {
    var resultSearch = tableAccount.filter((elemento) => {
      if (elemento._id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        elemento.user.name.toString().toLowerCase().includes(searchTerm.toLowerCase())) return elemento
    })
    setAccounts(resultSearch)
  }

  const sortTableByMovementsAscendt = () => {
    const sortedTable = [...accounts].sort((a, b) => b.movements - a.movements);
    setAccounts(sortedTable)
  }

  const sortTableByMovementsDescendt = () => {
    const sortedTable = [...accounts].sort((a, b) => a.movements - b.movements);
    setAccounts(sortedTable)
  }

  const updateData = async () => {
    try {
      getTableAccount();
    } catch (e) {
      console.log(e);
    }
  }

  const deleteAccount = async (id) => {
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
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          const { data } = await axios.delete(`http://localhost:3000/account/delete/${id}`,
            {
              headers: {
                token
              }
            }
          );
          getTableAccount();
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
    getTableAccount();
  }, [])

  return (
    <>
      <SiberBar />
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>VIEW ACCOUNTS</h1>
          </div>
        </div>
      </nav>
      <div className="container t">
        <div className="row d-flex justify-content-center ">
          <div className="a1">
            <div className="search-box">
              <div className="row1">
                <input type="text" id='inputSearch' placeholder='Search' defaultValue={search} onChange={handleChangeSearch} />
                <label htmlFor="inputSearch">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" className="bi bi-search bi-solid" viewBox="0 0 16 25">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-lg-4">
            <div className="row">
              <div className="col1" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button onClick={handleOpenModal} className='btn btn-primary' style={{ width: '32%' }}>CREATE</button>
                <button onClick={() => sortTableByMovementsAscendt()} className='btn btn-primary' style={{ width: '32%' }} > DESCENDETE</button>
                <button onClick={() => sortTableByMovementsDescendt()} className='btn btn-primary' style={{ width: '32%' }}> ASCENDETE</button>
              </div>
            </div>
          </div>
        </div >
      </div >
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
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >No. Account</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Balance</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Type Account</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >State</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Username</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >DPI</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Movements</th>
                              <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }} >Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              accounts.map(({ _id, balances, typeAccount, state, user, dpi, movements }, i) => {
                                return (
                                  <tr key={i}>
                                    <TableAccount
                                      _id={_id}
                                      balances={balances + '.00 Q '}
                                      typeAccount={typeAccount?.name}
                                      state={state}
                                      user={user?.username}
                                      dpi={dpi}
                                      movements={movements}
                                    ></TableAccount>
                                    <td className='text-center align-middle'>
                                      <div className='btn-group align-top'>
                                        <div onClick={() => deleteAccount(_id)} className='btn btn-sm btn-danger btn-outline-secondary badge'>
                                          <button className='btn badge' type='button'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi2 bi-trash-fill' viewBox='0 0 16 16'>
                                              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
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
      <ModalAccount isOpen={showModalAccount} onClose={handleCloseModal} update={updateData} />
    </>
  )
}
