import './header.css'
import { NavLink , useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/userSlice'
import React from 'react'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, userInfo } = useSelector((state) => state.user || {})

  // Affiche userName si présent, sinon prénom+nom, sinon 'User'
  const displayName = userInfo?.userName
    ? userInfo.userName
    : (userInfo?.firstName || userInfo?.lastName)
      ? `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim()
      : 'User'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
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
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            {/* Lien vers account qui montre le nom (unique) */}
            <NavLink to="/account" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {displayName}
            </NavLink>

            {/* Bouton logout à côté */}
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
