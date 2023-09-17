import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFieldVisibility } from "../store/slice/visibilitySlice";
import BackgroundSaldo from "../assets/BackgroundSaldo.png";
import ProfilePhoto from "../assets/ProfilePhoto.png";
import { getBalance } from "../store/slice/transactionSlice";
import formatCurrency from "../utils/formatCurrency";

const Header = () => {
  const dispatch = useDispatch();
  const itemVisible = useSelector(
    (state) => state.visibilitySlice.itemVisible["balance"]
  );
  const profileData = useSelector((state) => state.profile.data);
  const balance = useSelector((state) => state.transaction.balance.data);

  useEffect(() => {
    dispatch(getBalance());
  }, []);

  const handleVisibility = () => {
    dispatch(toggleFieldVisibility({ fieldId: "balance" }));
  };

  const formattedSaldo = useMemo(() => formatCurrency(balance), [balance]);

  return (
    <div className="flex flex-row justify-between items-center mb-[48px]">
      <div>
        <img
          src={
            !profileData?.profile_image.split("/").includes("null")
              ? profileData?.profile_image
              : ProfilePhoto
          }
          alt="Profil Picture"
          width={62}
        />
        <div className="mt-[19px] flex flex-col justify-center">
          <p className="text-[18px]">Selamat datang,</p>
          <h1 className="font-semibold text-[28.5px] mt-[-3px]">
            {profileData?.first_name} {profileData?.last_name}
          </h1>
        </div>
      </div>
      <div className="relative">
        <img src={BackgroundSaldo} alt="Background Balance" width={595} />
        <div className="absolute top-[23px] left-[22px] text-white">
          <p className="text-sm">Saldo anda</p>
          <div className="flex flex-row mt-[2px] font-semibold text-[28px] items-center">
            Rp
            <div className="ml-1 font-bold text-[34px] tracking-wide balance">
              {itemVisible ? formattedSaldo : "•••••••"}
            </div>
          </div>
          <div
            className="w-20 text-[10.5px] tracking-wide mt-[8px] hover:cursor-pointer"
            onClick={handleVisibility}
          >
            Lihat Saldo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
