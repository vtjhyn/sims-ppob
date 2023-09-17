import React, { useEffect } from "react";
import Container from "./Container";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getProfileData,
  setProfileDataFromLocalStorage,
} from "../store/slice/profileSlice";
import { sessionGet } from "../utils/session";
import Toaster from "./Toaster";
import toast from "react-hot-toast";

const Layout = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionGet('token')) {
      toast("Sesi Anda telah berakhir.")
      navigate("/login", {
        replace: true,
      });
    }
    if (!localStorage.getItem("user")) {
      dispatch(getProfileData());
    } else {
      dispatch(setProfileDataFromLocalStorage());
    }
  }, [sessionGet('token')]);

  return (
    <div>
      <Navbar />
      <Container>
        <div className="mt-[84px]">
          <Outlet />
        </div>
      </Container>
      <Toaster />
    </div>
  );
};

export default Layout;
