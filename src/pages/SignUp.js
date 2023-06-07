import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { userName, email, password } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: userName,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <header>
          <p className={classes.header}>Welcome back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              className={classes.nameInput}
              placeholder='Name'
              id='userName'
              value={userName}
              onChange={onChange}
            />
            <input
              type='email'
              className={classes.emailInput}
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className={classes.passwordDiv}>
              <input
                type={showPassword ? "text" : "password"}
                className={classes.passwordInput}
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt='Show password'
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={classes.showPassword}
              />
            </div>
            <Link to='/forgot-password' className={classes.forgotPassword}>
              Forgot password?
            </Link>
            <div className={classes.signUp}>
              <p className={classes.text}>Sign up</p>
              <button className={classes.btn}>
                <ArrowRightIcon fill='#ffffff' width='44px' height='44px' />
              </button>
            </div>
          </form>
          <OAuth />
          <Link to='/sign-in' className={classes.register}>
            {" "}
            Sign in
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
