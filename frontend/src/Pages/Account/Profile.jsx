import { useState, useEffect } from "react";
import "./profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import validator from "validator";
import { formErrors } from "../../config/formErrors";

const Profile = () => {
  const { user, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [change, setChange] = useState(0);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isError) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
      setFormError(null);
    } else if (isError && message.message.includes("Incorrect password") && newPassword !== "") {
      setFormError(formErrors.INCORRECT_PASSWORD);
    }
  }, [change, isLoading]);

  const ChangeButtons = (props) => {
    const { formNumber } = props;

    const handleCancel = () => {
      setChange(0);
      setFormError(null);
      switch (formNumber) {
        case 1:
          setFirstName(user.first_name);
          break;
        case 2:
          setLastName(user.last_name);
          break;
        case 3:
          setEmail(user.email);
          break;
        case 4:
          setNewPassword("");
          setOldPassword("");
          setConfirmPassword("");
          break;
      }
    };

    const handleConfirm = () => {
      switch (formNumber) {
        case 1:
          dispatch(updateUser({ first_name: firstName }));
          setChange(0);
          break;
        case 2:
          dispatch(updateUser({ last_name: lastName }));
          setChange(0);
          break;
        case 3:
          if (validator.isEmail(email)) {
            dispatch(updateUser({ email: email }));
            setChange(0);
          } else {
            setFormError(formErrors.INVALID_EMAIL);
          }
          break;
        case 4:
          if (newPassword === confirmPassword) {
            dispatch(
              updateUser({ password: newPassword, oldPassword: oldPassword })
            );
          } else {
            setFormError(formErrors.NON_MATCHING_PASSWORD);
          }
          break;
      }
    };

    return (
      <div
        className={`change-buttons ${
          change === formNumber ? "show" : "hidden"
        }`}
      >
        <button className="confirm change" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="cancel change" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="account-profile-container">
      <div className="title">
        <h1>Profile</h1>
        <p>
          <small>Information of your account</small>
        </p>
      </div>

      <div className="account-info">
        <label>First Name</label>
        <div className="form">
          <input
            value={firstName}
            disabled={change !== 1}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <button
            className={`change ${change !== 1 ? "show" : "hidden"}`}
            onClick={() => setChange(1)}
          >
            Change
          </button>
          <ChangeButtons formNumber={1} />
        </div>
      </div>
      <div className="account-info">
        <label>Last Name</label>
        <div className="form">
          <input
            value={lastName}
            disabled={change !== 2}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button
            className={`change ${change !== 2 ? "show" : "hidden"}`}
            onClick={() => setChange(2)}
          >
            Change
          </button>
          <ChangeButtons formNumber={2} />
        </div>
      </div>
      <div className="account-info">
        <label>Email</label>
        <div className="form">
          <input
            value={email}
            disabled={change !== 3}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p
            className={`error-message ${
              formError === formErrors.INVALID_EMAIL ? "show" : "hidden"
            }`}
          >
            Please enter a valid email
          </p>
          <button
            className={`change ${change !== 3 ? "show" : "hidden"}`}
            onClick={() => setChange(3)}
          >
            Change
          </button>
          <ChangeButtons formNumber={3} />
        </div>
      </div>
      <div className="account-info">
        <div className="form">
          <div
            className={`change-password ${change === 4 ? "show" : "hidden"}`}
          >
            <label>Old Password</label>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <p
              className={`error-message ${
                formError === formErrors.INCORRECT_PASSWORD ? "show" : "hidden"
              }`}
            >
              Incorrect password
            </p>
            <label>New Password</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>New Password (again)</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p
              className={`error-message ${
                formError === formErrors.NON_MATCHING_PASSWORD
                  ? "show"
                  : "hidden"
              }`}
            >
              Passwords do not match
            </p>
          </div>
          <button
            className={`change ${change !== 4 ? "show" : "hidden"}`}
            onClick={() => setChange(4)}
          >
            Change password
          </button>
          <ChangeButtons formNumber={4} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
