import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEmployees } from '../api'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <>
      <h2>Employee Listing</h2>
      {employees.length === 0 ? (
        <p>No employees yet. <Link to="/add">Add one</Link>.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th>
              <th>Department</th><th>Salary</th><th>Manager</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.dateOfBirth}</td>
                <td>{e.department}</td>
                <td>{Number(e.salary).toLocaleString()}</td>
                <td>{e.managerName || '-'}</td>
                <td>
                  <Link to={`/employees/${e.id}`}>View</Link>{' | '}
                  <Link to={`/employees/${e.id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
