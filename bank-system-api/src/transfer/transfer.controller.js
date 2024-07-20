'use strict'

import Transfer from './transfers.model.js'
import Account from '../account/account.model.js'
import historyTransfer from '../transferH/transferH.model.js'
import moment from 'moment'


export const createTransfer = async (req, res) => {
    try {
        const data = req.body;
        const accountReq = await Account.findOne({ $and: [{ _id: data.accountReq }, { dpi: data.dpi }] });
        if (!accountReq) return res.send({ message: 'Account not found' })
        if (accountReq.state == 'Desactivada') return res.send({ message: 'This account is disable' });
        const acountSender = await Account.findOne({ _id: data.accountSender });
        if (!acountSender) return res.send({ message: 'Selecciona una cuenta' })
        if (data.amount > 2000) return res.send({ message: 'Transfers can only be less than 2000' });
        if (acountSender.balances < data.amount) return res.send({ message: 'dont have enough money' });
        if (data.accountReq === data.accountSender) return res.send({ message: 'Cannot transfer to your own account' });
    
        data.date = moment().subtract(10, 'days').calendar();
        data.hour = moment().format('LTS');

        const total = await Transfer.find({ $and: [{ accountSender: data.accountSender }, { date: data.date }] });
        const totalAmount = total.reduce((acumulador, elemento) => acumulador + elemento.amount, 0);
        if (parseInt(totalAmount) + parseInt(data.amount) > 10000) return res.send({ message: 'No puede transferir mas de 10000 en un dia' })
        let transfers = new Transfer(data);
        console.log(total);
        let transferSave = await transfers.save();
        let req2 = await Account.findOneAndUpdate({ _id: data.accountReq }, { $inc: { balances: data.amount, movements: 1 } }, { new: true });
        let sender = await Account.findOneAndUpdate({ _id: data.accountSender }, { $inc: { balances: -data.amount, movements: 1 } }, { new: true });

        let history = new historyTransfer({ transfer: transferSave._id, user: sender.user });
        let history2 = new historyTransfer({ transfer: transferSave._id, user: req2.user })
        await history.save();
        await history2.save();
        return res.status(200).send({ message: 'Transfer made successfully' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error creating' })
    }
}

export const updateTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        let data = req.body;
        let transfer = await Transfer.findOne({ _id: id });
        let newAmount = data.amount - transfer.amount;
        if (!transfer) return res.send({ message: 'Transfer not found and not deleted' });
        let account = await Account.findOne({ _id: transfer.accountSender });
        if (account.balances < newAmount) return res.send({ message: 'dont have enough money' })
        await Transfer.findOneAndUpdate({ _id: id }, data, { new: true });
        await Account.findOneAndUpdate({ _id: transfer.accountReq }, { $inc: { balances: newAmount } }, { new: true });
        await Account.findOneAndUpdate({ _id: transfer.accountSender }, { $inc: { balances: -newAmount } }, { new: true });

        return res.status(200).send({ message: 'Transfer updated successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const getTransfers = async (req, res) => {
    try {
        let transfers = await Transfer.find().populate({ path: 'accountReq', populate: 'user' }).populate({ path: 'accountSender', populate: 'user' });
        return res.status(200).send({ transfers });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getTransferById = async (req, res) => {
    try {
        let { id } = req.params;
        let transfer = await Transfer.findOne({ _id: id }).populate('accountReq').populate('accountSender');
        return res.status(200).send({ transfer });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}