import React from 'react'

export const TableClient = ({name, username, DPI, address, phone, email, workname, balance, role}) => {
    return (
        <>
        <td>{name}</td>
        <td>{username}</td>
        <td>{DPI}</td>
        <td>{address}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{workname}</td>
        <td>{balance}</td>
        <td>{role}</td>
        </>
    )
}
