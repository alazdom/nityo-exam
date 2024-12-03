import { useState, useEffect } from 'react';
import AddAccountForm from '../add-user-form/AddAccountForm';
import EditAccountForm from '../edit-user/EditAccountForm';
import './EmployeeTable.css';
import axios from 'axios';

const EmployeeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // Track the employee being edited
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployeeClick = () => {
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee); // Set the employee being edited
    setIsEditing(true);
    setShowForm(true);
  };

  const updateEmployee = (updatedData) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedData.id ? updatedData : emp
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      {!showForm ? (
        <div className="employee-table">
          <h2>Employee: Records</h2>
          <button className="add-employee-btn" onClick={handleAddEmployeeClick}>
            + ADD EMPLOYEE
          </button>
          <input type="text" className="search-box" placeholder="Search" />
          <table>
            <thead>
              <tr>
                <th>PHOTO</th>
                <th>NAME</th>
                <th>USERNAME</th>
                <th>COUNTRY</th>
                <th>EMAIL</th>
                <th>ACCOUNT TYPE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <img
                      src={employee.photo}
                      alt=""
                      className="employee-photo"
                    />
                  </td>
                  <td>{employee.firstName} {employee.lastName}</td>
                  <td>{employee.username}</td>
                  <td>{employee.country}</td>
                  <td>{employee.email}</td>
                  <td>{employee.accountType}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(employee)}
                    >
                      ✎
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(employee.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : isEditing ? (
        <EditAccountForm
          employeeData={editingEmployee}
          setShowForm={setShowForm}
          updateEmployee={updateEmployee}
        />
      ) : (
        <AddAccountForm setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default EmployeeTable;
