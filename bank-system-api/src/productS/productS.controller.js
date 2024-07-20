'use strict'

import Shop from './productS.model.js'
import Account from '../account/account.model.js'
import Product from '../product/product.model.js'
import HistoryProduct from '../productsH/productsH.model.js'

export const buyProduct = async (req, res) => {
    try {
        let data = req.body
        if ((parseInt(data.account) % 10) > 0) {
            let numberAccount = data.account
            data.account = (numberAccount + '' + '.0')
            console.log(data.account);
        }
        if (!data.quantity) data.quantity = 1
        let product = await Product.findOne({ _id: data.product });
        let account = await Account.findOne({ _id: data.account });
        let amount = product.price * data.quantity;
        if (account.balances < amount) return res.send({ message: 'No tienes suficiente dinero' })
        let shop = new Shop(data)
        await shop.save()
        await Account.findOneAndUpdate(
            { _id: data.account },
            { $inc: { balances: -(amount) } },
            { new: true }
        )
        let history = new HistoryProduct({ product: shop._id, user: account.user });
        await history.save();
        return res.status(200).send({ message: 'bought' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error buying' })
    }
}