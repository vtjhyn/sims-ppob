import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory } from "../store/slice/transactionSlice";
import dayjs from "dayjs";
import formatCurrency from "../utils/formatCurrency";

const Transaction = () => {
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.transaction.history.data);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [dataRecords, setDataRecords] = useState([]);

  useEffect(() => {
    dispatch(getTransactionHistory({ limit, offset }));
  }, [offset]);

  useEffect(() => {
    if (historyData !== null) {
      if (historyData?.records.length && offset === 0) {
        setDataRecords(historyData.records);
      } else {
        setDataRecords((prev) => [...prev, ...historyData?.records]);
      }
    }
  }, [historyData]);

  const handleShowMore = () => {
    if (historyData.records.length !== 0) {
      setOffset((prev) => prev + limit);
    }
  };

  return (
    <>
      <Header />
      <h1 className="font-semibold text-lg">Semua Transaksi</h1>
      <div className="w-full flex flex-col items-center gap-5 mt-[14px]">
        {dataRecords.map((record, index) => (
          <div
            className="w-full border-[1px] rounded-md flex flex-row justify-between px-5 pt-[10px] pb-[8px]"
            key={index}
          >
            <div>
              <div
                className={`tracking-wider text-[16px] font-semibold ${
                  record.transaction_type !== "TOPUP"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {record.transaction_type !== "TOPUP" ? "-" : "+"}
                {"Rp." + formatCurrency(record.total_amount)}
              </div>
              <p className="mt-[5px] text-[8px] font-light text-gray-400">
                {dayjs(record.created_on).format("DD MMMM YYYY")}
                <span className="ml-2">
                  {dayjs(record.created_on).format("HH:MM")} WIB
                </span>
              </p>
            </div>
            <p className="text-[9px] mt-1">{record.description}</p>
          </div>
        ))}
        <div
          className="mb-8 text-[12px] font-semibold text-[#f42619] cursor-pointer bg-gray-50"
          onClick={handleShowMore}
        >
          Show More
        </div>
      </div>
    </>
  );
};

export default Transaction;
