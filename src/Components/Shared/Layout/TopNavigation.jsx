import { Input, Layout, Tabs } from "antd";
import { IoSearchOutline, IoWaterOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbCurrencyCent, TbChartCandle } from "react-icons/tb";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { LiaIdCardSolid } from "react-icons/lia";
import { TiChartPieOutline } from "react-icons/ti";
import { RiNftLine } from "react-icons/ri";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

const { Header } = Layout;

const tabItems = [
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <RxDashboard />
        Overview
      </span>
    ),
    key: "1",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <TbChartCandle />
        Stocks
      </span>
    ),
    key: "2",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <TbCurrencyCent className="text-xl" />
        Crypto
      </span>
    ),
    key: "3",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <LuChartNoAxesCombined className="text-xl" />
        Indices
      </span>
    ),
    key: "8",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <IoWaterOutline className="text-xl" />
        Commodities
      </span>
    ),
    key: "9",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <PiCurrencyDollarSimpleBold className="text-xl" />
        Currencies
      </span>
    ),
    key: "10",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <HiOutlineDocumentDuplicate className="text-xl" />
        EFts
      </span>
    ),
    key: "4",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <LiaIdCardSolid className="text-xl" />
        Trader
      </span>
    ),
    key: "5",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <TiChartPieOutline className="text-xl" />
        Portfolios
      </span>
    ),
    key: "6",
  },
  {
    label: (
      <span className="flex flex-col items-center gap-1">
        <RiNftLine className="text-lg" />
        NFT
      </span>
    ),
    key: "7",
  },
];

const TopNavigation = () => {
  return (
    <Header className="!bg-white flex flex-col items-center gap-5">
      <div className="w-full lg:w-1/3">
        <Input
          placeholder="Search"
          size="large"
          prefix={<IoSearchOutline className="text-xl text-gray-500" />}
          className="!bg-gray-100 rounded-full"
        />
      </div>

      <div className="w-full">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          centered
          tabBarGutter={40}
          size="large"
        />
      </div>
    </Header>
  );
};

export default TopNavigation;
