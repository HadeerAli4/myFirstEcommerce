import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ADD_USER, API } from "../api/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerUserSuccess } from "../store/slices/userSlice";


export default function Register() {
  const go = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    city: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await API.post(ADD_USER, formData);
      const user = response.data;

       dispatch(registerUserSuccess(user)); 
      
      toast.success("Registration Successful!");
      go("/");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>Welcome to Register Page</h2>
      <br />
      <Form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">🔒</span>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <FormControl type="file" accept="image/*" />
        </div>

        <div className="col-12">
          <button className="btn btn-success w-25" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
          <Link to="/" className="btn btn-link ms-2">Already have an account?</Link>
        </div>
      </Form>

    </>
  );
}
