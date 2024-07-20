import React from 'react'

export const TableAccount = ({ _id, balances, typeAccount, state, user, dpi, movements }) => {
    return (
        <>
            <td>{_id}</td>
            <td>{balances}</td>
            <td>{typeAccount}</td>
            <td>{state}</td>
            <td>{user}</td>
            <td>{dpi}</td>
            <td>{movements}</td>
        </>
    )
}
