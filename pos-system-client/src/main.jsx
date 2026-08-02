import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

import "antd/dist/reset.css";
import "./index.css";

import App from "./App";
import { store } from "./redux/store";

const themeConfig = {
  token: {
    colorPrimary: "#10b981",
    colorPrimaryHover: "#059669",
    colorSuccess: "#10b981",
    colorLink: "#10b981",
    colorLinkHover: "#059669",
    borderRadius: 10,
    fontFamily: "Inter, sans-serif",
    colorBgLayout: "#f4faf6",
    colorBgContainer: "#ffffff",
  },
  components: {
    Menu: {
      itemSelectedBg: "#e6f9ee",
      itemSelectedColor: "#059669",
      itemHoverBg: "#f0fdf4",
      itemActiveBg: "#e6f9ee",
    },
    Card: {
      borderRadiusLG: 14,
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={themeConfig}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);