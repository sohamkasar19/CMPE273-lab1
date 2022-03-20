import axios from "axios";
import {API} from '../../Backend';
export const GetUserDetails = (token) => {
    
    axios
      .get(API+"/profile", {
        params: {
          token: token,
        },
      }).then((response) => {
          return response.data;
      })
  
  
}
