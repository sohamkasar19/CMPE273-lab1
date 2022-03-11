import axios from "axios";
import { useEffect, useState } from "react";

export const GetUserDetails = (token) => {
    const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/profile", {
        params: {
          token: token,
        },
      }).then((response) => {
          setUserData(response.data)
      })
  }, [token]);

  return userData;
  
}
