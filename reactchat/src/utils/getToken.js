import jwt from "jsonwebtoken";

export default function () {
  console.log("getting token");
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("no token");
    return "";
  }

  const decodedToken = jwt.decode(token);
  const currentTime = Date.now() / 1000;
  const expireTime = decodedToken.exp;
  const isExpired = expireTime > currentTime ? false : true;
  console.log({ decodedToken, isExpired, currentTime, expireTime });

  if (isExpired) {
    localStorage.removeItem("token");
    console.log("token expired");
    return "";
  } else {
    console.log('token valid')
    return token;
  }
}
