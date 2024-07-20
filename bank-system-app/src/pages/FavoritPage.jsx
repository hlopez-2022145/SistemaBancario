import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Index';
import { ModalFavorite } from '../components/Modal/Favorite';
import { ModalTransferFav } from '../components/Modal/TransferFav';
import { TableFavorites } from '../components/Tables/Favorites';

export const FavoritPage = () => {

  const [tableFavorites, setTableFavorites] = useState([{}])
  const [showModalFav, setShowModalFav] = useState(false)
  const [showtTransferFav, setShowTransferFav] = useState(false)
  const { dataUser } = useContext(AuthContext);
  const [datos, setDatos] = useState({});

  const getTableFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios(`http://localhost:3000/favorites/getById/${dataUser.id}`,
        {
          headers: {
            token
          }
        }
      )
      setTableFavorites(data.favorites)
    } catch (e) {
      console.log(e);
    }
  }

  const handleOpenModal = () => {
    setShowModalFav(true);
  }
  const handleCloseModal = () => {
    setShowModalFav(false);
  }
  const handleOpenModal2 = (accountFav, dpi) => {
    let datos1 = {
      accountFav: accountFav,
      dpi: dpi
    }
    setDatos(datos1)
    setShowTransferFav(true);
  }
  const handleCloseModal2 = () => {
    setShowTransferFav(false);
  }

  const updateData = async () => {
    try {
      getTableFavorites();
    } catch (e) {
      console.log();
    }
  }

  const deleteFav = async (id) => {
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
          const { data } = await axios.delete(`http://localhost:3000/favorites/delete/${id}`,
            {
              headers: {
                token
              }
            }
          );
          getTableFavorites();
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

  useEffect(() => getTableFavorites, [])

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>Accounts Favorites</h1>
          </div>
        </div>
      </nav>
      <div className="a1">
        <div className="search-box">
          <div className="row1">
            <input type="text" id='inputSearch' placeholder='Search' />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" className="bi bi-search bi-solid" viewBox="0 0 16 25">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="reg_btn">
        <div className="row">
          <div className="col">
          </div>
          <div className="col">
            <button type='button' onClick={handleOpenModal} className='btn btn-primary' style={{ backgroundColor: '#2c4893' }}>ADD FAVOTIRE</button>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
      {
        tableFavorites.map(({ _id, nickName, accountFav, dpi }, index) => {
          return (
            <div key={index} className='container'>
              <div className="card col-8 mx-auto">
                <div className='card-header'>
                  <TableFavorites
                    nickName={nickName}
                    accountFav={accountFav}
                  ></TableFavorites>
                  <svg onClick={() => deleteFav(_id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16" style={{ width: '100%', transform: 'translate(40%, -170%)', position: 'absolute' }}>
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
                <div className="reg_btn">
                  <button onClick={() => handleOpenModal2(accountFav, dpi)} type='button' className='btn btn-primary' style={{ backgroundColor: '#2c4893', width: '65%', marginLeft: '15%' }}>Transfer</button>
                </div>
              </div>
              <br />
            </div>
          )
        })
      }
      {showModalFav && <ModalFavorite isOpen={showModalFav} onClose={handleCloseModal} update={updateData} />}
      {showtTransferFav && <ModalTransferFav isOpen={showtTransferFav} onClose={handleCloseModal2} datos={datos} />}
    </>
  )
}
