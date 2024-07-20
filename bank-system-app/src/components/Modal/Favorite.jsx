import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Index';

export const ModalFavorite = ({ isOpen, onClose, update }) => {

  const { dataUser } = useContext(AuthContext)

  const [form, setForm] = useState({
    owner: dataUser.id,
    nickName: '',
    accountFav: ''
  })

  const createHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const create = async () => {
    try {
      const token = localStorage.getItem('token');
      const {data} = await axios.post('http://localhost:3000/favorites/add', form,
        {
          headers: {
            token
          }
        }
      );
      Swal.fire({
        icon: 'success',
        title: data.message
      })
      update();
      onClose();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: data.message
      })
    }
  }

  if (!isOpen) {
    return null
  }
  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title className='text-dark'>ADD FAVORITE</Modal.Title>
          <button onClick={onClose} type="button" className="btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <div className="user_details">
              <div className="input_box">
                <label htmlFor="inputFav">No. account</label>
                <input type="text" id="inputFav" placeholder="Enter the No. Account" name='accountFav' onChange={createHandleChange} required />
              </div>
              <div className="input_box">
                <label htmlFor="inputDpi">nickName</label>
                <input type="text" id="nickName" placeholder="Enter the DPI" name='nickName' onChange={createHandleChange} required />
              </div>
            </div>
            <div className="reg_btn">
              <button type='button' onClick={(e) => create(e)} >Create</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
