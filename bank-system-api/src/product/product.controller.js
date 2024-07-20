'use strict'

import Product from './product.model.js'

export const addProduct = async (req, res) => {
    try {
        let data = req.body
        let existProduct = await Product.findOne({ name: data.name });
        if (existProduct) return res.send({ message: 'This Product already exists' });
        let product = new Product(data);
        await product.save();
        return res.status(201).send({ message: 'Product created succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error creating Product' });
    }
}

export const updateP = async (req, res) => {
    try {
        let idProduct = req.params.id
        let data = req.body
        let updatedProduct = await Product.findOneAndUpdate(
            { _id: idProduct },
            data,
            { new: true, upsert: true }
        )
        if (!updatedProduct) return res.send({ message: 'Product not found and not updated' })
        return res.send({ message: 'Product update' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating Product' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let idProduct = req.params.id
        let productDeleted = await Product.findOneAndDelete({ _id: idProduct });
        if (!productDeleted) return res.send({ message: 'Product not found and not deleted' });
        return res.send({ message: 'Product deleting succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(404).send({ message: 'Error deleting Product' })
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send({ products });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id })
        return res.status(200).send({ product });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const buyProduct = async (req, res) => {
    try {
        let data = req.body;
        let productExists = await Product.findOne({ name: data.name });
        if (!productExists) return res.send({message: 'Product not found'});
        


    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error buy product' })
    }
}