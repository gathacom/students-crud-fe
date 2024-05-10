import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentsList from './components/StudentsList'
import AddNewStudent from './components/AddNewStudent'
import EditStudent from './components/EditStudent'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="container w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentsList />} />
            <Route path="/add" element={<AddNewStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <StudentsList></StudentsList> */}
    </>
  )
}

export default App
