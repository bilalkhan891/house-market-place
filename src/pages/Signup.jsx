import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

// https://firebase.google.com/docs/firestore/manage-data/add-data
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase.config.js";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { OAuth } from "../components/OAuth";

function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with Sign-Up!");
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
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
        <OAuth />

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default Signup; 