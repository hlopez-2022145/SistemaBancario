import axios from 'axios'
import queryString from 'query-string'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'
import { SiberBar } from '../components/Sidebar/SiberBar'


export const ProfilePage = () => {

    const navigate = useNavigate();
    const { dataUser } = useContext(AuthContext)
    const [account, setAccount] = useState('')

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
        setAccount(data.accounts[0]._id)
        } catch (e) {
          console.log(e);
        }
      }
    
      useEffect(() => getAccounts, [])

    const location = useLocation()
    const queryParams = queryString.parse(location.search)

    return (
        <>
            {
                dataUser.role == 'ADMIN' ? (
                    <SiberBar />
                ) : <></>
            }
            <div className="mother">
                <div className="container1">
                    <div className="title">
                        <p>Profile</p>
                    </div>
                    <form action="#">
                        <div className="user_details">
                            <div className="input_box">
                                <label htmlFor="inputName">Full Name</label>
                                <input type="text" id="inputName" placeholder="Enter your name" defaultValue={dataUser.name} name='name' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" id="inputUsername" placeholder="Enter your username" defaultValue={queryParams.username || dataUser.username} name='username' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="email" id="inputEmail" placeholder="Enter your email" defaultValue={queryParams.email || dataUser.email} name='email' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputPhone">Phone Number</label>
                                <input type="text" id="inputPhone" placeholder="Enter your number phone" defaultValue={queryParams.phone || dataUser.phone} name='phone' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputBalance">Balance</label>
                                <input type="number" id="inputBalance" placeholder="Enter your balance" defaultValue={dataUser.balance} name='balance' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputDPI">DPI</label>
                                <input type="text" id="inputDPI" placeholder="Enter your DPI" defaultValue={dataUser.DPI} name='DPI' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputWorkName">Name work</label>
                                <input type="text" id="inputWorkName" placeholder="Enter your workname" defaultValue={dataUser.workname} name='workname' readOnly />
                            </div>
                            <div className="input_box">
                                <label htmlFor="inputAccount">No. Account</label>
                                <input type="text" id="inputAccount" placeholder="Enter your account" defaultValue={account} name='account' readOnly />
                            </div>
                            <div className="input_box" style={{ width: '100%' }}>
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" id="inputAddress" placeholder='Enter your Address' defaultValue={dataUser.address} name="address" readOnly />
                            </div>
                        </div>
                        {
                            dataUser.role == 'CLIENT' ?
                            <>
                            <div className='reg_btn'>
                                <button type='button' onClick={() => navigate(`/updateProfile/${dataUser.id}`)}>Update</button>
                            </div>
                            </> :
                            <></>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

