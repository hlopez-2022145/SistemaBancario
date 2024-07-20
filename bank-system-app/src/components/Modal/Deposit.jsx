import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ModalDeposit = ({ isOpen, onClose, update }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountReq: '',
    amount: ''
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
      const { data } = await axios.post('http://localhost:3000/deposit/add', form,
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
    return null;
  }
  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title className='text-dark'>Deposit</Modal.Title>
          <button onClick={onClose} type="button" className="btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <div className="user_details">
              <div className="input_box">
                <label htmlFor="inputAccount">No. Account</label>
                <input type="text" id="inputAccount" placeholder="Enter the No. Account" onChange={createHandleChange} name='accountReq' required />
              </div>
              <div className="input_box">
                <label htmlFor="inputAmount">Amount</label>
                <input type="number" id="inputAmount" placeholder="Enter the amount" name='amount' onChange={createHandleChange} required />
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
