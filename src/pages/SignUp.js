import SignUpForm from "../components/signup/SignUpForm";
import "./Pages.css";
import LoginDetails from "../components/login/LoginDetails";

const SignUp = (props) => {
  return (
    <div className="login-page">
      <LoginDetails />
      <SignUpForm />
    </div>
  );
};
export default SignUp;
