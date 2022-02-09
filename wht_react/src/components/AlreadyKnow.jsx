import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as doolRecapService from "../services/doolRecapService";
import * as whtRecapService from "../services/whtRecapService";

const AlreadyKnow = (props) => {
  const [recap, setRecap] = useState("");

  const navigate = useNavigate();

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let seasonInt = getRandomIntInclusive(51, 57);

  const onGetRecapSuccess = (response) => {
    let epInt = getRandomIntInclusive(0, response.episodes.length - 1);

    if (!response.episodes[epInt].overview) {
      //console.log("no overview");
      getRandomRecap();
    } else {
      //console.log(seasonInt, "season");
      //console.log(epInt, "episode");
      setRecap(response.episodes[epInt].overview);
    }
  };

  const onGetRecapError = (error) => {
    console.log(error);
  };

  const getRandomRecap = () => {
    doolRecapService
      .getRandom(seasonInt)
      .then(onGetRecapSuccess)
      .catch(onGetRecapError);
  };

  const onCreateRecapSuccess = () => {
    //console.log(response);
    navigate("/");
  };

  const onCreateRecapError = (error) => {
    console.log(error);
  };

  const addRecap = () => {
    const newRecap = {
      date: props.date,
      overview: recap,
    };

    whtRecapService
      .createRecap(newRecap)
      .then(onCreateRecapSuccess)
      .catch(onCreateRecapError);
  };

  useEffect(() => {
    getRandomRecap();
  }, []);
  return (
    <div>
      <div className="container pt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <p className="mx-2 ps-1">Is it this?</p>
          </div>
        </div>
      </div>

      <div className="container-fluid ps-4 pe-4 pb-4 pt-2">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <p className="ps-4">{recap}</p>
          </div>
        </div>
        <div className="pt-2 text-center">
          <button className="link-button" onClick={addRecap}>
            Yes
          </button>
          <button className="link-button ms-3" onClick={getRandomRecap}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlreadyKnow;
