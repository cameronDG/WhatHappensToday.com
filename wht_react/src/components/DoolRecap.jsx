import React, { useState, useEffect } from "react";
import * as doolRecapService from "../services/doolRecapService";

const DoolRecap = (props) => {
  const [recap, setRecap] = useState("");

  const onGetRecapSuccess = (response) => {
    //console.log(response);
    if (props.date === response.last_episode_to_air.air_date) {
      setRecap(response.last_episode_to_air.overview);
    } else if (props.date === response.next_episode_to_air.air_date) {
      setRecap(response.next_episode_to_air.overview);
    } else {
      setRecap("Nothing happens.");
    }
  };

  const onGetRecapError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    doolRecapService.getToday().then(onGetRecapSuccess).catch(onGetRecapError);
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <p className="ps-4">{recap}</p>
        </div>
      </div>
    </div>
  );
};

export default DoolRecap;
