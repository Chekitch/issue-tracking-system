import { useNavigate } from 'react-router-dom';
import './styles.css'
import {useAppDispatch} from "../../../../store/hooks.ts";
import {logout} from "../../store/authSlice.ts";

const LogoutButton = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {

        dispatch(logout());

        navigate('/');
    }

    return (
        <button className='logout-btn' onClick={handleLogout}>
            Logout
        </button>
    )

}

export default LogoutButton