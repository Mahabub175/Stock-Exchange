"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { cryptoData } from "@/assets/data/homeData";

const CryptoSlider = () => {
  const swiperRef = useRef();
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
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          loop={true}
        >
          {cryptoData?.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                <Image
                  src={item?.image}
                  alt={"demo"}
                  width={240}
                  height={240}
                  className="w-[300px] h-[150px] lg:h-[200px] rounded-xl mx-auto"
                />
              </SwiperSlide>
            );
          })}
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
