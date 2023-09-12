// src/ViewEmployeePage.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal"; 
import axios from 'axios';
function ViewEmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [showModal, setShowModal] = useState(false); 
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get('https://sweede.app/DeliveryBoy/Get-Employee');
        setEmployees(response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    }
    fetchEmployees();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`);
  
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };
  const filterEmployees = () => {
    const query = searchQuery.toLowerCase();
    const filtered = employees.filter((employee) => {
      // Customize this condition based on your search criteria
      return (
        employee.FirstName.toLowerCase().includes(query) ||
        employee.LastName.toLowerCase().includes(query)
      );
    });
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    filterEmployees();
  }, [searchQuery, employees]);

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };
  return (
    <div className="container py-5">
      <h1 className="heading  mb-5">Employee List</h1>
      <div className="text-end">
        <duv className="search-input">
        <input
        type="search"
        className="form-control"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
        </duv>
     
        <Link to='/add' className="btn add-btn">Add Employee</Link>
      </div>
      <div className="table-responsive"></div>
      <table className="table border hover cust-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Descrption</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                {employee.FirstName} {employee.LastName}
              </td>
              <td>{employee.DOB}</td>
              <td>{employee.StartDate}</td>
              <td>{employee.EndDate}</td>
              <td>
                <p>{employee.Description}</p>
                
                {/* <Link to={`/edit/${employee.id}`}>Edit</Link>
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button> */}
              </td>
              <td>
              <Dropdown className="table-dropdown">
                  <Dropdown.Toggle>
                    <svg
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#D5D5D5"
                      class="bi bi-three-dots-vertical"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>{" "}
                      </g>
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Link className="dropdown-item" onClick={() => openModal(employee)}>
                      <svg
                        fill="#7D7D7D"
                        viewBox="-3.5 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>view</title>{" "}
                          <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path>{" "}
                        </g>
                      </svg>{" "}
                      View
                    </Link>
                    <Link to={`/edit/${employee.id}`} className="dropdown-item">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                            fill="#7D7D7D"
                          ></path>
                        </g>
                      </svg>{" "}
                      Edit
                    </Link>
                    <Link className="dropdown-item" onClick={() => handleDelete(employee.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#7D7D7D"
                        viewBox="0 0 24 24"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                        </g>
                      </svg>{" "}
                      Delete
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={closeModal} className="employee-modal">
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <p><b>Name:</b>&nbsp;&nbsp;&nbsp; {`${selectedEmployee.FirstName} ${selectedEmployee.LastName}`}</p>
              <p><b>DOB:</b>&nbsp;&nbsp;&nbsp; {selectedEmployee.DOB}</p>
              <p><b>Study:</b>&nbsp;&nbsp;&nbsp; {selectedEmployee.Study}</p>
              <p><b>Start Date:</b>&nbsp;&nbsp;&nbsp; {selectedEmployee.StartDate}</p>
              <p><b>End Date:</b>&nbsp;&nbsp;&nbsp; {selectedEmployee.EndDate}</p>
              <p><b>Current Salary:</b>&nbsp;&nbsp;&nbsp; {selectedEmployee.CurrentSalary}</p>
              <p><b>Description:</b>&nbsp;&nbsp;&nbsp; {selectedEmployee.Description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewEmployeePage;
