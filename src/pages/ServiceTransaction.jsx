import React from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { PiCalculator } from "react-icons/pi";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { getBalance, newTransaction } from "../store/slice/transactionSlice";
import { useLocation, useSearchParams } from "react-router-dom";

const ServiceTransaction = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      total_amount: location.state?.service_tariff,
    },
    values: location.state,
  });
  const [searchParams] = useSearchParams();

  const onSubmit = async () => {
    const responseTransaction = await dispatch(
      newTransaction({ service_code: searchParams.get("service_code") })
    );
    await dispatch(getBalance());
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p className="text-lg -mt-1">Pembayaran</p>
          <h1 className="font-semibold text-[28px] tracking-wide -mt-1">
            {location.state.service_name}
          </h1>
        </div>
        <div className="flex flex-row gap-x-6">
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="w-[60%] flex flex-col gap-y-8"
          >
            <Input
              id="total_amount"
              placeholder="masukkan nominal Top Up"
              register={register}
              errors={errors}
              validationSchema={{
                required: "nominal wajib diisi",
                pattern: {
                  value: /^\d+$/,
                  message: "gunakan format angka",
                },
              }}
            >
              <PiCalculator />
            </Input>
            <Button label="Bayar" onClick={() => {}} />
          </form>
          <div className="w-[40%] grid grid-cols-3 gap-y-6 gap-x-4 text-center"></div>
        </div>
      </div>
    </>
  );
};

export default ServiceTransaction;
