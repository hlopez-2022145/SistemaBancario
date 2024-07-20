import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Index';

export const ModalBuyProducts = ({ isOpen, onClose, id }) => {
  const { dataUser } = useContext(AuthContext)
  const [accounts, setAccounts] = useState([{}])

  const getAccounts = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = dataUser && await axios(`http://localhost:3000/account/getByUser/${dataUser.id}`,
        {
          headers: {
            token
          }
        }
      )
      setAccounts(data.accounts);
    } catch (e) {
      console.log(e);
    }
  }

  const create = async () => {
    try {
      let add = {
        product: id.id,
        quantity: document.getElementById('inputQuantity').value,
        account: document.getElementById('inputAccount').value,
      }
      const token = localStorage.getItem('token')
      const { data } = await axios.post('http://localhost:3000/productoS/buyProduct', add,
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
      onClose();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => getAccounts, [])

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title className='text-dark'>Confirm shop</Modal.Title>
          <button onClick={onClose} type="button" className="btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <br />
          <h2 className='text-center'>{id.name + '  -  Q' + id.price}</h2>
          <form action="#">
            <div className="user_details">
              <div className="input_box" style={{ width: '100%' }}>
                <label htmlFor='inputQuantity'>Quantity</label>
                <input type="number" id="inputQuantity" placeholder="Enter the quantity" />
              </div>
              <div className="textarea_box" style={{ width: '100%' }}>
                <label htmlFor='inputAccount'>Account</label>
                <select className='select form-select' aria-label='Default select example' id='inputAccount' placeholder='Select to role' name='role'>
                  <option defaultValue={'Enter your account for pay'}>Select to account</option>
                  {
                    accounts.map(({ _id, balances }, i) => {
                      return (
                        <option key={i} value={_id} className=''>{'No. Account:' + ' ' + _id + ' | ' + 'Balance:' + ' Q' + balances}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="reg_btn">
              <button onClick={(e) => create(e)} type='button'>Buy</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}