import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditEmployeePage() {
      const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    DOB: '',
    Study: '',
    StartDate: '',
    EndDate: '',
    CurrentSalary: '',
    Description: '',
  });

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await axios.get(`https://sweede.app/DeliveryBoy/update-Employee/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployee();
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`https://sweede.app/DeliveryBoy/update-Employee/${id}`, formData);
        console.log('updated successfully.');
        navigate('/view');
      } catch (error) {
        console.error(`Error updating employee with ID ${id}:`, error);
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
                  id="FirstName"
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
                  id="LastName"
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
                  id="DOB"
                  name="DOB"
                  className="form-control"
                  value={formData.DOB}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-5">
                <label>Study</label>
                <select
                 id="Study"
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
                  id="StartDate"
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
                  id="EndDate"
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
                  id="CurrentSalary"
                  name="CurrentSalary"
                  placeholder="Enter your salary"
                  className="form-control"
                  value={formData.CurrentSalary}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-5">
                <label>Description</label>
                <textarea className="form-control" id="Description" name="Description" placeholder="description"  value={formData.Description}
                  onChange={handleInputChange}></textarea>
              </div>
            </div>
            <div className=" d-flex align-item-center justify-content-center">
            <button type="button" className="btn cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn submit-btn">
              Update Employee
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeePage;
