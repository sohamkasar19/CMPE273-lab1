import axios from "axios";

export const GetUserDetails = (token) => {
    
    axios
      .get("http://localhost:8080/profile", {
        params: {
          token: token,
        },
      }).then((response) => {
          return response.data;
      })
  
  
}
