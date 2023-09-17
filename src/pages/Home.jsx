import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { bannerData, serviceData } from "../store/slice/assetsSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: banners, isLoading: isLoadingBanner } = useSelector(
    (state) => state.assets.banners
  );
  const { data: services, isLoading: isLoadingService } = useSelector(
    (state) => state.assets.services
  );

  useEffect(() => {
    dispatch(bannerData());
    dispatch(serviceData());
  }, []);

  if (isLoadingBanner || isLoadingService) {
    return (
      <div className="h-[80vh] w-full flex flex-col justify-center items-center ">
        <ClipLoader color="#f42619" />
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-y-3">
        <div className="w-full">
          {services && services.length > 0 ? (
            <div className="flex flex-row gap-6 mb-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/service?service_code=${service.service_code}`, {
                      state: service,
                    })
                  }
                  className="flex flex-col gap-1 items-center text-center hover:cursor-pointer"
                >
                  <img
                    src={service.service_icon}
                    alt={service.service_name}
                    className="w-[50px] h-[50px]"
                  />
                  <p className="text-[10px] ">{service.service_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Tidak ada data services yang tersedia.</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-sm">Temukan promo menarik</p>
          {banners && banners.length > 0 ? (
            <div className="flex flex-row items-center gap-10 overflow-x-hidden hover:overflow-x-scroll">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="w-[270px] h-[120px] flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={banner.banner_image}
                    className="h-full w-full object-cover"
                    alt={banner.banner_name}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Tidak ada data banner yang tersedia.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
