'use strict'

import HistoryTransfer from './transferH.model.js'
import HistoryDeposit from '../depositH/depositH.model.js'

export const getTransferH = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await HistoryTransfer.find({ user: id }).populate('transfer').populate('user');
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdTransferH = async (req, res) => {
    try {
        const { id } = req.params
        const history = await HistoryTransfer.findOne({ _id: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getAllTransferH = async(req, res)=>{
    try{
        const { id } = req.params;
        const deposit = await HistoryDeposit.find({user: id});
        const transfer = await HistoryTransfer.find({user: id})
        const newArray = deposit.concat(transfer);
        return res.status(200).send({ newArray });
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}