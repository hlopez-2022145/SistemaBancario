import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

export const ModalChange = ({ isOpen, onClose, datos }) => {
    const [rates, setRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/GTQ');
                setRates(response.data.rates);
                console.log(response.data.rates);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRates();
    }, []);

    const handleConvert = () => {
        if (baseCurrency === 'EUR') {
            let convertedEUR = datos.balances * rates['EUR'];
            setConvertedAmount(convertedEUR);
        } else {
            let convertedUSD = datos.balances * rates['USD'];
            setConvertedAmount(convertedUSD);
        }
    };

    const handleBaseCurrencyChange = (e) => {
        setBaseCurrency(e.target.value);
        setConvertedAmount(0);
    };


    if (!isOpen) {
        return null
    }
    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header>
                    <Modal.Title className='text-dark'>Currency Converter</Modal.Title>
                    <button onClick={onClose} type="button" className="btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-6 offset-md-3">
                                <div className="mb-3">
                                    <label htmlFor="baseCurrency" className="form-label">
                                        Base Currency
                                    </label>
                                    <select id="baseCurrency" className="form-select" onChange={handleBaseCurrencyChange}>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">
                                        Amount
                                    </label>
                                    <input type="number" id="amount" className="form-control" defaultValue={datos.balances} /* onChange={handleAmountChange} */ />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={handleConvert}>
                                        Convert
                                    </button>
                                </div>
                                <p className="text-center mt-3">
                                    Result: {convertedAmount.toFixed(2)} {baseCurrency}
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
