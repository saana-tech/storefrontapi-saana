import React from "react";
import { useQuery, gql } from "@apollo/client";

import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Products from "../components/Products";
import Section from "../components/Section";
import Seo from "../components/Seo";

export default function Home() {
  const QUERY_PRODUCT = gql`
    query {
      product(id: "gid://shopify/Product/6611955843246") {
        description
        id
        storefrontId
      }
    }
  `;
  const { data = null, loading = false, error = null } = useQuery(
    QUERY_PRODUCT
  );
  console.log("product by id =>", data);
  return (
    <div>
      <Seo />
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
      </Section>
      <Section>
        <Products title={"Gripa y tos"} />
      </Section>
    </div>
  );
}
