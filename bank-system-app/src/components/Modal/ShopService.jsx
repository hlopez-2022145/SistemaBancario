import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../Index';


export const ModalShopService = ({ isOpen, onClose, id }) => {
  const { dataUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([{}])

  console.log(id.id);

  const getAccounts = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios(`http://localhost:3000/account/getByUser/${dataUser.id}`,
        {
          headers: {
            token
          }
        }
      )
      setAccounts(data.accounts);
      console.log(data.accounts);
    } catch (e) {
      console.log(e);
    }
    console.log(id);
  }

  const create = async () => {
    try {
      let add = {
        service: id.id,
        account: document.getElementById('inputAccount').value
      }
      const token = localStorage.getItem('token')
      const { data } = await axios.post('http://localhost:3000/ShopService/buyService', add,
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
              <div className="textarea_box" style={{ width: '100%' }}>
                <label htmlFor="inputAccount">Account</label>
                <select className='form-select' id='inputAccount'>
                  <option defaultValue={'Enter your account for pay'}>Open this select menu</option>
                  {
                    accounts.map(({ _id, balances, typeAccount, state }, i) => {
                      return (
                        <option key={i} value={_id} className=''>{'No. Account:' + ' ' + _id + ' | ' + 'Balance:' + ' Q' + balances}</option>
                      )
                    })
                  }
                </select>
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
