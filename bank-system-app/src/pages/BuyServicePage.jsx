import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiberBar } from '../components/Sidebar/SiberBar'
import { TableServices } from '../components/Tables/Services'
import { ModalShopService } from '../components/Modal/ShopService'
import { TableBuyService } from '../components/Tables/BuyService'

export const BuyServicePage = () => {
  const [services, setServices] = useState([{}])
  const [tableServices, setTableServices] = useState([{}])
  const [search, setSearch] = useState("")
  const [showModalServices, setShowModalServices] = useState(false);
  const [buyService, setBuyService] = useState({});

  const handleOpenModal = (id, name, price) => {
    let service = {
      id: id,
      name: name,
      price: price
    }
    setBuyService(service)
    setShowModalServices(true);
  }
  const handleCloseModal = () => {
    setShowModalServices(false);
  }

  const navigate = useNavigate();

  const getServices = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios('http://localhost:3000/service/getServices',
        {
          headers: {
            token
          }
        }
      )
      setServices(data.services)
      setTableServices(data.services)
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (searchTerm) => {
    var resultSearch = tableServices.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        return elemento
    })
    setServices(resultSearch)
  }

  useEffect(() => getServices, [])
  return (
    <>
      <div className="wrap cf" style={{ marginTop: '4rem' }}>
        <div className="a1">
          <div className="search-box">
            <div className="row1">
              <input type="text" id='inputSearch' placeholder='Search' value={search} onChange={handleChangeSearch} />
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" className="bi bi-search bi-solid" viewBox="0 0 16 25">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="heading cf">
          <h1>Buy Services</h1>
        </div>
        <div className="cart">
          <ul className="cartWrap">
            {
              services.map(({ _id, name, price }, index) => {
                return (
                  <div key={index}>
                    <TableBuyService
                      name={name}
                      price={price}
                    ></TableBuyService>
                    <div className="heading2 cf">
                      <a href="#" onClick={() => handleOpenModal(_id, name, price)} className="continue" style={{ transform: 'translate(550%, -240%)', position: 'absolute' }}>BUY PRODUCT</a>
                    </div>
                  </div>
                )
              })
            }
          </ul>
        </div>
      </div>
      <ModalShopService isOpen={showModalServices} onClose={handleCloseModal} id={buyService} />
    </>
  )
}
