'use strict'

import Account from '../account/account.model.js'
import { createToken } from '../services/jwt.js'
import { checkPassword, encrypt, validateData } from '../utils/validate.js'
import User from './user.model.js'



export const defaults = async (req, res) => {
    try {
        let admin = {
            name: 'ADMINB',
            username: 'ADMINB',
            DPI: 'ADMINB',
            address: 'ADMINB',
            phone: 'ADMINB',
            email: 'ADMINB',
            password: 'ADMINB',
            workname: 'ADMINB',
            balance: '0.00',
            role: 'ADMIN'
        }
        let defUser = {
            name: 'Default',
            username: 'Default',
            DPI: 'Default',
            address: 'Default',
            phone: 'Default',
            email: 'Default@gmail.com',
            password: '123',
            workname: 'Default',
            balance: '0.00',
            role: 'CLIENT'
        }
        admin.password = await encrypt(admin.password,);
        defUser.password = await encrypt(defUser.password);
        let existAdmin = await User.findOne({ username: admin.username });
        let existDefault = await User.findOne({ username: defUser.username });
        if (existAdmin || existDefault) return
        let adminDefault = new User(admin)
        let userDefault = new User(defUser)
        await Promise.all([adminDefault.save(), userDefault.save()])
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error create admin default' })
    }
}

export const login = async (req, res) => {
    try {
        let data = req.body
        if (!data.username || !data.password) return res.send({ message: 'Check that all fields are complete' });
        let user = await User.findOne({ username: data.username });
        if (user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            let userLogged = {
                id: user._id,
                name: user.name,
                username: user.username,
                DPI: user.DPI,
                address: user.address,
                phone: user.phone,
                email: user.email,
                workname: user.workname,
                balance: user.balance,
                role: user.role
            }
            return res.send({ message: 'User logged succesfully', token, userLogged })
        }
        return res.status(404).send({ message: 'Invalid Credentials' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Invalid credentials' })
    }
}

export const saveUser = async (req, res) => {
    try {
        let data = req.body;

        let userExistsDPI = await User.findOne({ DPI: data.DPI });
        if (userExistsDPI) return res.send({ message: 'This DPI is already in use' });
        let userExistsEmail = await User.findOne({ email: data.email });
        if (userExistsEmail) return res.send({ message: 'This Email is already in use' });
        let userExistsUsername = await User.findOne({ username: data.username })
        if (userExistsUsername) return res.send({ message: 'This Email is already in use' })
        if (data.salary < 100) return res.send({ message: 'The minimun salary can not be less than 100' })
        let validate = validateData(data)
        if (validate) return res.status(400).send({ message: validate })
        data.password = await encrypt(data.password)
        let user = new User(data);
        await user.save();
        return res.status(201).send({ message: 'User created successfully' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error creating user' })
    }
}

export const updateUser = async (req, res) => {
    try {
        let idUser = req.params.id;
        let data = req.body;

        let userExistsDPI = await User.findOne({ DPI: data.DPI });
        if (userExistsDPI) return res.send({ message: 'This DPI is already in use' });
        let userExistsEmail = await User.findOne({ email: data.email });
        if (userExistsEmail) return res.send({ message: 'This Email is already in use' });
        let userExistsUsername = await User.findOne({ username: data.username })
        if (userExistsUsername) return res.send({ message: 'This username is already in use' })

        let updatedUser = await User.findOneAndUpdate(
            { _id: idUser },
            data,
            { new: true, upsert: true }
        )
        if (!updatedUser) return res.send({ message: 'User not found and not update' });
        return res.send({ message: 'Updated User' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating user' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        let idUser = req.params.id;
        let defUser = await User.findOne({ name: 'Default' })
        let accountUser = await Account.findOne({ user: idUser })
        if (defUser._id == idUser) return res.send({ message: 'Default user cannot deleted' });
        await Account.updateMany(
            { user: idUser },
            { user: defUser._id, dpi: defUser.DPI, state: 'Desactivada' }
        );
        let userDeleted = await User.findOneAndDelete({ _id: idUser });
        if (!userDeleted) return res.send({ message: 'User not found and not deleted' });
        return res.send({ message: 'User deleting succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(404).send({ message: 'Error deleting user' })
    }
}

export const getUser = async (req, res) => {
    try {
        let users = await User.find();
        return res.status(200).send({ users });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getByIdUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findOne({ _id: id });
        if (!user) return res.send({ message: 'User not found' });
        return res.status(200).send({ user });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getRoleClient = async (req, res) => {
    try {
        let user = await User.find({ role: 'CLIENT' });
        if (!user) return res.send({ message: 'User not found role Client' });
        return res.status(200).send({ user });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

export const getPersonalInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, role } = req.user;
        if (role !== 'ADMIN' && id.toString() !== _id.toString()) return res.status(401).send({ message: 'Unauthorized' })
        const user = await User.findOne({ _id: id });
        if (!user) return res.send({ message: 'User not found' });
        return res.status(200).send({ user });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting personal info' })
    }
}

export const updatePersonalInfo = async(req, res) => {
    try {
        const {id} = req.params
        const { _id, role } = req.user
        const data = req.body
        if (role !== 'ADMIN' && id.toString() !== _id.toString()) return res.status(401).send({ message: 'Unauthorized' })
        const user = await User.findByIdAndUpdate({_id:id}, data, {new:true})
        if (!user) return res.send({ message: 'User not found' });
        return res.status(200).send({ message: 'Personal info updated', user })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating personal info' })
    }
}