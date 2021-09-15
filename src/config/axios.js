import axios from "axios";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BASE,
});

clientAxios.defaults.headers.common["Authorization"] =
  process.env.NEXT_PUBLIC_TOKEN_RES;

export default clientAxios;
