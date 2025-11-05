import './header.css'
import { NavLink , useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/userSlice'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, userInfo } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/') // redirection vers la page d'accueil
  }

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="./src/assets/argentBankLogo.png"
          alt="Argent Bank Logo"
        />   
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
       <div>
        {!token ? (
          // 🟢 Si l'utilisateur n'est PAS connecté
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          // 🔵 Si l'utilisateur est connecté
          <>
            <NavLink to="/account" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userInfo?.firstName || 'User'}
            </NavLink>
            <button className="main-nav-item logout-btn" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header


