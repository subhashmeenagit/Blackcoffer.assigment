import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar';
import Home from './components/Home';
import "./style/app.scss"
import Chaart from './components/Chaart';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chart' element={<Chaart />} />

      </Routes>
      <Toaster />

    </Router>
  )
}

export default App