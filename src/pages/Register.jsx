import React from "react";
import Logo from "../components/Logo";
import IlustrasiLogin from "../assets/IllustrasiLogin.png";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import {
  MdAlternateEmail,
  MdLockOutline,
  MdPersonOutline,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, first_name, last_name, password } = data;
    const { payload, meta } = await dispatch(
      registerUser({ email, first_name, last_name, password })
    );
    if (meta.requestStatus === "fulfilled") {
      toast(payload.message);
      navigate("/login", {
        replace: true,
      });
    } else {
      toast(payload.message);
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen justify-evenly">
      <div className="flex flex-col justify-center items-center gap-6">
        <Logo />
        <p className="text-[24px] font-semibold text-center">
          Lengkapi data untuk
          <br />
          membuat akun
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
            id="first_name"
            placeholder="nama depan"
            register={register}
            errors={errors}
            validationSchema={{
              required: "nama depan wajib diisi",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "nama depan tidak sesuai format",
              },
            }}
          >
            <MdPersonOutline />
          </Input>
          <Input
            id="last_name"
            placeholder="nama belakang"
            register={register}
            errors={errors}
            validationSchema={{
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "nama belakang tidak sesuai format",
              },
            }}
          >
            <MdPersonOutline />
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
          <Input
            id="confirmPassword"
            type="password"
            placeholder="konfirmasi password"
            register={register}
            errors={errors}
            validationSchema={{
              required: "konfirmasi password wajib diisi",
              minLength: {
                value: 8,
                message: "Please enter a minimum of 8 characters",
              },
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "password tidak sama";
                },
              },
            }}
          >
            <MdLockOutline />
          </Input>
          <Button label="Registrasi" onClick={() => {}} />
        </form>
        <p className="text-[12px] text-gray-500">
          sudah punya akun? login
          <a
            href="/login"
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

export default Register;
