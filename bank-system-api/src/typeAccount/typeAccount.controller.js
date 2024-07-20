'use strict'

import TypeAccount from './typeAccount.model.js'


export const typesAccountDefault = async (req, res) => {
    try {
        let monetaria = {
            name: 'MONETARIA'
        }
        let infantil = {
            name: 'INFANTIL'
        }
        let ahorro = {
            name: 'AHORRO'
        }
        let credito = {
            name: 'TARJETA DE CREDITO'
        }
        let prepago = {
            name: 'TARJETA PREPAGO'
        }
        let accountdef = {
            name: 'DEFAULT'
        }
        let typeAccount = await TypeAccount.findOne({ $or: [{ name: monetaria.name }, { name: infantil.name }, { name: credito.name }, { name: prepago.name }, { name: accountdef.name }] });
        if (typeAccount) return
        let mone = new TypeAccount(monetaria);
        let sav = new TypeAccount(ahorro);
        let infa = new TypeAccount(infantil);
        let credi = new TypeAccount(credito);
        let prepa = new TypeAccount(prepago);
        let def = new TypeAccount(accountdef);
        await Promise.all([mone.save(), sav.save(), infa.save(), credi.save(), prepa.save(), def.save()])
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error create types accounts defaults' })
    }
}

export const addTypeA = async (req, res) => {
    try {
        const data = req.body;
        const typeExists = await TypeAccount.findOne({ name: data.name });
        if (typeExists) return res.send({ message: 'Type is already exists' });
        const newType = new TypeAccount(data);
        await newType.save();
        return res.status(200).send({ message: 'Type created successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error addign' })
    }
}

export const updateTypeA = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const typeExists = await TypeAccount.findOne({ name: data.name });
        if (typeExists) return res.send({ message: 'Type is already exists' });
        const update = await TypeAccount.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!update) return res.send({ message: 'Type not found and not updated' });
        return res.status(200).send({ message: `Type with name ${update.name}, updated successfully` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const deleteTypeA = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteType = await TypeAccount.findOneAndDelete({ _id: id });
        if (!deleteType) return res.sed({ message: 'Type not found and not deleted' });
        return res.status(200).send({ message: `Type with name ${deleteType.name} deleted successfully` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleting' })
    }
}

export const getTypeA = async (req, res) => {
    try {
        const types = await TypeAccount.find();
        return res.status(200).send({ types });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdTypeA = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await TypeAccount.findOne({ _id: id })
        return res.status(200).send({ type });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}