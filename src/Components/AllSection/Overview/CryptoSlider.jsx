"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { cryptoData } from "@/assets/data/sliderData";

const CryptoSlider = () => {
  const swiperRef = useRef();

  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://trade.moonsgallerysystem.com/api/stock-quote/"
        );
        const apiData = await res.json();

        const combined = cryptoData.map((item, index) => {
          return {
            ...item,
            ...(apiData[index] || {}),
          };
        });

        setMergedData(combined);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-container p-5 rounded-xl mt-1 lg:mt-10 relative -my-20">
      <p className="lg:text-xl font-medium">Investment Opportunities</p>
      <h2 className="text-xl lg:text-3xl font-medium text-start mb-10">
        Explore Global Markets
      </h2>
      <div>
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
            1600: { slidesPerView: 4 },
          }}
          navigation
          className="mySwiper"
          loop={true}
        >
          {mergedData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-[300px] h-[150px] lg:h-[200px] mx-auto rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.symbol || "Crypto"}
                  width={240}
                  height={240}
                  className="w-[300px] h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                  <Image
                    src={item?.icon}
                    alt={item.symbol}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex justify-between items-center w-full px-5 mt-10">
                    <div>
                      <p className="text-lg font-semibold">
                        {item.company_name}
                      </p>
                      <p className="text-sm">{item.symbol}</p>
                    </div>
                    <p className="text-xl font-medium">
                      ${item?.current_price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            className="lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-white text-black border hover:bg-primary hover:text-gray-500 duration-300 absolute top-[6.5%] right-10 lg:right-24"
            onClick={() => swiperRef.current.slidePrev()}
          >
            <FaAngleLeft className="text-xl" />
          </button>
          <button
            className="lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-white text-black border border-primary hover:bg-primary hover:text-gray-500 duration-300 absolute top-[6.5%] right-2 lg:right-12"
            onClick={() => swiperRef.current.slideNext()}
          >
            <FaAngleRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CryptoSlider;
