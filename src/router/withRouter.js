import {useParams,useSearchParams,useLocation,useNavigate} from 'react-router-dom'

function WithRouter(Component){
    function ComponentHook(props){
        let params = useParams()
        let searchParams = useSearchParams()
        let location = useLocation()
        let navigate = useNavigate()
        let path = location.pathname
        let active = 0
        switch (path) {
            case '/index/home':
                active = 0
                break;
            case '/index/cart':
                active = 1
                break;
            case '/index/mine':
                active = 2
                break;
            default :
                active = 0
        }
        return <Component {...props} router={{params,searchParams,location,navigate}} active={active}></Component>
    }
    return ComponentHook
}

export default WithRouter