import LiveCrypto from "@/Components/AllSection/LiveStock/LiveCrypto";
import LiveMarkets from "@/Components/AllSection/LiveStock/LiveMarkets";
import LiveStock from "@/Components/AllSection/LiveStock/LiveStock";
import CopyTraderSlider from "@/Components/AllSection/Overview/CopyTraderSlider";
import CryptoSlider from "@/Components/AllSection/Overview/CryptoSlider";
import DailyMovers from "@/Components/AllSection/Overview/DailyMovers";
import FeedSlider from "@/Components/AllSection/Overview/FeedSlider";
import InvestSlider from "@/Components/AllSection/Overview/InvestSlider";
import PortfolioSlider from "@/Components/AllSection/Overview/PortfolioSlider";
import TrendingAssets from "@/Components/AllSection/Overview/TrendingAssets";

const page = () => {
  return (
    <>
      <CryptoSlider />
      {/* <LiveStock /> */}
      <LiveMarkets />
      <DailyMovers />
      <CopyTraderSlider />
      <TrendingAssets />
      <FeedSlider />
      <InvestSlider />
      <PortfolioSlider />
    </>
  );
};

export default page;
