import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux' 
import { store } from './store'
import './index.css'
import App from './App.jsx'
import Header from './components/header/header.jsx'
import Footer from './components/footer/footer.jsx'
import Error from './pages/error/error.jsx'
import Login from './pages/login/login.jsx'
import Account from './pages/account/account.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/error" element={<Error />} />
                  <Route path="*" element={<Error />} />                
              </Routes>
        <Footer />
      </Router>
    </Provider>
  </StrictMode>,
)
