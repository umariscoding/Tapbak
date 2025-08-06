import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './index.css'
import FormPage from './pages/FormPage'

function App() {
  return (
    <Routes>
      <Route path='/:vendorName' element={<FormPage />} />
    </Routes>
  )
}

export default App