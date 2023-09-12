import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployeePage() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DOB: "",
    Study: "",
    StartDate: "",
    EndDate: "",
    CurrentSalary: "",
    Description: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://sweede.app/DeliveryBoy/Add-Employee/",
        formData
      );
      console.log("API Response:", response.data);
      setFormData({
        FirstName: "",
        LastName: "",
        DOB: "",
        Study: "",
        StartDate: "",
        EndDate: "",
        CurrentSalary: "",
        Description: "",
      });
      navigate('/view');
    } catch (error) {
      // Handle errors here (e.g., display an error message)
      console.error("API Error:", error);
    }
  };
  return (
    <div className="container py-5">
      <h1 className="heading text-center mb-5">Employee Registration form</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="card custom-card p-5">
            <div className="row">
              <div className="col-md-6 mb-5">
                <label>First Name*</label>
                <input
                  type="text"
                  name="FirstName"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-5">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="LastName"
                  placeholder="Enter your last name"
                  className="form-control"
                  value={formData.LastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-5">
                <label>DOB</label>
                <input
                  type="date"
                  name="DOB"
                  className="form-control"
                  value={formData.DOB}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-5">
                <label>Study</label>
                <select
                  name="Study"
                  value={formData.Study}
                  className="form-control"
                  onChange={handleInputChange}
                >
                  <option value="">Select Study</option>
                  <option value="BCA">Computer Science</option>
                  <option value="BSC">Engineering</option>
                </select>
              </div>
              <div className="col-md-6 mb-5">
                <label>Start Date</label>
                <input
                  type="date"
                  name="StartDate"
                  className="form-control "
                  value={formData.StartDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-5">
                <label>End Date</label>
                <input
                  type="date"
                  name="EndDate"
                  className="form-control"
                  value={formData.EndDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-5">
                <label>Current Salary</label>
                <input
                  type="text"
                  name="CurrentSalary"
                  placeholder="Enter your salary"
                  className="form-control"
                  value={formData.CurrentSalary}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-5">
                <label>Description</label>
                <textarea
                  class="form-control"
                  name="Description"
                  placeholder="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className=" d-flex align-item-center justify-content-center">
              <button type="button" className="btn cancel-btn">
                Cancel
              </button>
              <button type="submit" className="btn submit-btn">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeePage;
