import { useState } from "react";
import { loginUser, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);
  const { item_id } = useSelector((state) => state.booking);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isSuccess && user) {
      if (item_id && !user.isadmin) {
        navigate("/bookings/availability");
      } else if (user.isadmin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isSuccess, user]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      email,
      password,
    };

    dispatch(loginUser(dataToSubmit));
  };

  return (
    <div className="container">
      <h1 className="heading center">Login</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
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
        <p id="register">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
