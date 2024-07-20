'use strict'

import Services from './services.model.js'

export const saveService = async (req, res) => {
    try {
        let data = req.body
        let existService = await Services.findOne({ name: data.name });
        if (existService) return res.send({ message: 'This services already exists' });
        let services = new Services(data);
        await services.save();
        return res.status(201).send({ message: 'Services created succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error creating services' });
    }
}

export const updatedService = async (req, res) => {
    try {
        let idService = req.params.id
        let data = req.body
        let updatedService = await Services.findOneAndUpdate(
            { _id: idService },
            data,
            { new: true, upsert: true }
        )
        if (!updatedService) return res.send({ message: 'Service not found and not updated' })
        return res.send({ message: 'Service update' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating services' })
    }
}

export const deleteS = async (req, res) => {
    try {
        let idService = req.params.id
        let serviceDeleted = await Services.findOneAndDelete({ _id: idService });
        if (!serviceDeleted) return res.send({ message: 'Service not found and not deleted' });
        return res.send({ message: 'Service deleting succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(404).send({ message: 'Error deleting Service' })
    }
}

export const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        return res.status(200).send({ services });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdServices = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Services.findOne({ _id: id })
        return res.status(200).send({ service });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}