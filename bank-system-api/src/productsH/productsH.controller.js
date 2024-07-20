'use strict'

import ProductsH  from './productsH.model.js'

export const getProductH = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await ProductsH.find({ user: id }).populate({ path: 'product', populate: 'product' });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdProductH = async (req, res) => {
    try {
        const { id } = req.params
        const history = await ProductsH.findOne({ _id: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}