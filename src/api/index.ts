import axios from "axios";

export const ApiCall = async (method: string, endpoint: string, data?: any) => {
  const config: any = {
    method,
    url: `${process.env.BACKEND_URL}/${endpoint}`,
    headers: {},
    data,
  };
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }

  const res = await axios.request(config);
  return res;
};
