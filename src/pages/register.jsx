import { useState } from "react";
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
    city: "",
    image: null 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const dataToSend = new FormData();
      dataToSend.append("firstName", formData.firstName);
      dataToSend.append("lastName", formData.lastName);
      dataToSend.append("username", formData.username);
      dataToSend.append("password", formData.password);
      dataToSend.append("city", formData.city);
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }

     
      const response = await API.post(ADD_USER, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
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
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="firstName" className="form-label">First name</label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="username" className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text">@</span>
            <input
              id="username"
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
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">🔒</span>
            <input
              id="password"
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
          <label htmlFor="city" className="form-label">City</label>
          <input
            id="city"
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="image" className="form-label">Profile Image</label>
          <input 
            id="image"
            type="file" 
            className="form-control" 
            name="image" 
            accept="image/*" 
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-success w-25" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
          <Link to="/" className="btn btn-link ms-2">Already have an account?</Link>
        </div>
      </form>
    </>
  );
}
