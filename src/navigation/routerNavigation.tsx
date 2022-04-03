import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import { PAGE_HOME, PAGE_SIGIN, PAGE_SIGNUP, PAGE_PROFILE, PAGE_LOGOUT } from "../config/constants";
import Home from "../screens/home";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";
import Profile from "../screens/profile";
import NotFound from "../screens/notFound";
import LogOut from "../screens/logOut";

const RouterConfig = (): JSX.Element => {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={PAGE_HOME} element={<Home />} />
        <Route path={PAGE_SIGIN} element={<SignIn />} />
        <Route path={PAGE_SIGNUP} element={<SignUp />} />
        <Route path={PAGE_PROFILE} element={<Profile />} />
        <Route path={PAGE_LOGOUT}  element={<LogOut />} />
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  )
};

export default RouterConfig;
