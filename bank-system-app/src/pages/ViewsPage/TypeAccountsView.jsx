import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiberBar } from '../../components/Sidebar/SiberBar';
import { TableTypeAccount } from '../../components/Tables/TypeAccount';

export const TypeAccountsView = () => {

  const navigate = useNavigate()

  const [typeAccounts, setTypeAccounts] = useState([{}]);
  const [tableTypeAccounts, setTableTypeAccounts] = useState([{}])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getTableTypeAccounts = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios('http://localhost:3000/typeAccount/get',
        {
          headers: {
            token
          }
        }
      );
      setTableTypeAccounts(data.types)
      setTypeAccounts(data.types)
      setIsLoading(true)
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (searchTerm) => {
    var resultSearch = tableTypeAccounts.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        return elemento
    })
    setTypeAccounts(resultSearch)
  }

  useEffect(() => {
    getTableTypeAccounts()
  }, [])

  return (
    <>
      <SiberBar />
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>VIEW TYPE ACCOUTS</h1>
          </div>
        </div>
      </nav>
      <br />
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
      </div >
      <br />
      <section className="intro">
        <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-6">
                  <div className="card box-shadow">
                    <div className="card-body p-0">
                      <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '500px' }}>
                        <table className="table table-striped ">
                          <thead style={{ backgroundColor: '#8c7c62' }}>
                            <tr>
                              <th scope="col" className='text-white' style={{ backgroundColor: '#15297c' }}>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoading && typeAccounts.map(({ _id, name }) => {
                                return (
                                  <tr key={_id}>
                                    <TableTypeAccount
                                      name={name}
                                    ></TableTypeAccount>
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
