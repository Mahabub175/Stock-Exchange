import { negativeMoversData, positiveMoversData } from "@/assets/data/homeData";
import Image from "next/image";
import React from "react";

const DailyMovers = () => {
  return (
    <section className="mt-20 my-container">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="lg:text-xl font-medium">Daily Movers</p>
          <h2 className="text-base text-start mb-5 lg:mb-10">
            Todays biggest gainer and losers
          </h2>
        </div>
        <div>
          <button className="px-5 py-1.5 rounded-full border font-medium border-gray-400">
            View All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 lg:mt-0">
        <div className="lg:px-5">
          {positiveMoversData?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b first:border-none border-gray-200 first:bg-green-200 rounded p-5"
            >
              <div className="flex items-center gap-4">
                <Image src={item.image} alt="logo" className="w-10 h-10" />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p>{item.company}</p>
                </div>
              </div>
              <div className="text-lg font-semibold text-green-500">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:px-5 mt-10 lg:mt-0">
          {negativeMoversData?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b first:border-none border-gray-200 first:bg-red-200 rounded p-5"
            >
              <div className="flex items-center gap-4">
                <Image src={item.image} alt="logo" className="w-10 h-10" />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p>{item.company}</p>
                </div>
              </div>
              <div className="text-lg font-semibold text-red-500">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyMovers;
