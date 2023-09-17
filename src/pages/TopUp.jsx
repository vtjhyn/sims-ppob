import React from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { PiCalculator } from "react-icons/pi";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { getBalance, newTopUp } from "../store/slice/transactionSlice";
import formatCurrency from "../utils/formatCurrency";

const nominal = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUp = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      top_up_amount: null,
    },
  });

  const onSubmit = async (data) => {
    const { top_up_amount } = data;
    const { payload, meta } = await dispatch(newTopUp({ top_up_amount }));
    await dispatch(getBalance());
  };

  const handleClickNominal = (num) => {
    setValue("top_up_amount", num);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p className="text-lg -mt-1">SIlahkan masukan</p>
          <h1 className="font-semibold text-[28px] tracking-wide -mt-1">
            Nominal Top Up
          </h1>
        </div>
        <div className="flex flex-row gap-x-6">
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="w-[60%] flex flex-col gap-y-8"
          >
            <Input
              id="top_up_amount"
              placeholder="masukkan nominal Top Up"
              register={register}
              errors={errors}
              validationSchema={{
                required: "nominal wajib diisi",
                pattern: {
                  value: /^\d+$/,
                  message: "gunakan format angka",
                },
                min: {
                  value: 10000,
                  message: "minimum top up Rp 10.000",
                },
                max: {
                  value: 1000000,
                  message: "maksimum top up Rp 1.000.000",
                }
              }}
            >
              <PiCalculator />
            </Input>
            <Button
              disabled={watch("top_up_amount") === null}
              label="Top Up"
              onClick={() => {}}
            />
          </form>
          <div className="w-[40%] grid grid-cols-3 gap-y-6 gap-x-4 text-center">
            {nominal.map((item) => (
              <Button
                onClick={() => handleClickNominal(item)}
                label={"Rp" + formatCurrency(item)}
                bg="text-gray-500 bg-white border focus:border-black focus:text-black"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUp;
