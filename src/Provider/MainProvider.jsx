import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const MainProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemActiveColor: "#000",
            itemSelectedColor: "#000",
            itemColor: "#808080",
            itemHoverColor: "#000",
            inkBarColor: "#000",
          },
        },
      }}
    >
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
};

export default MainProvider;
