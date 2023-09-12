import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Layout, Space } from "antd";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Exchanges from "./pages/Exchanges";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import CryptoDetails from "./pages/CryptoDetails";
import News from "./pages/News";
import Typography from "antd/es/typography/Typography";
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route exact path="/crypto/:uuid" element={<CryptoDetails />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title level={5} style={{ color: "#fff" }}>
              CryptoX <br />© All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
