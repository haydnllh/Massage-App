import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = formData;

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="heading center">Register</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={first_name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={last_name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
