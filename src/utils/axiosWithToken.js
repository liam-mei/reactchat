import axios from "axios";
import getToken from "./getToken";
import secrets from '../secrets'

export default function () {
  return axios.create({
    baseURL: secrets.backendURL,
    headers: {
      Authorization: getToken(),
    },
  });
}
