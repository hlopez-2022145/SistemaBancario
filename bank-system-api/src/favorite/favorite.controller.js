'use strict'

import Favorite from './favorite.model.js'
import Account from '../account/account.model.js'

export const addFavorite = async (req, res) => {
    try {
        const data = req.body;
        const alreadyFavorite = await Favorite.findOne({ $and: [{ owner: data.owner }, { accountFav: data.accountFav }] });
        const account = await Account.findOne({ _id: data.accountFav });
        if (!account) return res.send({ message: 'Account not found' });
        data.dpi = account.dpi;
        if (alreadyFavorite) return res.send({ message: 'Ya agregado a favorito' });
        const newFavorite = new Favorite(data);
        await newFavorite.save();
        return res.status(200).send({ message: 'added to favorites' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding' })
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteFavorite = await Favorite.findOneAndDelete({_id: id })
        if (!deleteFavorite) return res.send({ message: 'Favorite not found and not deleted' })
        return res.status(200).send({ message: 'Removed from favorites' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleting' })
    }
}

export const getFavorite = async (req, res) => {
    try {
        const data = req.body;
        const favorites = await Favorite.find({ owner: data.owner });
        return res.status(200).send({ favorites });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const favorites = await Favorite.find({ owner: id });
        return res.status(200).send({ favorites });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}