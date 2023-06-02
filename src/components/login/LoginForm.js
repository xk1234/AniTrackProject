import "./LoginForm.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../app/supabaseClient";
import { showMessage, hideMessage } from "../../app/messageSlice";
import { useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      //send request to server
      async function signInWithEmail() {
        const { user, session, error } = await supabase.auth.signIn({
          email: email,
          password: password
        });
        if (!error) {
          //login successful, store user data in store
          dispatch(
            login({
              user_id: user.user_id,
              access_token: session.access_token,
              email: user.email,
              expiry_date: session.expires_at * 1000
            })
          );
          localStorage.setItem("user_id", user.user_id);
          localStorage.setItem("email", user.email);
          localStorage.setItem("access_token", session.access_token);
          localStorage.setItem("expiry_date", session.expires_at * 1000);
          //navigate back to dashboard
          dispatch(
            showMessage({
              message: `Welcome ${email}`,
              status: "success"
            })
          );
          setTimeout(() => {
            dispatch(hideMessage());
          }, 3000);
          navigate("/dashboard", { replace: true });
        } else {
          console.log(error);
          dispatch(
            showMessage({
              message:
                "Invalid username or password. No Account? Click Here to Sign Up",
              status: "error",
              link: "/sign-up"
            })
          );
          setTimeout(() => {
            dispatch(hideMessage());
          }, 3000);
        }
      }
      signInWithEmail();
    }
  };

  return (
    <form onSubmit={loginHandler} className="login-form">
      <h1>Login</h1>
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
      <div className="login-links">
        <Link to="/sign-up">Sign Up</Link>
        <Link to="#">Forgot Password</Link>
      </div>
      <button type="submit" className="login-submit">
        Sign In
      </button>
    </form>
  );
};
export default LoginForm;
