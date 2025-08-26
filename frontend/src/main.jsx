import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Navbar'
import Footer from './Footer'
import MainPage from './components/MainPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <MainPage />
    <Footer />
  </StrictMode>,
)
