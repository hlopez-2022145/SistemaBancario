import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UpdateDeposit = () => {
    const navigate = useNavigate();
    const [tableDeposit, setTableDeposit] = useState([{}]);
    const { id } = useParams();

    const getTableDeposit = async () => {
        try {
            const { data } = await axios(`http://localhost:2880/deposit/getById/${id}`);
            setTableDeposit(data.deposit)
        } catch (e) {
            console.log(e);
        }
    }

    const updateDeposit = async () => {
        try {
            let updatedDeposit = {
                /* accountReq: document.getElementById('inputReq').value, */
                amount: document.getElementById('inputAmount').value
            }
            const { data } = await axios.put(`http://localhost:2880/deposit/update/${id}`, updatedDeposit);
            Swal.fire({
                icon: 'success',
                title: data.message
            })
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => getTableDeposit, [])
    return (
        <>
            <div className='mother'>
                <div className='container1'>
                    <div className='title'>
                        <p>Update Deposit</p>
                    </div>
                    <form action="#">
                        <div className="user_details">
                            {/* <div className="input_box">
                                <label htmlFor="inputReq">No. Account</label>
                                <input defaultValue={tableDeposit.accountReq} type="text" id="inputReq" placeholder="Enter the No. Account" name='accountReq' required />
                            </div> */}
                            <div className="input_box">
                                <label htmlFor="inputAmount">Amount</label>
                                <input defaultValue={tableDeposit.amount} type="number" id="inputAmount" placeholder="Enter the amount" name='amount' required />
                            </div>
                        </div>
                        <div className="reg_btn">
                            <div className="row">
                                <div className="col">
                                    <button type='button' onClick={() => updateDeposit()} >Create</button>
                                </div>
                                <div className="col reg_btnC">
                                    <button type='button' onClick={() => navigate('/deposits')} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
