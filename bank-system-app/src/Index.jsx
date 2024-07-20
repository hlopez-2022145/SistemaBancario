import React, { createContext, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { AdminPage } from './pages/AdminPage'
import { BuyProductPage } from './pages/BuyProductPage'
import { BuyServicePage } from './pages/BuyServicePage'
import { ChangePage } from './pages/ChangePage'
import { AddClient } from './pages/CreatePages/AddClient'
import { FavoritPage } from './pages/FavoritPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfileAccountsPage } from './pages/ProfileAccountsPage'
import { ProfilePage } from './pages/ProfilePage'
import { UpdateClient } from './pages/Updates/Client'
import { UpdateProduct } from './pages/Updates/Product'
import { UpdateProfile } from './pages/Updates/Profile'
import { UpdateServices } from './pages/Updates/Services'
import { AccountView } from './pages/ViewsPage/AccountView'
import { ClienteView } from './pages/ViewsPage/ClienteView'
import { DepositView } from './pages/ViewsPage/DepositView'
import { HistoryView } from './pages/ViewsPage/HistoryView'
import { ProductsView } from './pages/ViewsPage/ProductsView'
import { ServicesView } from './pages/ViewsPage/ServicesView'
import { TransferView } from './pages/ViewsPage/TransferView'
import { TypeAccountsView } from './pages/ViewsPage/TypeAccountsView'

export const AuthContext = createContext();

export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [contextData, setContextData] = useState(null)

    const [dataUser, setDataUser] = useState({
        id: '',
        name: '',
        username: '',
        DPI: '',
        adress: '',
        phone: '',
        email: '',
        work: '',
        balance: '',
        role: ''
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) return
        setLoggedIn(true)
    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
        setDataUser({
            id: '',
            name: '',
            username: '',
            DPI: '',
            adress: '',
            phone: '',
            email: '',
            work: '',
            salary: '',
            role: ''
        });
    };

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: '/',
                    element: <LoginPage />
                },
                {
                    path: '/home',
                    element: <AdminPage />
                },
                {
                    path: '/create',
                    element: <AddClient />
                },
                {
                    path: '/clients',
                    element: <ClienteView />
                },
                {
                    path: '/profile',
                    element: <ProfilePage />
                },
                {
                    path: '/updateProfile/:id',
                    element: <UpdateProfile />
                },
                {
                    path: '/updateClient/:id',
                    element: <UpdateClient />
                },
                {
                    path: '/typeAccount',
                    element: <TypeAccountsView />
                },
                {
                    path: '/products',
                    element: <ProductsView />
                },
                {
                    path: '/services',
                    element: <ServicesView />
                },
                {
                    path: '/updateService/:id',
                    element: <UpdateServices />
                },
                {
                    path: '/account',
                    element: <AccountView />
                },
                {
                    path: '/updateProduct/:id',
                    element: <UpdateProduct />
                },
                {
                    path: '/tranfers',
                    element: <TransferView />
                },
                {
                    path: '/deposits',
                    element: <DepositView />
                },
                {
                    path: '/ProfileAccountUser',
                    element: <ProfileAccountsPage />
                },
                {
                    path: '/favorite',
                    element: <FavoritPage />
                },
                {
                    path: '/history/:id?',
                    element: <HistoryView />
                },
                {
                    path: '/shopService',
                    element: <BuyServicePage/>
                },
                {
                    path: '/buyProducts',
                    element: <BuyProductPage />
                },
                {
                    path: '/change',
                    element: <ChangePage />
                }
            ]
        }
    ])
    return (
        <>
            <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser, handleLogout }}>
                <RouterProvider router={routes} />
            </AuthContext.Provider>
        </>
    )
}
