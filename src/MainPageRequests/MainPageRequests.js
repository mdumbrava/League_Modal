import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import "./MainPageRequest.css";

const MainPageRequest = () => {
  const [main, setMain] = useState([]);
  // fetch API

  const callBackendAPI = async () => {
    // console.log(param);
    let response = await fetch("/apileague/get_main");
    let body = await response.json();
    setMain(body);
  };

  useEffect(() => {
    callBackendAPI();
    // setInterval(callBackendAPI, 60000);
  }, []);

  return (
    <div>
      <div className="mainPageDiv">
        {main.map((champs) => (
          <MainPage character={champs} key={champs.id} />
        ))}
      </div>
    </div>
  );
};
export default MainPageRequest;
