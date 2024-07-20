import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
config();

const port = process.env.PORT || 3200

// Import routes

import userRoutes from '../src/user/user.routes.js'
import accountRoutes from '../src/account/account.routes.js';
import depositRoutes from '../src/deposit/deposit.routes.js';
import transferRoutes from '../src/transfer/transfers.routes.js'
import typeAccountRoutes from '../src/typeAccount/typeAccount.routes.js';
import servicesRoutes from '../src/ProductServices/services.routes.js';
import productRoutes from '../src/product/product.routes.js';
import historyServices from '../src/servicesShopH/servicesShopH.routes.js';
import productsH from '../src/productsH/productsH.routes.js';
import historyTransfer from '../src/transferH/transferH.routes.js';
import depositH from '../src/depositH/depositH.routes.js';
import favorites from '../src/favorite/favorite.routes.js';
import shopProduct from '../src/productS/productS.routes.js';
import shopService from '../src/shopService/shopService.routes.js';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/user', userRoutes)
app.use('/account', accountRoutes);
app.use('/deposit', depositRoutes);
app.use('/transfer', transferRoutes);
app.use('/typeAccount', typeAccountRoutes);
app.use('/service', servicesRoutes);
app.use('/product', productRoutes);
app.use('/serviceH', historyServices);
app.use('/productsH',productsH);
app.use('/transferH',historyTransfer);
app.use('/depositH',depositH);
app.use('/favorites',favorites);
app.use('/productoS',shopProduct);
app.use('/ShopService',shopService);

export const initServer = () => {
    app.listen(port, () => {
        console.log(`Server http running in port ${port}`);
    });
};
