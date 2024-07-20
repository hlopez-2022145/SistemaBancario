import axios from 'axios';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export const ModalPutDeposit = ({ isOpen, onClose, datos, update }) => {
  const navigate = useNavigate();


  const updateDeposit = async () => {
    try {
      let updatedDeposit = {
        amount: document.getElementById('inputAmount').value
      }
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`http://localhost:3000/deposit/update/${datos.id}`, updatedDeposit,
        {
          headers: {
            token
          }
        }
      );
      Swal.fire({
        icon: 'success',
        title: data.message,
      })
      update();
      onClose();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: e.response.data.message
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
          <Modal.Title className='text-dark'>Update Deposit</Modal.Title>
          <button onClick={onClose} type="button" className="btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <div className="user_details">
              <div className="input_box">
                <label htmlFor="inputAmount">Amount</label>
                <input defaultValue={datos.amount} type="number" id="inputAmount" placeholder="Enter the amount" name='amount' required />
              </div>
            </div>
            <div className="reg_btn">
              <button type='button' onClick={() => { updateDeposit(); onClose() }} >Update</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
