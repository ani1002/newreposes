import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import LabBookingForm from './pages/LabBookingForm'
import PatientTable from './pages/DashBoard'
import LabWebsite from './pages/Labratorypage'
import PatientTable2 from './pages/Dashboard1'
import PatientTable3 from './pages/Dashboardupdate'

import PatientTable6 from './pages/newTable'

// import AdvancedLabWebsite from './pages/MainPage'
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div>
        
        <Routes>
          <Route path='/' element= {<LabWebsite/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path= '/form' element = {<LabBookingForm/>}/>
          <Route path= '/dash-board1' element = {<PatientTable/>}/>
          <Route path= '/dash-board2' element = {<PatientTable2/>}/>
          <Route path= '/dash-boardupdate' element = {<PatientTable3/>}/>
          <Route path = '/dash-board6' element = {<PatientTable6/>}/>
        
      
        </Routes>
    </div>
    </>
  )
}

export default App
