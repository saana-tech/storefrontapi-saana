import axios from "axios";
const cors_api_url = "https://cors-anywhere.herokuapp.com/";

const clientAxios = axios.create({
  baseURL: cors_api_url + "https://saana-tech.myshopify.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN,
  },
});

export default clientAxios;
