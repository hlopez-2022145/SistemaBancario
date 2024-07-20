import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Index';
import { SiberBar } from '../../components/Sidebar/SiberBar';

export const HistoryView = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const params = useParams();
  const id = params.id;
  const [idSearch, setIdSearch] = useState(id);

  const { dataUser } = useContext(AuthContext);

  const changeSearch = () => {
    if (id === undefined) {
      setIdSearch(dataUser.id);
    } else {
      setIdSearch(id);
    }
  };

  const getHistory = async (type) => {
    try {
      setTitle(`History ${type}`);
      const token = localStorage.getItem('token');
      const { data } = await axios(`http://localhost:3000/${type}H/get/${idSearch}`, {
        headers: {
          token,
        },
      });
      setData(data.history);
      setSummary(data.summary);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    changeSearch();
    getHistory('deposit');
  }, []);

  return (
    <>
      {dataUser.role === 'ADMIN' ? <SiberBar /> : null}
      <nav className='navbar navbar-expand-lg navbar-light' style={{ marginTop: '6rem' }}>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample'>
            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>History</h1>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card bg-primary text-white summary-card">
              <div className="card-body">
                <h5>Saldo Inicial:</h5>
                <p className="card-text">Q{summary.initialBalance || '0.00'}</p>
                
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary summary-card">
              <div className="card-body">
                <h5>Saldo Final:</h5>
                <p className="card-text">Q{summary.finalBalance || '0.00'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light summary-card">
              <div className="card-body">
                <h5>Cantidad de Débitos:</h5>
                <p className="card-text">{summary.totalCreditsCount || '0'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-white summary-card">
              <div className="card-body">
                <h5>Cantidad de Créditos:</h5>
                <p className="card-text">{summary.totalCreditsCount || '0'}</p>
              </div>
            </div>
          </div>
        </div>
        <section className='intro mt-4'>
          <div className='bg-image h-100' style={{ backgroundColor: '#f5f7fa' }}>
            <div className='mask d-flex align-items-center h-100'>
              <div className='container'>
                <div className='row justify-content-center'>
                  <div className='col-10'>
                    <div className='card box-shadow'>
                      <div className='card-body p-0'>
                        <div className='table-responsive table-scroll' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '700px' }}>
                          <table className='table table-striped'>
                            <thead style={{ backgroundColor: '#8c7c62' }}>
                              <tr>
                                <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }}>Fecha</th>
                                <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }}>No. de Ref</th>
                                <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }}>Descripción</th>
                                <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }}>Débito</th>
                                <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }}>Crédito</th>
                                <th scope='col' className='text-white' style={{ backgroundColor: '#15297c' }}>Saldo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((transaction, i) => (
                                <tr key={i}>
                                  <td>{transaction.date}</td>
                                  <td>{transaction.ref}</td>
                                  <td>{transaction.description}</td>
                                  <td>{transaction.debit ? `Q${transaction.debit}` : ''}</td>
                                  <td>{transaction.credit ? `Q${transaction.credit}` : ''}</td>
                                  <td>{`Q${transaction.balance}`}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
      </div>
    </>
  );
};
