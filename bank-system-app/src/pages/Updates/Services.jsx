import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SiberBar } from '../../components/Sidebar/SiberBar';

export const UpdateServices = () => {
  const navigate = useNavigate();
  const [tableServices, setTableServices] = useState([{}]);
  const { id } = useParams();

  const getTableServices = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios(`http://localhost:3000/service/getByIdServices/${id}`,
        {
          headers: {
            token
          }
        }
      );
      setTableServices(data.service)
    } catch (e) {
      console.log(e);
    }
  }

  const updateService = async () => {
    try {
      let updatedServices = {
        name: document.getElementById('inputName').value,
        price: document.getElementById('inputPrice').value
      }
      const token = localStorage.getItem('token')
      const { data } = await axios.put(`http://localhost:3000/service/updateService/${id}`, updatedServices,
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
      navigate('/services')
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: e.response.data.message
      })
    }
  }

  useEffect(() => getTableServices, []);

  return (
    <>
      <SiberBar />
      <div className="mother">
        <div className="container1">
          <div className="title">
            <p>Update Services</p>
          </div>
          <form action="#">
            <div className="user_details">
              <div className="input_box">
                <label htmlFor="inputName">Name</label>
                <input name='name' defaultValue={tableServices.name} type="text" id="inputName" placeholder="Enter the name" required />
              </div>
              <div className="input_box">
                <label htmlFor="inputPrice">Price</label>
                <input name='price' defaultValue={tableServices.price} type="number" id="inputPrice" placeholder="Enter the price" required />
              </div>
            </div>
            <div className="reg_btn">
              <div className="row">
                <div className="col">
                  <button type='button' onClick={() => updateService()} >Update</button>
                </div>
                <div className="col reg_btnC">
                  <button type='button' onClick={() => navigate('/services')} >Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
