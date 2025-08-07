import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './index.css'
import PrimaryLayout from './layout/primary'
import FormPage from './pages/FormPage'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:vendorName' element={<PrimaryLayout>
        <FormPage />
      </PrimaryLayout>} />
    </Routes>
  )
}

export default App