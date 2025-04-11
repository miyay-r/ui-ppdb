import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap"
import { FaBars, FaTimes } from "react-icons/fa"
import './Sidebar.css'

const Sidebar = () => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        setMenuOpen(false)
        navigate("/")
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <>
            {/* Burger Icon */}
            <div className="burger-menu" onClick={toggleMenu}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <h5>Alena BS</h5>
                    <ul>
                        <li>
                            <NavLink to={'/dashboard'} onClick={toggleMenu}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/courses'} onClick={toggleMenu}>Manage</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/profile'} onClick={toggleMenu}>Profile</NavLink>
                        </li>
                    </ul>
                </div>
                <Button onClick={handleLogout} variant='danger' className="btn logout">
                    Logout
                </Button>
            </div>
        </>
    )
}

export default Sidebar
