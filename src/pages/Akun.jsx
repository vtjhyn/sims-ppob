import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { MdAlternateEmail, MdPersonOutline } from "react-icons/md";
import Button from "../components/Button";
import ProfilePhoto from "../assets/ProfilePhoto.png";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidPencil } from "react-icons/bi";
import { updateProfileImage } from "../store/slice/profileSlice";
import { useNavigate } from "react-router-dom";

const Akun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data: profileData } = useSelector(
    (state) => state.profile
  );
  const [currentState, setCurrentState] = useState("view");

  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: profileData?.email,
      first_name: profileData?.first_name,
      last_name: profileData?.last_name,
    },
    values: profileData,
  });


  const imageSubmit = async (event) => {
    const imageFile = event.target.files[0];

    if (imageFile.size <= 100 * 1024) {
      const { payload, meta } = await dispatch(updateProfileImage(imageFile));
      localStorage.removeItem("user");
    } else {
      alert("Ukuran file terlalu besar. Maksimum 100KB diizinkan");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem('token')
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <label htmlFor="image" className="relative cursor-pointer">
          <img
            src={
              !profileData?.profile_image.split("/").includes("null")
                ? profileData?.profile_image
                : ProfilePhoto
            }
            alt="Profile Photo"
            className="h-[120px] w-[120px]"
          />
          <span className="absolute right-0 bottom-0 border rounded-full p-[6px] bg-white">
            <BiSolidPencil />
          </span>
        </label>
        <input
          id="image"
          type="file"
          accept=".jpeg, .png"
          onChange={(e) => imageSubmit(e)}
          style={{ display: "none" }}
        />
        <div className="font-semibold text-[22px]">
          {profileData?.first_name} {profileData?.last_name}
        </div>
        <div className="w-[500px] flex flex-col gap-y-5">
          <Input
            id="email"
            label="Email"
            disabled={currentState === "view"}
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
            label="Nama Depan"
            placeholder="nama depan"
            disabled={currentState === "view"}
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
            label="Nama Belakang"
            placeholder="nama belakang"
            disabled={currentState === "view"}
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
          <Button
            label="Edit Profile"
            onClick={() => navigate("/editprofile")}
          />
          <Button
            type="button"
            label="Logout"
            onClick={handleLogout}
            bg="bg-white border text-[#f42619] border-[#f42619]"
          />
        </div>
      </div>
    </>
  );
};

export default Akun;
