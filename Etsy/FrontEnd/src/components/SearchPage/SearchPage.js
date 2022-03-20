import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import SearchListComponent from "./SearchListComponent";

function SearchPage() {
  const { state } = useLocation();

  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    let fetchSearchResults = async () => {
      let responseSearch = await axios.get(
        "http://localhost:8080/item/search",
        {
          params: {
            searchWord: state,
          },
        }
      );
      setSearchList(responseSearch.data);
    //   console.log(responseSearch.data);
    };
    if (isSubscribed) {
      fetchSearchResults().catch(console.error());
    }

    return () => {
      isSubscribed = false;
    };
  }, [state]);

  return (
    <div>
      <div className="content-container">
        <NavBar>New navigation</NavBar>
        <div className="container">
          <div className="d-flex flex-column">
            <div className="p-2">
              <h3>Search Results </h3>
            </div>
           {searchList.length > 0 &&  <div className="p-2">
              <SearchListComponent data={searchList}/>
            </div>}
            {searchList.length === 0 &&  <div className="d-flex justify-content-center">
              <h3 >No Items Found</h3>
            </div>

            }
           
          </div>
        </div>
      </div>
      <div className="footer--pin">
        <Footer />
      </div>
    </div>
  );
}

export default SearchPage;
