import { useState } from "react";
import { registerAndLoginUser } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import validator from "validator";
import "./register.scss";

const formErrors = {
  INVALID_EMAIL: 1,
  SHORT_PASSWORD: 2,
  EMPTY_FIELD: 3,
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = formData;

  useEffect(() => {
    if (isSuccess && location.state) {
      const { from, bookings } = location?.state;

      from === "/bookings"
        ? navigate(from + "/availability", { state: bookings })
        : navigate("/");
    } else if (isSuccess) {
      navigate("/");
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

    if (!(first_name && last_name && email && password)) {
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
      first_name,
      last_name,
      email,
      password,
    };

    dispatch(registerAndLoginUser(dataToSubmit));
  };

  return (
    <div className="container">
      <h1 className="heading center">Register</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="first_name">First Name</label>
            <input
              className={`${
                formError === formErrors.EMPTY_FIELD &&
                !first_name &&
                "error-form"
              }`}
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
              className={`${
                formError === formErrors.EMPTY_FIELD &&
                !last_name &&
                "error-form"
              }`}
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

          {formError === formErrors.EMPTY_FIELD && <p className="error-message">Please fill out all fields</p>}

          <button type="submit">Register</button>
        </form>

        <p id="login">
         Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
