import React from 'react'

export const TableTransfer = ({ accountReq, accountReq2, accountSender, accountSender2, amount, date, hour, description }) => {
    return (
        <>
            <td>{accountReq}</td>
            <td>{accountReq2}</td>
            <td>{accountSender}</td>
            <td>{accountSender2}</td>
            <td>{amount}</td>
            <td>{date}</td>
            <td>{hour}</td>
            <td>{description}</td>
        </>
    )
}
