import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
     toast.error('Bad User Credentials')
    }
  };
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? "text" : "password"}
                className='passwordInput'
                placeholder='password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt='Show password'
                onClick={() => setShowPassword((prevState) => !prevState)}
                className='showPassword'
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot password?
            </Link>
            <div className='signInBar'>
              <p className='signInText'>Sign in</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffffff' width='44px' height='44px' />
              </button>
            </div>
          </form>
          <OAuth/>
          <Link to='/sign-up' className='registerLink'>
            {" "}
            Sign Up instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
