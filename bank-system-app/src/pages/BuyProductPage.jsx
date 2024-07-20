import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ModalBuyProducts } from '../components/Modal/BuyProducts'
import { TableBuyProduct } from '../components/Tables/BuyProduct'

export const BuyProductPage = () => {

  const [products, setProducts] = useState([{}])
  const [tableBuyProduct, setTableBuyProduct] = useState([{}])
  const [search, setSearch] = useState("")
  const [showModalProduct, setShowModalProduct] = useState(false)
  const [buyProduct, setBuyProduct] = useState({})

  const getTableProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios('http://localhost:3000/product/get',
        {
          headers: {
            token
          }
        }
      )
      setProducts(data.products)
      setTableBuyProduct(data.products)
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (searchTerm) => {
    var resultSearch = tableBuyProduct.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        return elemento
    })
    setProducts(resultSearch)
  }

  const handleOpenModal = (id, name, price) => {
    let product = {
      id: id,
      name: name,
      price: price
    }
    setBuyProduct(product)
    setShowModalProduct(true)
  }

  const handleCloseModal = () => {
    setShowModalProduct(false)
  }

  useEffect(() => getTableProducts, [])

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
          <h1>Buy Product</h1>
        </div>
        <div className="cart">
          <ul className="cartWrap">
            {
              products.map(({ _id, name, price }, index) => {
                return (
                  <div key={index}>
                    <TableBuyProduct
                      name={name}
                      price={price}
                    ></TableBuyProduct>
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
      {showModalProduct && <ModalBuyProducts isOpen={showModalProduct} onClose={handleCloseModal} id={buyProduct} />}
    </>
  )
}
