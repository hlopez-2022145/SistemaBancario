'use strict'

import Deposit from './deposit.model.js'
import Account from '../account/account.model.js'
import  HistoryDeposit from '../depositH/depositH.model.js'
import moment from 'moment'



const reverse = (id) => {
    
    let seconds = 60;  
    const updateReverse = async() => {
        seconds--
        if(seconds<= 0){
            clearInterval(intervalo)
            const deposit = await Deposit.findOneAndUpdate({_id: id}, {reverse: 0}, {new: true});
            if(!deposit) return
        }
    }

    let intervalo = setInterval(updateReverse, 1000);

    setTimeout(function(){
        clearInterval(intervalo)
    }, 62000);

}

export const createDeposit = async (req, res) => {
    try {
        const data = req.body;
        let existsAccount = await Account.findOne({ _id: data.accountReq })
        if (!existsAccount) return res.send({ message: 'Account not found' })
        if(existsAccount.state == 'Desactivada') return res.send({ message: 'This account is disable' });
        data.date = moment().subtract(10, 'days').calendar();
        data.hour = moment().format('LTS');
        let deposit = new Deposit(data);
        let despositSave = await deposit.save();
        let accountR = await Account.findOneAndUpdate({ _id: data.accountReq }, { $inc: { balances: data.amount, movements: 1 } }, { new: true });
        let history = new HistoryDeposit({ deposit: despositSave._id, user: accountR.user });
        await history.save();
        reverse(despositSave._id);
        return res.status(200).send({ message: 'Deposit made successfully' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error creating' })
    }
}

export const deleteDeposit = async(req, res) => {
    try{
        let { id } = req.params;
        let deposit = await Deposit.findOne({_id: id});
        if(deposit.reverse <= 0) return res.send({message: 'ya ha pasado el tiempo para revertir el deposito'});
        await Deposit.findOneAndDelete({_id: id});
        await HistoryDeposit.findOneAndDelete({deposit: id});
        await Account.findOneAndUpdate({_id: deposit.accountReq}, { $inc: { balances: -deposit.amount, movements: -1 } }, {new: true});
        return res.status(200).send({message: 'reverse deposit'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error deletting'})
    }
}

export const updateDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        let data = req.body;
        let deposit = await Deposit.findOne({ _id: id })
        if (!deposit) return res.send({ message: 'Deposit not found and not deleted' });
        await Deposit.findOneAndUpdate({ _id: id }, data, { new: true });
        await Account.findOneAndUpdate({ _id: deposit.accountReq }, { $inc: { balances: (data.amount - deposit.amount) } }, { new: true });
        return res.status(200).send({ message: 'Deposit updated successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const getDeposits = async (req, res) => {
    try {
        let deposits = await Deposit.find().populate({ path: 'accountReq', populate: 'user' });
        return res.status(200).send({ deposits });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getDepositById = async (req, res) => {
    try {
        let { id } = req.params;
        let deposit = await Deposit.findOne({ _id: id }).populate('accountReq');
        return res.status(200).send({ deposit });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}