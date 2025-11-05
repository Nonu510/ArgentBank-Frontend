import './account.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../features/userSlice'
import AccountSection from '../../components/account.section/account.section';
import { Navigate } from 'react-router-dom'

function Account() {
  const dispatch = useDispatch()
  const { token, userInfo, loading } = useSelector((state) => state.user)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    if (token && !userInfo) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, token, userInfo])
 

return (
<main class="main bg-dark">
      <div className="header">
        {loading ? (<h1>Loading...</h1>
        ) : userInfo ? (
          <>
          <h1>Welcome back<br />{userInfo.firstName} {userInfo.lastName}!</h1>
          <button className="edit-button">Edit Name</button>
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