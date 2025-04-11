import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages'
import Dashboard from './pages/Dashboard'
import "bootstrap/dist/css/bootstrap.min.css"
import Profile from './pages/Profile'
import Siswa from './pages/courses/Siswa'
import Pendaftaran from './pages/Pendaftaran'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/courses' element={<Siswa/>}/>
        <Route path='/dashboard/profile' element={<Profile/>}/>
        <Route path="/pendaftaran" element={<Pendaftaran/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
