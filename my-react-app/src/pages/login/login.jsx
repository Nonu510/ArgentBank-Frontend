import './login.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/userSlice'   // à créer à l'étape suivante
import { Navigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const { token, loading, error } = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Si l’utilisateur est déjà connecté, on redirige vers la page account
  if (token) {
    return <Navigate to="/account" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email: username, password })) // ton API attend un "email"
  }

  return (
    <>
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e)  => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
             />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign-in-button" disabled={loading}>
           {loading ? 'Connexion...' : 'Sign In'}
           </button>
        </form>
      </section>
    </main>
    </>
  )
}

export default Login
