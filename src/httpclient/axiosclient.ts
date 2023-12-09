import axios from "axios";

export default function constructAxios(apiKey: string, timeOut = 1000) {
  return axios.create({
    baseURL: "https://api.shipday.com/",
    timeout: timeOut,
    headers: {
      Authorization: `Basic ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
}
