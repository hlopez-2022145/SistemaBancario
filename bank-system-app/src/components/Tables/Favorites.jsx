import React from 'react'

export const TableFavorites = ({ nickName, accountFav }) => {
    return (
        <>
            <h5 className="card-title">{nickName}</h5>
            <h5 className="card-title">CUENTA {accountFav} </h5>
            <br />
        </>
    )
}
