import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className={classes.container}>
      <header>
        <p className={classes.header}>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            className={classes.emailInput}
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <Link className={classes.forgotPassword} to='/sign-in'>
            Sign in
          </Link>

          <div className={classes.signIn}>
            <div className={classes.signInText}>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
