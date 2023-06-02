import "./SignUpForm.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
import { supabase } from "../../app/supabaseClient";

const SignUpForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    //validate on client side email and pw
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const emailValid = email.length > 0;
    const pwValid = password.length > 0;
    if (!emailValid) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
    if (!pwValid) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }

    //complete validation
    if (emailValid && pwValid) {
      //create user
      async function signUp() {
        const { user, session, error } = await supabase.auth.signUp({
          email: email,
          password: password
        });
        if (!error) {
          //login successful, store user data in store
          dispatch(
            login({
              user_id: user.user_id,
              access_token: session.access_token,
              email: user.email
            })
          );
          //navigate back to dashboard
          navigate("/dashboard", { replace: true });
        } else {
          console.log(error);
        }
      }
      signUp();
    }
  };

  return (
    <form onSubmit={loginHandler} className="signup-form">
      <h1>Sign Up</h1>
      <div className={emailValid ? "form-control" : "form-control invalid"}>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} type="email" id="email" name="email" />
      </div>
      <div className={passwordValid ? "form-control" : "form-control invalid"}>
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
        />
      </div>
      <div className="signup-links">
        <Link to="/login">Login</Link>
        <Link to="#">Forgot Password</Link>
      </div>
      <button type="submit" className="signup-submit">
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;
