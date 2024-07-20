import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../Index'

export const LoginPage = () => {

    const navigate = useNavigate();
    const { setLoggedIn, setDataUser, dataUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post('http://localhost:3000/user/login', form)
            console.log(response)
            if (response.data.token) {
                setLoggedIn(true)
                localStorage.setItem('token', response.data.token)
                setDataUser({
                    id: response.data.userLogged.id,
                    name: response.data.userLogged.name,
                    username: response.data.userLogged.username,
                    DPI: response.data.userLogged.DPI,
                    address: response.data.userLogged.address,
                    phone: response.data.userLogged.phone,
                    email: response.data.userLogged.email,
                    workname: response.data.userLogged.workname,
                    balance: response.data.userLogged.balance,
                    role: response.data.userLogged.role
                })
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                })
            }
            return navigate('/home')
        } catch (err) {
          console.log(err);
            Swal.fire({
                icon: 'error',
                title: err.response.data.message,
            })
        }
    }

    useEffect(() => {
        if (dataUser.role == 'ADMIN') {
            navigate('/home')
        } else if (dataUser.role == 'CLIENT') {
            navigate('/home')
        }
    }, [dataUser])
    
    return (
        <>
            <div className="split-screen a b">
                <div className="left">
                    <section className="copy">
                        <h1 style={{ fontSize: 80 }}>MasterBank</h1>
                        <p style={{ fontSize: 30 }} >Sistema Bancario</p>
                    </section>
                </div>
                <div className="right">
                    <form action="">
                        <section className="copy">
                            <h2>Login</h2>
                            <div className="login-container">
                            </div>
                        </section>
                        <div className="input-container name">
                            <label htmlFor="username">Email / Username</label>
                            <input onChange={handleChange} type="text" id='username' name='username' required={true} />
                        </div>
                        <div className="input-container password">
                            <label htmlFor="password">Password</label>
                            <input onChange={handleChange} type="password" id='password' name='password' required={true} />
                        </div>
                        <button onClick={(e) => login(e)} className="signin-btn" type='submit'>Sign In</button>
                        <section className="copy legal">
                            <p><span className="small">By continuing, you agree to accept our <br />
                                <a href="#">Privacy Policy </a>
                                &amp;
                                <a href="#"> Terms of Services</a>.
                            </span></p>
                        </section>
                    </form>
                </div>
            </div>
        </>
    )
}