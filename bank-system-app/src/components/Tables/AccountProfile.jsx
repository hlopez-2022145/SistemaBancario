import React, { useState } from 'react'
import MasterLogo from '../../assets/images/MasterLogo.png'
import { useNavigate } from 'react-router-dom';

export const TableAccountProfile = ({ _id, user, balances, typeAccount, state }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className='container'>
                <div className="card col-8 mx-auto">
                    <div className='card-header'>
                        <h5 className="card-title">{user}</h5>
                        <h5 className="card-title">CUENTA {typeAccount} - {_id} </h5>
                    </div>
                    <div className="card-body">
                        <div className="#">
                        </div>
                        <p className="card-text text-end h5">
                            GTQ {balances} <br />
                            <img src={MasterLogo} className="img-fluid" alt="..." style={{width: '8%', filter: 'invert(100%)', position: 'absolute', transform: 'translate(-1100%, -50%)', opacity: '0.5'}} />
                            <small className="text-muted">Saldo</small>
                        </p>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
