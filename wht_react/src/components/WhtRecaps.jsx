import React, { useEffect, useState } from "react";
import * as whtRecapService from "../services/whtRecapService";

const WhtRecaps = (props) => {
  const [whtRecaps, setWhtRecaps] = useState("");

  const onGetRecapsByDateSuccess = (response) => {
    setWhtRecaps(
      response.items.map((recap, index) => {
        return (
          <div key={index} className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
              <p className="ps-4 pb-3">{recap.overview}</p>
            </div>
          </div>
        );
      })
    );
  };

  const onGetRecapsByDateError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    whtRecapService
      .getRecapsByDate(props.date)
      .then(onGetRecapsByDateSuccess)
      .catch(onGetRecapsByDateError);
  }, []);

  return (
    <div>
      <div className="container pt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <p className="mx-2 ps-1">{props.date}:</p>
          </div>
        </div>
      </div>

      <div className="container-fluid ps-4 pe-4 pb-4 pt-2">{whtRecaps}</div>
    </div>
  );
};

export default WhtRecaps;
