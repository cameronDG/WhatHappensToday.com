import { useNavigate } from "react-router-dom";
import * as whtRecapService from "../services/whtRecapService";
import GetDate from "./GetDate";

const Nothing = () => {
  const navigate = useNavigate();

  const onCreateRecapSuccess = () => {
    navigate("/");
  };

  const onCreateRecapError = (error) => {
    console.log(error);
  };

  const onNothingClick = () => {
    const newRecap = {
      date: GetDate(),
      overview: "Nothing happens.",
    };

    whtRecapService
      .createRecap(newRecap)
      .then(onCreateRecapSuccess)
      .catch(onCreateRecapError);
  };

  return (
    <div className="container-fluid p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <p className="ps-4">
            Is it currently the weekend or a holiday? Are the stupid Olympics
            underway again? Whatever the case, there are many reasons why
            nothing could happen.
          </p>
        </div>
      </div>

      <div className="text-center pt-2">
        <p>Could nothing happen today?</p>
        <button className="link-button" onClick={onNothingClick}>
          Yes
        </button>
        <button className="link-button ms-3" onClick={onNothingClick}>
          No
        </button>
      </div>
    </div>
  );
};

export default Nothing;
