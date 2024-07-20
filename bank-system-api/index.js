'use strict'

import {initServer} from './configs/app.js'
import {connect} from './configs/mongo.js'
import {defaults} from './src/user/user.controller.js'
import {typesAccountDefault} from './src/typeAccount/typeAccount.controller.js'
import {accountDefault} from './src/account/account.controller.js'

initServer()
connect()

export const defaultsA = async () => {
    try {
        await typesAccountDefault();
        await defaults();
        await accountDefault();
    } catch (e) {
        console.error(e);
    }
}
defaultsA();