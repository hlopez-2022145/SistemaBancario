import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ModalAccount = ({ isOpen, onClose, update }) => {
  const navigate = useNavigate();
  const [typeAccount, setTypeAccount] = useState([{}]);
  const [user, setUser] = useState([{}]);


  const getTypeAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3000/typeAccount/get',
        {
          headers: {
            token
          }
        }
      );
      setTypeAccount(data.types);
    } catch (e) {
      console.log(e);
    }
  }

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3000/user/get',
        {
          headers: {
            token
          }
        }
      );
      setUser(data.users)
    } catch (e) {
      console.log(e);
    }
  }

  const addAccount = async () => {
    try {
      let add = {
        typeAccount: document.getElementById('inputTypeAccount').value,
        user: document.getElementById('inputUser').value
      }
      console.log(add);
      const token = localStorage.getItem('token');
      const { data } = await axios.post('http://localhost:3000/account/add', add,
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

  useEffect(() => { getTypeAccount(), getUsers() }, []);


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
                <label htmlFor="inputName">Type Account</label>
                <select className='form-select' id='inputTypeAccount'>
                  <option defaultValue={'Open this select menu'}>Open this select menu</option>
                  {
                    typeAccount.map(({ _id, name }, i) => {
                      return (
                        <option key={i} value={_id} className=''>{name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="input_box">
                <label htmlFor="inputUsername">User</label>
                <select className='form-select' id='inputUser'>
                  <option defaultValue={'Open this select menu'}>Open this select menu</option>
                  {
                    user.map(({ _id, name, username, DPI }, i) => {
                      return (
                        <option key={i} value={_id} className=''>{username}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="reg_btn">
              <button type='button' onClick={() => addAccount()} className='btn btn-primary' style={{ backgroundColor: '#2c4893' }}>AddAccount</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
