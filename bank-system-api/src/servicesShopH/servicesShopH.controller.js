'use strict'

import ServicesShopH from './servicesShopH.model.js'

export const getServicesShopH = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await ServicesShopH.find({ user: id }).populate({ path: 'service', populate: 'service' });;
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdServicesShopH = async (req, res) => {
    try {
        const { id } = req.params
        const history = await ServicesShopH.findOne({ _id: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}