import { TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as doolRecapService from "../services/doolRecapService";
import * as whtRecapService from "../services/whtRecapService";
import * as Yup from "yup";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const recapValidationSchema = Yup.object().shape({
  overview: Yup.string()
    .min(16, "Too short")
    .max(280, "Too long")
    .required("Need help getting started? Click below."),
});

const AlreadyKnowV2 = (props) => {
  const [recap, setRecap] = useState({ overview: "" });
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const navigate = useNavigate();

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onGetRecapSuccess = (response) => {
    let epInt = getRandomIntInclusive(0, response.episodes.length - 1);

    if (!response.episodes[epInt].overview) {
      //console.log("no overview");
      getRandomRecap();
    } else {
      //console.log(seasonInt, "season");
      //console.log(epInt, "episode");
      setRecap({ overview: response.episodes[epInt].overview });
    }
  };

  const onGetRecapError = (error) => {
    console.log(error);
  };

  const getRandomRecap = () => {
    let seasonInt = getRandomIntInclusive(51, 57);

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

  const addRecap = (values) => {
    const newRecap = {
      date: props.date,
      overview: values.overview,
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
          <Formik
            enableReinitialize={true}
            initialValues={recap}
            onSubmit={addRecap}
            validationSchema={recapValidationSchema}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form>
                <TextField
                  fullWidth
                  multiline
                  name="overview"
                  value={values.overview}
                  onChange={handleChange}
                  variant="standard"
                  placeholder="Type your recap here."
                  className="ps-4"
                  error={touched.overview && Boolean(errors.overview)}
                  helperText={touched.overview && errors.overview}
                ></TextField>
                <div className="pt-4 text-center">
                  <button className="link-button" type="submit">
                    Submit
                  </button>

                  <button
                    className="link-button ms-4"
                    type="button"
                    onClick={() => getRandomRecap()}
                  >
                    Help
                  </button>

                  <button
                    className="link-button ms-4"
                    type="button"
                    onClick={() => setRecap({ overview: "" })}
                  >
                    Clear
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="pt-3 text-center">
            <button
              className="link-button button-sm"
              type="button"
              onClick={toggleModal}
            >
              Style Guide
            </button>
          </div>

          <Modal
            centered={false}
            isOpen={modal}
            toggle={toggleModal}
            style={{ maxWidth: "450px" }}
          >
            <ModalHeader toggle={toggleModal}>Recap Style Guide</ModalHeader>
            <ModalBody>
              <ul>
                <li className="pt-1">
                  What Happens Today <em>happens</em> in the <em>present</em>:
                  <ul>
                    <li>
                      "Marlena{" "}
                      <u>
                        <em>is</em>
                      </u>{" "}
                      visited by a mysterious hiker..."
                    </li>
                    <li>
                      "Nicole{" "}
                      <u>
                        <em>exposes</em>
                      </u>{" "}
                      Sami's lurid machinations..."
                    </li>
                  </ul>
                </li>
                <li className="pt-3">
                  Keep it short, sweet, and appropriate for broadcast.
                </li>
              </ul>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AlreadyKnowV2;
