import React from 'react'
import Navbar from './components/Navbar.jsx'
import Panel from './components/Panel.jsx'
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Cards from './pages/Cards.jsx'
import Cars from './pages/Cars.jsx'
import Transactions from './pages/Transactions.jsx'

export default function App() {
    return (
        <Router>
            <Navbar/>
            <Panel/>
            <Routes>
                    <Route path="cars" element={<Cars/>} />
                    <Route path="cards" element={<Cards/>} />
                    <Route path="transactions" element={<Transactions/>} />
            </Routes>
        </Router>
    )
}

