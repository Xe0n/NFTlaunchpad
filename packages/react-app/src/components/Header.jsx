import { PageHeader } from "antd";
import React from "react";
import logo from "../assets/easygo.png"
// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <img src={logo} alt="" className="logo"/>
      <PageHeader
        title=""
        subTitle="Биржа для быстрого старта в мире NFT игр"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
