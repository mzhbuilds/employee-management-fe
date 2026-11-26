import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEmployee } from '../api'

export default function EmployeeView() {
  const { id } = useParams()
  const [emp, setEmp] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getEmployee(id).then(setEmp).catch((e) => setError(e.message))
  }, [id])

  if (error) return <p className="error">{error}</p>
  if (!emp) return <p>Loading...</p>

  return (
    <>
      <h2>Employee Details</h2>
      <dl className="details">
        <dt>ID</dt><dd>{emp.id}</dd>
        <dt>First Name</dt><dd>{emp.firstName}</dd>
        <dt>Last Name</dt><dd>{emp.lastName}</dd>
        <dt>Date of Birth</dt><dd>{emp.dateOfBirth}</dd>
        <dt>Department</dt><dd>{emp.department}</dd>
        <dt>Salary</dt><dd>{Number(emp.salary).toLocaleString()}</dd>
        <dt>Manager</dt>
        <dd>{emp.managerId ? <Link to={`/employees/${emp.managerId}`}>{emp.managerName}</Link> : '-'}</dd>
      </dl>
      <Link to={`/employees/${emp.id}/edit`}>Edit</Link>{' | '}
      <Link to="/employees">Back to list</Link>
    </>
  )
}
