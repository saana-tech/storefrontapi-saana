import React from "react";
import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Products from "../components/Products";
import Section from "../components/Section";

export default function Home() {
  return (
    <div>
      <Banner />
      <Collections />
      <Section>
        <Products title={"Ofertas"} />
      </Section>
      <Section>
        <Products title={"Salud sexual"} />
      </Section>
      <Section>
        <Products title={"Salud sexual"} />
      </Section>
      <Section>
        <Products title={"Dolor e inflamación"} />
      </Section>{" "}
      <Section>
        <Products title={"Gripa y tos"} />
      </Section>
    </div>
  );
}
