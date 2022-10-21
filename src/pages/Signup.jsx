import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form>
          <input
            type="text"
            placeholder="Name"
            value={email}
            onChange={onChange}
            className="nameInput"
            id="name"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="emailInput"
            id="email"
          />

          <div className="passwordInputDiv">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              className="passwordInput"
              onChange={onChange}
              value={password}
              id="password"
            />

            <img
              src={visibilityIcon}
              alt="Show Password"
              className="showPassword"
              onClick={() => setShowPwd((prevState) => !prevState)}
            />

            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" height="36" width="36" />{" "}
              </button>
            </div>
          </div>
        </form>
        {/* Google OAuth */}

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default Signup;
