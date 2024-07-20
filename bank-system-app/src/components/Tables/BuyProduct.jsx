import React from 'react'

export const TableBuyProduct = ({ _id, name, price }) => {
  return (
    <>
      <li className="items">
        <div className="infoWrap">
          <div className="row">
            <div className="col">
              <div className="cartSection">
                <p className="itemNumber">Product</p>
                <h3>{name}</h3>
              </div>
            </div>
            <div className="col">
              <p className='tt'>Q{price}</p>
            </div>
            <div className="col">
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
