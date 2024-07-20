import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Index'
import logo from '../../assets/images/MasterLogo.png'
import '../CSS/style.css'
import Swal from 'sweetalert2'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()


    const { handleLogout, dataUser, loggedIn } = useContext(AuthContext)

    const logOut = () => {
        Swal.fire({
            title: 'Do you want to log out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Closed session',
                    '',
                    'success',
                );
                localStorage.clear();
                handleLogout();
                navigate('/');
            }
        });
    }

    return (
        <>
            <nav className='navbar navbar-expand-lg bg1 sticky-top navbar-light p-3 shadow-sm' style={{ position: 'fixed', width: '100%' }}>
                <div className='container'>
                    <Link to={'/'} id='a' className='navbar-brand d-block d-lg-none'>
                        <img src={logo} height='30px' />
                    </Link>
                    <li className='nav-item d-none d-lg-block'>
                        <Link to={'/'} className='nav-link mx-2'>
                            <img className='img-hover' src={logo} height='50px' />
                        </Link>
                    </li>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className=' collapse navbar-collapse' id='navbarNavDropdown'>
                        <h3 style={{ color: '#FFF', fontSize: 30, marginLeft: 10 }}>Master Bank</h3>
                        {
                            dataUser.role == 'ADMIN' ? (
                                <ul className='navbar-nav ms-auto '>
                                    <li className='nav-item'>
                                        <Link to={'/home'} id='aXD' className='nav-link mx-2 text-uppercase ' style={{ color: '#FFF' }}>
                                            Home
                                        </Link>
                                    </li>
                                </ul>
                            ) : dataUser.role == 'CLIENT' ? (
                                <ul className='navbar-nav ms-auto '>
                                    <li className='nav-item'>
                                        <Link to={'/buyProducts'} id='aXD' className='nav-link mx-2 text-uppercase ' style={{ color: '#FFF' }}>
                                            Buy Products
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to={'/shopService'} id='aXD' className='nav-link mx-2 text-uppercase ' style={{ color: '#FFF' }}>
                                            Buy Services
                                        </Link>
                                    </li>
                                </ul>
                            ) : <></>
                        }
                        {
                            loggedIn == true && dataUser.role == 'CLIENT' ? (
                                <>
                                    <div className='dropdown'>
                                        <svg style={{ color: '#FFF' }} xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-person-circle dropdown-toggle' viewBox='0 0 16 16'>
                                            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                            <path fillRule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
                                        </svg>
                                        <div className='dropdown-content dropdown-menu' id='desple'>
                                            <a href="#" className='dropdown-item' onClick={() => navigate('/profile')}>Profile</a>
                                            <a href="#" className='dropdown-item' onClick={() => navigate('/ProfileAccountUser')}>Account</a>
                                            <a href="#" className='dropdown-item' onClick={() => navigate('/favorite')}>Favorites</a>
                                            <a href="#" className='dropdown-item' onClick={() => navigate('/history')}>History</a>
                                            <p onClick={() => logOut()} className='dropdown-item' id='logU'>LogOut</p>
                                        </div>
                                    </div>
                                </>
                            ) : <></>
                        }
                        {
                            loggedIn == true && dataUser.role == 'ADMIN' ? (
                                <>
                                    <div className='dropdown'>
                                        <svg style={{ color: '#FFF' }} xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-person-circle dropdown-toggle' viewBox='0 0 16 16'>
                                            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                            <path fillRule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
                                        </svg>
                                        <div className='dropdown-content dropdown-menu' id='desple'>
                                            <a href="#" className='dropdown-item' onClick={() => navigate('/profile')}>Profile</a>
                                            <p onClick={() => logOut()} className='dropdown-item' id='logU'>LogOut</p>
                                        </div>
                                    </div>
                                </>
                            ) : <></>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
