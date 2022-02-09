import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelper";

const endpoint = API_HOST_PREFIX + "/api/recaps";

const createRecap = (recap) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: recap,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRecapsByDate = (date) => {
  const config = {
    method: "GET",
    url: `${endpoint}?date=${date}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { createRecap, getRecapsByDate };
