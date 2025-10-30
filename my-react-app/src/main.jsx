import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from './components/header/header.jsx'
import Footer from './components/footer/footer.jsx'
// import Error from './pages/error/error.jsx'
import Login from './pages/login/login.jsx'
// import Account from './pages/account/account.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
      <Footer />
    </Router>
    
  </StrictMode>,
)
