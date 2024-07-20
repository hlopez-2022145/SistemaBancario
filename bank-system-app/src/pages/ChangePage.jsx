import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ChangePage = () => {
    const [rates, setRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('GTQ');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(
                    `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
                );
                setRates(response.data.rates);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRates();
    }, [baseCurrency]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleConvert = () => {
        const rate = rates['USD']; // Obtén la tasa de cambio para la moneda objetivo (ejemplo: EUR)
        const converted = amount * rate;
        setConvertedAmount(converted);
    };

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center mb-4">Currency Converter</h2>
                        <div className="mb-3">
                            <label htmlFor="baseCurrency" className="form-label">
                                Base Currency
                            </label>
                            <select id="baseCurrency" className="form-select" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GTQ">GTQ</option>
                                {/* Agrega más opciones según tus necesidades */}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">
                                Amount
                            </label>
                            <input type="number" id="amount" className="form-control" value={amount} onChange={handleAmountChange} />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={handleConvert}>
                                Convert
                            </button>
                        </div>
                        <p className="text-center mt-3">
                            Result: {convertedAmount.toFixed(2)} {baseCurrency}
                        </p>
                        <ul>
                            {Object.keys(rates).map((currency) => (
                                <li key={currency}>
                                    {currency}: {rates[currency]}

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
