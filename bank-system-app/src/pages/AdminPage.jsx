import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Index';
import AboutU from '../assets/images/QnSomos.jpg';
import logo from '../assets/images/MasterLogo.png';
import backgrHead from '../assets/images/Home.jpeg';
import { ModalTransder } from '../components/Modal/Transfer';
import { SiberBar } from '../components/Sidebar/SiberBar';

export const AdminPage = () => {
    const navigate = useNavigate();

    const { dataUser } = useContext(AuthContext)

    const [showModalTransfer, setShowModalTransfer] = useState(false);

    const handleOpenModal = () => {
        setShowModalTransfer(true);
        console.log(showModalTransfer);
    }
    const handleCloseModal = () => {
        setShowModalTransfer(false);
    }

    return (
        <>
            {
                dataUser.role == "ADMIN" ? (
                    <>
                        <SiberBar />
                    </>
                ) : <></>
            }
            <main style={{ paddingTop: '5%' }}>
                <div style={{  backgroundRepeat: "no-repeat", backgroundImage: `url(${backgrHead})`, backgroundSize: "110%", backgroundPosition: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: ' right' }}>
                    <div>
                        <h1 id='aXD' style={{ color: "#fff", fontSize: "5rem", marginBottom: "1rem", paddingLeft: '500px' }}>
                            MASTER BANK <img id='aXD' src={logo} height='100em'></img>
                        </h1>
                        {
                            dataUser.role == 'CLIENT' ? (
                                <>
                                    <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "2rem" }}>
                                        Justo, personal y sencillo!!
                                    </h2>
                                </>
                            ) : <></>
                        }
                        {
                            dataUser.role == 'ADMIN' ? (
                                <>
                                    <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "2rem" }}>
                                        Welcome, Admin!
                                    </h2>
                                    <div className="containerLog">
                                        <div>
                                            <Link to={'/create'} id='buttonn' className="btn log"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-plus" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                            </svg></Link>
                                        </div>
                                    </div>
                                </>
                            ) : <></>
                        }
                    </div>
                </div>
            </main >
            <section id="about" className="py-5">
                <div className="container">
                    <div className="row">
                        <h2 style={{ fontSize: '3em' }} className="mb-4 text-center ">¿Quiénes somos?</h2>
                        <div className="col-md-6">
                            <p style={{ fontSize: '1.5em' }} className="lead mb-4">Nos dedicamos a ofrecer una amplia gama de servicios financieros diseñados para satisfacer las necesidades de nuestros clientes.</p>
                            <p style={{ fontSize: '1.5em' }} className="lead mb-4">Nuestro objetivo principal es proporcionar soluciones bancarias innovadoras y accesibles para todos, desde estudiantes y profesores hasta la comunidad en general.</p>
                        </div>
                        <div className="col-md-6">
                            <img src={AboutU} alt="Imagen de nosotros" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
            </section>

            <ModalTransder isOpen={showModalTransfer} onClose={handleCloseModal} />
        </>
    )
}
