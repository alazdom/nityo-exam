import { useState, useEffect } from "react";
import AddAccountForm from "../add-user-form/AddAccountForm";
import EditAccountForm from "../edit-user/EditAccountForm";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import "./EmployeeTable.css";

const EmployeeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [sorting, setSorting] = useState({
    name: "",
    username: "",
    country: "",
    email: "",
    accountType: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployeeClick = () => {
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
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
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery) ||
      employee.lastName.toLowerCase().includes(searchQuery) ||
      employee.username.toLowerCase().includes(searchQuery)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const sortEmployees = (employees, sorting) => {
    const sortedEmployees = [...employees];
    Object.keys(sorting).forEach((key) => {
      if (sorting[key] !== "") {
        sortedEmployees.sort((a, b) => {
          if (key === "name") {
            const fullNameA = a.firstName + " " + a.lastName;
            const fullNameB = b.firstName + " " + b.lastName;
            return sorting[key] === "asc"
              ? fullNameA.localeCompare(fullNameB)
              : fullNameB.localeCompare(fullNameA);
          } else {
            if (a[key] < b[key]) {
              return sorting[key] === "asc" ? -1 : 1;
            }
            if (a[key] > b[key]) {
              return sorting[key] === "asc" ? 1 : -1;
            }
            return 0;
          }
        });
      }
    });
    return sortedEmployees;
  };

  const requestSort = (column) => {
    let direction = "asc";
    if (sorting[column] === "asc") {
      direction = "desc";
    } else if (sorting[column] === "desc") {
      direction = ""; // Reset to default if already descending
    }
    setSorting((prevSorting) => ({
      ...prevSorting,
      [column]: direction,
    }));
  };

  return (
    <div>
      {!showForm ? (
        <div className="employee-table">
          <h2>
            <span className="employee-text">Employee</span>{" "}
            <span className="records-text">Records</span>
          </h2>
          <div className="table-header">
            <button
              className="add-employee-btn"
              onClick={handleAddEmployeeClick}
            >
              + ADD EMPLOYEE
            </button>
          </div>
          <div className="table-container">
            <div className="search-pagination-container">
              <div className="search-container">
                <label className="search-label">Search</label>
                <input
                  type="text"
                  className="search-box"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="entries-selector">
                <label className="entries-label">Show</label>
                <select
                  className="entries-dropdown"
                  value={employeesPerPage}
                  onChange={(e) => {
                    setEmployeesPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to the first page on entries change
                  }}
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
                <label className="entries-label">entries</label>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>PHOTO</th>
                  <th
                    onClick={() => requestSort("name")}
                    className={sorting.name ? sorting.name : ""}
                  >
                    NAME
                    <span className="sort-arrows">
                      <span
                        className={`sort-arrow asc ${
                          sorting.name === "asc" ? "active" : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`sort-arrow desc ${
                          sorting.name === "desc" ? "active" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  </th>
                  <th
                    onClick={() => requestSort("username")}
                    className={sorting.username ? sorting.username : ""}
                  >
                    USERNAME
                    <span className="sort-arrows">
                      <span
                        className={`sort-arrow asc ${
                          sorting.username === "asc" ? "active" : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`sort-arrow desc ${
                          sorting.username === "desc" ? "active" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  </th>
                  <th
                    onClick={() => requestSort("country")}
                    className={sorting.country ? sorting.country : ""}
                  >
                    COUNTRY
                    <span className="sort-arrows">
                      <span
                        className={`sort-arrow asc ${
                          sorting.country === "asc" ? "active" : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`sort-arrow desc ${
                          sorting.country === "desc" ? "active" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  </th>
                  <th
                    onClick={() => requestSort("email")}
                    className={sorting.email ? sorting.email : ""}
                  >
                    EMAIL
                    <span className="sort-arrows">
                      <span
                        className={`sort-arrow asc ${
                          sorting.email === "asc" ? "active" : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`sort-arrow desc ${
                          sorting.email === "desc" ? "active" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  </th>
                  <th
                    onClick={() => requestSort("accountType")}
                    className={sorting.accountType ? sorting.accountType : ""}
                  >
                    ACCOUNT TYPE
                    <span className="sort-arrows">
                      <span
                        className={`sort-arrow asc ${
                          sorting.accountType === "asc" ? "active" : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`sort-arrow desc ${
                          sorting.accountType === "desc" ? "active" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  </th>

                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {sortEmployees(currentEmployees, sorting).map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <img
                        src={employee.photo}
                        alt=""
                        className="employee-photo"
                      />
                    </td>
                    <td>
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td>{employee.username}</td>
                    <td>{employee.country}</td>
                    <td>{employee.email}</td>
                    <td>{employee.accountType}</td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(employee)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
