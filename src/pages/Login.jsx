import React, { useEffect } from "react";
import Logo from "../components/Logo";
import IlustrasiLogin from "../assets/IllustrasiLogin.png";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { sessionGet } from "../utils/session";
import toast from "react-hot-toast";
import Toaster from "../components/Toaster";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (sessionGet('token')) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    const { payload, meta } = await dispatch(loginUser(data));
    if (meta.requestStatus === "fulfilled") {
      toast.success("Login berhasil")
      navigate("/", {
        replace: true,
      });
    } else {
      toast.error("<<< login failed");
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen justify-evenly">
      <div className="flex flex-col justify-center items-center gap-6">
        <Logo />
        <p className="text-[24px] font-semibold text-center">
          Masuk atau buat akun
          <br />
          untuk memulai
        </p>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="w-[400px] flex flex-col gap-y-6 mb-2"
        >
          <Input
            id="email"
            placeholder="masukkan email anda"
            register={register}
            errors={errors}
            validationSchema={{
              required: "email wajib diisi",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "email tidak sesuai format",
              },
            }}
          >
            <MdAlternateEmail />
          </Input>
          <Input
            id="password"
            type="password"
            placeholder="buat password"
            register={register}
            errors={errors}
            validationSchema={{
              required: "password wajib diisi",
              minLength: {
                value: 8,
                message: "Please enter a minimum of 8 characters",
              },
            }}
          >
            <MdLockOutline />
          </Input>
          <Button label="Login" onClick={() => {}} />
        </form>
        <p className="text-[12px] text-gray-500">
          belum punya akun? registrasi
          <a
            href="/registrasi"
            className="text-[#f42619] font-extrabold cursor-pointer hover:underline"
          >
            {" "}
            di sini
          </a>
        </p>
      </div>
      <div>
        <img
          src={IlustrasiLogin}
          alt="Ilustrasi Login"
          className="h-full right-0"
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
