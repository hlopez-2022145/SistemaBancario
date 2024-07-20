import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Index';

export const ModalTransder = ({ isOpen, onClose, update }) => {
  const navigate = useNavigate();
  const { dataUser } = useContext(AuthContext)
  const [accounts, setAccounts] = useState([{}]);

  const [form, setForm] = useState({
    accountReq: '',
    accountSender: '',
    amount: '',
    description: '',
    dpi: ''
  })

  const createHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const create = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post('http://localhost:3000/transfer/add', form,
        {
          headers: {
            token
          }
        }
      )
      Swal.fire({
        icon: 'success',
        title: data.message
      })
      update();
      onClose();
      getAccount();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: data.message
      })
    }
  }

  const getAccount = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios(`http://localhost:3000/account/getByUser/${dataUser.id}`, {
        headers: {
          token
        }
      });
      setAccounts(data.accounts);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: data.message
      })
    }
  }

  useEffect(() => { getAccount() }, []);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <Modal show={isOpen} size='lg'>
        <Modal.Header>
          <Modal.Title className='text-dark'>Transfer</Modal.Title>
          <button onClick={onClose} type="button" className="btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <div className="user_details">
              <div className="input_box">
                <label htmlFor="inputRes">Receptor</label>
                <input type="text" id="inputRes" placeholder="Enter the No. Account" onChange={createHandleChange} name='accountReq' required />
              </div>
              <div className="input_box">
                <label htmlFor="inputDpi">DPI Receptor</label>
                <input type="number" id="inputDpi" placeholder="Enter the amount" name='dpi' onChange={createHandleChange} required />
              </div>
              <div className="input_box">
                <label htmlFor="inputName">Elige tu cuenta</label>
                <select className='form-select' name='accountSender' onChange={createHandleChange}>
                  <option defaultValue={'Open this select menu'}>Open this select menu</option>
                  {
                    accounts.map(({ _id, balances }, i) => {
                      return (
                        <option key={i} value={_id} className=''>{'No. ' + _id + ' | Balances: ' + 'Q ' + balances + '.00'}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="input_box">
                <label htmlFor="inputAmount">Amount</label>
                <input type="number" id="inputAmount" placeholder="Enter the amount" name='amount' onChange={createHandleChange} required />
              </div>
              <div className='input_box' style={{ width: '100%' }}>
                <label htmlFor='inputDescrip'>Description</label>
                <input type='text' id='inputDescrip' placeholder='Enter your Address' name='description' onChange={createHandleChange} required />
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
