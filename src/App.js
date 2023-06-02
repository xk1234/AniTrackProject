import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./styles.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import { supabase } from "./app/supabaseClient";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./app/authSlice";

import Navbar from "./components/navbar/Navbar";
import Message from "./components/ui/Message";
import { useSelector } from "react-redux";
export default function App() {
  const showmsg = useSelector((state) => state.message.message);
  const status = useSelector((state) => state.message.status);
  const link = useSelector((state) => state.message.link);
  const isLoggedIn = useSelector((state) => state.auth.access_token);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    async function tryLogin() {
      if (localStorage.getItem("access_token")) {
        const { user, error } = await supabase.auth.api.getUser(
          localStorage.getItem("access_token")
        );
        if (
          localStorage.getItem("expiry_date") > new Date().getTime() &&
          user
        ) {
          dispatch(
            login({
              email: user.email,
              user_id: user.id,
              access_token: localStorage.getItem("access_token"),
              expiry_date: localStorage.getItem("expiry_date")
            })
          );
          navigate("/dashboard", { replace: true });
        } else {
          localStorage.clear();
        }
      }
    }
    tryLogin();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className="content">
        {showmsg ? (
          <Message message={showmsg} status={status} link={link} />
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:mediaId" element={<Detail />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/detail/:mediaId" element={<Detail />} />

            <Route path="*" element={<HomePage />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}
