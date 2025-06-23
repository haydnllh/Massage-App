import { useState } from "react";
import { registerUser, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(reset());
    }
  }, [isSuccess, user, dispatchEvent, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      first_name,
      last_name,
      email,
      password,
    };

    dispatch(registerUser(dataToSubmit));
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
              name="first_name"
              id="first_name"
              value={first_name}
              onChange={handleChange}
              autoComplete="first_name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              name="last_name"
              id="last_name"
              value={last_name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
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
