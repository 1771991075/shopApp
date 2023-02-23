import {lazy,Suspense} from 'react'
import { Navigate } from 'react-router-dom'
import KeepAlive from 'react-activation'
import MyLoading from '../component/Loading'
import Index from '../views/Index'
import Home from '../views/Home'
let Cart = lazy(()=>import('../views/Cart'))
let Mine = lazy(()=>import('../views/Mine'))
let Login = lazy(()=>import('../views/Login'))
let Info = lazy(()=>import('../views/Info'))
let Order = lazy(()=>import('../views/Order'))
let NotFound = lazy(()=>import('../component/NotFound'))
let Address = lazy(()=>import('../views/Address'))
let Add = lazy(()=>import('../views/Add'))

let elements = [
    {
        path:'/index',
        element:<Index/>,
        author:false,
        children:[
            {
                path:'home',
                element:<KeepAlive id='home'><Home/></KeepAlive>,
                author:false,
            },
            {
                path:'cart',
                element:<Suspense fallback={<MyLoading/>}><Cart/></Suspense>,
                author:true,
            },
            {
                path:'mine',
                element:<Suspense fallback={<MyLoading/>}><Mine/></Suspense>,
                author:true,
            }
        ]
    },
    {
        path:'/add/address',
        element:<Suspense fallback={<MyLoading/>}><Add/></Suspense>,
        author:true
    },
    {
        path:'/Info',
        element:<Suspense fallback={<MyLoading/>}><Info/></Suspense>,
        author:false
    },
    {
        path:'/login',
        element:<Suspense fallback={<MyLoading/>}><Login/></Suspense>,
        author:false
    },
    {
        path:'/address',
        element:<Suspense fallback={<MyLoading/>}><Address/></Suspense>,
        author:true
    },
    {
        path:'/order',
        element:<Suspense fallback={<MyLoading/>}><Order/></Suspense>,
        author:true
    },
    {
        path:'/',
        element:<Navigate to='/index/home'></Navigate>,
        author:false
    },
    {
        path:'*',
        element:<Suspense fallback={<MyLoading/>}><NotFound/></Suspense>,
        author:false
    }
]

export default elements;