import './account.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../features/userSlice'
import AccountSection from '../../components/account.section/account.section'
import { Navigate } from 'react-router-dom'

function Account() {
  const dispatch = useDispatch()
  const { token, userInfo, loading, error } = useSelector((state) => state.user || {})
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState('')
  const [localSaving, setLocalSaving] = useState(false)

  useEffect(() => {
    if (token && !userInfo) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, token, userInfo])

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.userName || `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim())
    }
  }, [userInfo])

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const trimmed = (userName || '').trim()
    if (!trimmed) return alert('Le nom d’utilisateur est requis')

    try {
      setLocalSaving(true)
      const payload = await dispatch(updateUserProfile({ userName: trimmed })).unwrap()
      // payload contient userName + éventuellement firstName/lastName merged par le thunk
      setUserName(payload.userName || trimmed)
      setIsEditing(false)
    } catch (err) {
      console.error('update error', err)
      alert('Erreur lors de la mise à jour')
    } finally {
      setLocalSaving(false)
    }
  }

  const handleCancel = () => {
    setUserName(userInfo?.userName || `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim())
    setIsEditing(false)
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {loading ? (
          <h1>Loading...</h1>
        ) : userInfo ? (
          <>
            {!isEditing ? (
              <>
                <h1>
                  Welcome back
                  <br />
                  {userInfo.userName ? userInfo.userName : `${userInfo.firstName} ${userInfo.lastName}`}!
                </h1>
                <button className="edit-button" type="button" onClick={() => setIsEditing(true)}>
                  Edit Username
                </button>
              </>
            ) : (
              <form className="edit-form" onSubmit={handleSave}>
                <div className="input-wrapper">
                  <label htmlFor="username">User name</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete="nickname"
                  />
                </div>

                <div className="edit-actions">
                  {(loading || localSaving) && <span className="loading-text">Mise à jour...</span>}
                  <div className="button-container">
                    <button className="save-button" type="submit" disabled={loading || localSaving}>Save</button>
                    <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          <h1>Impossible de charger le profil</h1>
        )}
      </div>

      <AccountSection />
    </main>
  )
}

export default Account
