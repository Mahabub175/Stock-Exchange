"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { portfolioData } from "@/assets/data/homeData";

const PortfolioSlider = () => {
  const swiperRef = useRef();
  return (
    <section className="my-container p-5 rounded-xl -mt-10 lg:mt-0 relative">
      <p className="lg:text-xl font-medium">Trending Assets</p>
      <h2 className="text-lg lg:text-3xl font-medium text-start mb-10">
        Assets accelerating among our investor right now.
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
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          loop={true}
        >
          {portfolioData?.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                <Image
                  src={item?.image}
                  alt={"demo"}
                  width={240}
                  height={240}
                  className="w-[300px] h-[150px] lg:h-[300px] rounded-xl mx-auto border bg-black/20 hover:shadow-xl duration-300"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button className="px-5 py-1.5 rounded-full border font-medium border-gray-400 absolute top-[6.5%] right-36 hidden lg:block">
          View All
        </button>
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

export default PortfolioSlider;
