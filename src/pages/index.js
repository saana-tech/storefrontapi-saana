import React from "react";
import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Products from "../components/Products";

export default function Home() {
  return (
    <div>
      <Banner />
      <Collections />
      <Products />
    </div>
  );
}
