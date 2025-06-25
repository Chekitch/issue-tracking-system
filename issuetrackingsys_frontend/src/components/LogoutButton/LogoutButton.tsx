import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import './LogoutButton.css';
import { logout } from '../../features/auth/authSlice';

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