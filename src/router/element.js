import {lazy,Suspense} from 'react'
import { Navigate } from 'react-router-dom'
import KeepAlive from 'react-activation'
import MyLoading from '../component/Loading'
let Home = lazy(()=>import('../views/Home'))
let Cart = lazy(()=>import('../views/Cart'))
let Mine = lazy(()=>import('../views/Mine'))
let Index = lazy(()=>import('../views/Index'))
let Login = lazy(()=>import('../views/Login'))
let Info = lazy(()=>import('../views/Info'))
let NotFound = lazy(()=>import('../component/NotFound'))

let elements = [
    {
        path:'/index',
        element:<KeepAlive id='index'><Suspense fallback={<MyLoading/>}><Index/></Suspense></KeepAlive>,
        author:false,
        children:[
            {
                path:'home',
                element:<KeepAlive id='home'><Suspense fallback={<MyLoading/>}><Home/></Suspense></KeepAlive>,
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