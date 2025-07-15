import { useState } from "react";
import { loginUser } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { useEffect } from "react";
import { formErrors } from "../../config/formErrors";
import "./login.scss";
import "../Register/register.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
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

    if (!(email && password)) {
      setFormError(formErrors.EMPTY_FIELD);
      return;
    } else if (!validator.isEmail(email)) {
      setFormError(formErrors.INVALID_EMAIL);
      return;
    } else if (password.length < 8) {
      setFormError(formErrors.SHORT_PASSWORD);
      return;
    }

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
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              className={`${
                formError === formErrors.INVALID_EMAIL ||
                (formError === formErrors.EMPTY_FIELD && !email && "error-form")
              }`}
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
            />
            {formError === formErrors.INVALID_EMAIL && (
              <p className="error-message">Invalid email</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              className={`${
                formError === formErrors.SHORT_PASSWORD ||
                (formError === formErrors.EMPTY_FIELD &&
                  !password &&
                  "error-form")
              }`}
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
            {formError === formErrors.SHORT_PASSWORD && (
              <p className="error-message">
                Password has to be at least 8 characters
              </p>
            )}
          </div>

          {formError === formErrors.EMPTY_FIELD && (
            <p className="error-message">Please fill out all fields</p>
          )}

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
