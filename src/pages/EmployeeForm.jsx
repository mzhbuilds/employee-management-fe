import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getDepartments, getEmployee, getEmployees, updateEmployee } from '../api'

const EMPTY = { firstName: '', lastName: '', dateOfBirth: '', department: '', salary: '', managerId: '' }

// One form for both Add (/add) and Edit (/employees/:id/edit)
export default function EmployeeForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [departments, setDepartments] = useState([])
  const [managers, setManagers] = useState([])
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    setForm(EMPTY) // reset when switching from Edit to Add
    setErrors({})
    setServerError('')
    getDepartments().then(setDepartments).catch((e) => setServerError(e.message))
    getEmployees().then(setManagers).catch((e) => setServerError(e.message))
    if (isEdit) {
      getEmployee(id)
        .then((e) => setForm({
          firstName: e.firstName,
          lastName: e.lastName,
          dateOfBirth: e.dateOfBirth,
          department: e.department,
          salary: e.salary,
          managerId: e.managerId ?? '',
        }))
        .catch((e) => setServerError(e.message))
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required'
    if (!form.dateOfBirth) errs.dateOfBirth = 'Date of birth is required'
    else if (new Date(form.dateOfBirth) >= new Date()) errs.dateOfBirth = 'Date of birth must be in the past'
    if (!form.department) errs.department = 'Department is required'
    if (form.salary === '') errs.salary = 'Salary is required'
    else if (Number(form.salary) <= 0) errs.salary = 'Salary must be greater than 0'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const payload = {
      ...form,
      salary: Number(form.salary),
      managerId: form.managerId === '' ? null : Number(form.managerId),
    }
    try {
      const saved = isEdit ? await updateEmployee(id, payload) : await createEmployee(payload)
      navigate(`/employees/${saved.id}`)
    } catch (err) {
      setServerError(err.message)
      setErrors(err.fieldErrors)
    }
  }

  // An employee cannot be their own manager
  const managerOptions = managers.filter((m) => String(m.id) !== String(id))

  return (
    <>
      <h2>{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <Field label="First Name *" error={errors.firstName}>
          <input name="firstName" value={form.firstName} onChange={handleChange} />
        </Field>
        <Field label="Last Name *" error={errors.lastName}>
          <input name="lastName" value={form.lastName} onChange={handleChange} />
        </Field>
        <Field label="Date of Birth *" error={errors.dateOfBirth}>
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
        </Field>
        <Field label="Department *" error={errors.department}>
          <select name="department" value={form.department} onChange={handleChange}>
            <option value="">-- Select --</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Salary *" error={errors.salary}>
          <input type="number" name="salary" min="0" step="0.01" value={form.salary} onChange={handleChange} />
        </Field>
        <Field label="Manager" error={errors.managerId}>
          <select name="managerId" value={form.managerId} onChange={handleChange}>
            <option value="">-- None --</option>
            {managerOptions.map((m) => (
              <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
            ))}
          </select>
        </Field>
        <button type="submit">{isEdit ? 'Update' : 'Save'}</button>
      </form>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {error && <span className="error">{error}</span>}
    </div>
  )
}
