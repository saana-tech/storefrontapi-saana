import axios from "axios";

const clientAxios = axios.create({
  baseURL: "https://saana-api-prod-7xk7iwgpfq-uc.a.run.app/",
});

clientAxios.defaults.headers.common["Authorization"] =
  process.env.NEXT_PUBLIC_TOKEN_RES;

export default clientAxios;
