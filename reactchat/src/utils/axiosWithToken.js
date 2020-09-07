import axios from "axios";
import getToken from "./getToken";

export default function () {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: getToken(),
    },
  });
}
