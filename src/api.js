// All calls to the Spring Boot backend live here
const BASE_URL = 'http://localhost:8080/api'

async function request(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = res.status === 204 ? null : await res.json()
  if (!res.ok) {
    // Backend sends { message, errors: { field: msg } }
    const error = new Error(data?.message || 'Request failed')
    error.fieldErrors = data?.errors || {}
    throw error
  }
  return data
}

export const getEmployees = () => request('/employees')
export const getEmployee = (id) => request(`/employees/${id}`)
export const getDepartments = () => request('/departments')
export const createEmployee = (emp) =>
  request('/employees', { method: 'POST', body: JSON.stringify(emp) })
export const updateEmployee = (id, emp) =>
  request(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(emp) })
