# Employee Management – Frontend

React (Vite) + React Router UI for the Employee Management API.
Backend: https://github.com/mzhbuilds/employee-management-be (must be running on http://localhost:8080)

## Run
```bash
npm install
npm run dev
```
Open http://localhost:5173 (Node.js 20.19+).

## Pages
- **Add Employee** (`/add`): First Name, Last Name, Date of Birth, Department, Salary, Manager (optional)
- **Employee Listing** (`/employees`): grid with View and Edit links
- **View** (`/employees/:id`) and **Edit** (`/employees/:id/edit`, same form as Add)

## Structure
```
src/api.js          fetch calls to the backend
src/App.jsx         navigation + routes
src/pages/          EmployeeForm, EmployeeList, EmployeeView
```
