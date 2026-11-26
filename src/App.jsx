import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import EmployeeForm from './pages/EmployeeForm.jsx'
import EmployeeList from './pages/EmployeeList.jsx'
import EmployeeView from './pages/EmployeeView.jsx'

export default function App() {
  return (
    <>
      <nav className="nav">
        <span className="brand">Employee Management</span>
        <NavLink to="/add">Add Employee</NavLink>
        <NavLink to="/employees">Employee Listing</NavLink>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeView />} />
          <Route path="/employees/:id/edit" element={<EmployeeForm />} />
        </Routes>
      </main>
    </>
  )
}
